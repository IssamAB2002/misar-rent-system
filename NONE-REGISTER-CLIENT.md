**Yes, this is straightforward to implement** in your React + Django app. The core idea is a **"Guest Access Token"** (the security code) that acts as a temporary, shareable key for rental management without requiring user accounts.

### 1. Django Backend Implementation

#### Models (`models.py`)
```python
import uuid
from django.db import models

class Rental(models.Model):
    car = models.ForeignKey('Car', on_delete=models.PROTECT)
    customer_name = models.CharField(max_length=100)      # Optional, for reference
    customer_phone = models.CharField(max_length=20, blank=True)
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()
    security_code = models.CharField(max_length=12, unique=True, editable=False)
    status = models.CharField(max_length=20, default='active')  # active, extended, completed, cancelled
    extension_requests = models.JSONField(default=list, blank=True)  # or separate model for better history
    created_at = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        if not self.security_code:
            self.security_code = self.generate_security_code()
        super().save(*args, **kwargs)

    def generate_security_code(self):
        # User-friendly but secure (8-12 chars)
        while True:
            code = uuid.uuid4().hex[:8].upper()  # or use secrets.token_urlsafe(8)
            if not Rental.objects.filter(security_code=code).exists():
                return code
```

**Alternative for more secure/friendly codes:**
```python
import secrets
import string

def generate_security_code(self):
    alphabet = string.ascii_uppercase + string.digits
    while True:
        code = ''.join(secrets.choice(alphabet) for _ in range(10))
        if not Rental.objects.filter(security_code=code).exists():
            return code
```

#### Serializers & Views (DRF - Django REST Framework)

```python
# serializers.py
class RentalGuestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rental
        fields = ['security_code', 'car', 'start_date', 'end_date', 'status', 'customer_name']
        read_only_fields = ['security_code', 'car', 'start_date', 'end_date']

class ExtensionRequestSerializer(serializers.Serializer):
    days = serializers.IntegerField(min_value=1, max_value=7)
    reason = serializers.CharField(required=False, allow_blank=True)
```

**Views:**
```python
# views.py
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status

@api_view(['GET'])
@permission_classes([AllowAny])
def rental_by_code(request, code):
    try:
        rental = Rental.objects.get(security_code=code.upper())
        serializer = RentalGuestSerializer(rental)
        return Response(serializer.data)
    except Rental.DoesNotExist:
        return Response({"error": "Invalid security code"}, status=404)

@api_view(['POST'])
@permission_classes([AllowAny])
def request_extension(request, code):
    try:
        rental = Rental.objects.get(security_code=code.upper())
        
        serializer = ExtensionRequestSerializer(data=request.data)
        if serializer.is_valid():
            days = serializer.validated_data['days']
            
            # Record request (admin will approve)
            rental.extension_requests.append({
                "days": days,
                "reason": serializer.validated_data.get('reason', ''),
                "requested_at": timezone.now().isoformat()
            })
            rental.save()
            
            # Optional: Send notification to admin (email, websocket, etc.)
            return Response({"message": f"Extension request for {days} days received."})
        
        return Response(serializer.errors, status=400)
    except Rental.DoesNotExist:
        return Response({"error": "Invalid security code"}, status=404)
```

**URLs:**
```python
urlpatterns = [
    path('api/rentals/guest/<str:code>/', rental_by_code, name='rental-guest'),
    path('api/rentals/guest/<str:code>/extend/', request_extension, name='extend-rental'),
]
```

**Admin Side:**
- Use Django Admin or a React admin panel to search by `security_code`.
- Add actions to approve extensions (update `end_date`).

**Security Tips:**
- Add rate limiting (`django-ratelimit`) on these endpoints.
- Expire old codes or mark as inactive after rental ends.
- Log all access attempts.

### 2. React Frontend Implementation

Create a page/component `ManageRental.jsx`:

```jsx
import { useState } from 'react';
import axios from 'axios';

export default function ManageRental() {
  const [code, setCode] = useState('');
  const [rental, setRental] = useState(null);
  const [error, setError] = useState('');
  const [days, setDays] = useState(1);
  const [message, setMessage] = useState('');

  const handleLookup = async () => {
    try {
      const res = await axios.get(`/api/rentals/guest/${code}`);
      setRental(res.data);
      setError('');
    } catch (err) {
      setError('Invalid security code or rental not found');
      setRental(null);
    }
  };

  const handleExtend = async () => {
    try {
      const res = await axios.post(`/api/rentals/guest/${code}/extend/`, { days });
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.error || 'Failed to send request');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Manage Your Rental</h1>
      
      {!rental ? (
        <div>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            placeholder="Enter Security Code (e.g. ABC12345)"
            className="w-full p-3 border rounded mb-4"
          />
          <button onClick={handleLookup} className="w-full bg-blue-600 text-white py-3 rounded">
            Find My Rental
          </button>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>
      ) : (
        <div>
          <div className="bg-gray-100 p-4 rounded mb-6">
            <p><strong>Car:</strong> {rental.car}</p>
            <p><strong>Period:</strong> {new Date(rental.start_date).toLocaleDateString()} - {new Date(rental.end_date).toLocaleDateString()}</p>
            <p><strong>Status:</strong> {rental.status}</p>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Request Extension</h3>
            <select value={days} onChange={(e) => setDays(Number(e.target.value))} className="w-full p-3 border rounded mb-4">
              <option value={1}>1 day</option>
              <option value={2}>2 days</option>
            </select>
            <button onClick={handleExtend} className="w-full bg-green-600 text-white py-3 rounded">
              Request Extension
            </button>
            {message && <p className="mt-3 text-green-600">{message}</p>}
          </div>

          <button onClick={() => {setRental(null); setCode(''); setMessage('');}} className="mt-4 text-sm text-gray-500">
            Enter different code
          </button>
        </div>
      )}
    </div>
  );
}
```

### Additional Recommendations

1. **QR Code Option** (Nice UX):
   - When generating the rental, create a QR code containing the security code link (`/manage-rental?code=XXXX`).
   - Use `qrcode` library in Django or React.

2. **Admin Approval Workflow**:
   - Better to have admin approve extensions before `end_date` changes.
   - Use WebSockets (Django Channels) or email/SMS notifications.

3. **Security Enhancements**:
   - One-time view limit or short-lived access.
   - Add CAPTCHA on extension request.
   - Store minimal customer data.

4. **Alternative Approaches**:
   - Use **short-lived JWT** signed with the rental ID + code.
   - Magic link via email/SMS (more secure than plain code).

### Modifications (aligned with System Overview — 2 Scenarios):

**Scenario 1 — Admin-Initiated Rental (in-person):**
1. Admin fills: Client FullName, Phone Number, Car (from available list), Start Date, End Date, daily rate (DZD)
2. A Non-Registered Rental is created with a UUID → Car automatically marked as Unavailable
3. QR Code generated encoding: `{base-url}/rental/{uuid}`
4. QR Code displayed on screen → Client scans → Redirected to `/rental/{uuid}` (Rental Page)
5. On Rental Page: Client sees running cost (e.g. 4 500 DZD/j → Day 1 = 4 500 DZD, Day 2 = 9 000 DZD …)
6. Client can submit an extension request (+1 to +7 days) → stored as pending on the rental
7. Admin reviews and approves the extension → end date updated → Client sees updated period & cost on next load

**Scenario 2 — Client Self-Request (online):**
1. Client browses `/voitures` page — only **available** cars show a "Demander cette voiture" button
2. Client clicks the button → fills mini-form: FullName, Phone, desired Start Date, End Date
3. Request saved (localStorage for demo / API for production) as a pending rental request
4. Admin receives and reviews the request in the `/admin` panel → clicks **Approuver**
5. On approval: UUID generated, Rental created, Car marked Unavailable, QR Code displayed to Admin
6. Admin shares the QR Code or URL with the Client → Client scans / enters URL → lands on Rental Page
7. Same Rental Page experience as Scenario 1: cost tracking, extension requests, rental details