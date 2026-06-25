import { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Link } from 'react-router-dom';
import { cars } from '../data/cars';
import {
  getRentals,
  saveRentals,
  addRental,
  updateRental,
  isCarAvailable,
  generateUUID,
  addDays,
} from '../utils/storage';
import { CheckCircle, XCircle, QrCode, Clock, Car, Phone, Trash2 } from 'lucide-react';
import './AdminPage.css';

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

function formatDZD(amount) {
  return Number(amount).toLocaleString('fr-FR') + ' DZD';
}

const EMPTY_FORM = {
  customerName: '',
  customerPhone: '',
  carId: '',
  startDate: '',
  endDate: '',
  dailyRate: '',
};

export default function AdminPage() {
  const [form, setForm] = useState(EMPTY_FORM);
  const [rentals, setRentals] = useState([]);
  const [createdRental, setCreatedRental] = useState(null);
  const [qrUrl, setQrUrl] = useState('');

  useEffect(() => {
    setRentals(getRentals());
  }, []);

  const availableCarsForForm = cars.filter(c => isCarAvailable(c.id));

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
    if (name === 'carId' && value) {
      const car = cars.find(c => c.id === parseInt(value));
      if (car) setForm(f => ({ ...f, carId: value, dailyRate: String(car.price) }));
    }
  };

  const handleCreate = (e) => {
    e.preventDefault();
    const car = cars.find(c => c.id === parseInt(form.carId));
    const uuid = generateUUID();
    const rental = {
      uuid,
      customerName: form.customerName,
      customerPhone: form.customerPhone,
      carId: car.id,
      carName: car.name,
      carCategory: car.category,
      startDate: form.startDate,
      endDate: form.endDate,
      dailyRate: parseInt(form.dailyRate),
      status: 'active',
      extensionRequest: null,
      createdAt: new Date().toISOString(),
    };
    addRental(rental);
    const url = `${window.location.origin}/rental/${uuid}`;
    setQrUrl(url);
    setCreatedRental(rental);
    setRentals(getRentals());
    setForm(EMPTY_FORM);
  };

  const handleApproveRequest = (requestUUID) => {
    const allRentals = getRentals();
    const req = allRentals.find(r => r.uuid === requestUUID);
    if (!req) return;
    const newUUID = generateUUID();
    const approved = { ...req, uuid: newUUID, status: 'active', createdAt: new Date().toISOString() };
    const updated = allRentals.filter(r => r.uuid !== requestUUID);
    updated.push(approved);
    saveRentals(updated);
    const url = `${window.location.origin}/rental/${newUUID}`;
    setQrUrl(url);
    setCreatedRental(approved);
    setRentals(updated);
  };

  const handleApproveExtension = (rentalUUID) => {
    const allRentals = getRentals();
    const rental = allRentals.find(r => r.uuid === rentalUUID);
    if (!rental || !rental.extensionRequest) return;
    const newEndDate = addDays(rental.endDate, rental.extensionRequest.days);
    updateRental(rentalUUID, { endDate: newEndDate, extensionRequest: null });
    setRentals(getRentals());
  };

  const handleDelete = (uuid) => {
    saveRentals(getRentals().filter(r => r.uuid !== uuid));
    setRentals(getRentals());
    if (createdRental?.uuid === uuid) setCreatedRental(null);
  };

  const activeRentals = rentals.filter(r => r.status === 'active');
  const pendingRequests = rentals.filter(r => r.status === 'pending');

  return (
    <div className="admin-page">
      {/* Header */}
      <header className="admin-header">
        <div className="admin-header__inner">
          <Link to="/" className="admin-header__logo">
            <span className="admin-header__bms">BMS</span>
            <span className="admin-header__loc">Location</span>
          </Link>
          <div className="admin-header__title">
            <span className="admin-header__badge">Panel Admin</span>
            <span className="admin-header__sub">Système Misar — Demo</span>
          </div>
          <Link to="/debug" className="admin-header__debug">Debug</Link>
        </div>
      </header>

      <div className="admin-body">

        {/* ── Scenario 1: Create Rental ── */}
        <section className="admin-section">
          <div className="admin-section__title">
            <Car size={18} />
            Créer une location (Scénario 1)
          </div>

          <div className="admin-create">
            <form className="admin-form" onSubmit={handleCreate}>
              <div className="admin-form__grid">
                <div className="admin-field">
                  <label>Nom complet du client</label>
                  <input name="customerName" required placeholder="Ex: Karim Bensalem" value={form.customerName} onChange={handleFormChange} />
                </div>
                <div className="admin-field">
                  <label>Téléphone</label>
                  <input name="customerPhone" required placeholder="+213 5XX XXX XXX" value={form.customerPhone} onChange={handleFormChange} />
                </div>
                <div className="admin-field">
                  <label>Voiture</label>
                  <select name="carId" required value={form.carId} onChange={handleFormChange}>
                    <option value="">— Choisir une voiture —</option>
                    {availableCarsForForm.map(c => (
                      <option key={c.id} value={c.id}>{c.name} ({c.price.toLocaleString('fr-FR')} DZD/j)</option>
                    ))}
                  </select>
                </div>
                <div className="admin-field">
                  <label>Tarif journalier (DZD)</label>
                  <input name="dailyRate" type="number" required min="100" placeholder="3500" value={form.dailyRate} onChange={handleFormChange} />
                </div>
                <div className="admin-field">
                  <label>Date de début</label>
                  <input name="startDate" type="date" required value={form.startDate} onChange={handleFormChange} />
                </div>
                <div className="admin-field">
                  <label>Date de fin</label>
                  <input name="endDate" type="date" required value={form.endDate} onChange={handleFormChange} />
                </div>
              </div>
              <button type="submit" className="btn-primary admin-form__submit">
                <QrCode size={16} />
                Générer la Location
              </button>
            </form>

            {/* QR Code Panel */}
            {createdRental && qrUrl && (
              <div className="admin-qr-panel">
                <div className="admin-qr-panel__title">
                  <CheckCircle size={18} color="#16a34a" />
                  Location créée !
                </div>
                <div className="admin-qr-code">
                  <QRCodeSVG
                    value={qrUrl}
                    size={180}
                    bgColor="#ffffff"
                    fgColor="#0a0a0a"
                    level="M"
                  />
                </div>
                <p className="admin-qr-url">{qrUrl}</p>
                <div className="admin-qr-info">
                  <div className="admin-qr-row"><span>Client</span><strong>{createdRental.customerName}</strong></div>
                  <div className="admin-qr-row"><span>Voiture</span><strong>{createdRental.carName}</strong></div>
                  <div className="admin-qr-row"><span>Période</span><strong>{formatDate(createdRental.startDate)} → {formatDate(createdRental.endDate)}</strong></div>
                  <div className="admin-qr-row"><span>Tarif</span><strong>{formatDZD(createdRental.dailyRate)}/j</strong></div>
                </div>
                <p className="admin-qr-hint">Faites scanner ce QR code par le client pour accéder à sa page de location.</p>
                <button className="admin-btn-outline" onClick={() => setCreatedRental(null)}>Fermer</button>
              </div>
            )}
          </div>
        </section>

        {/* ── Scenario 2: Pending Client Requests ── */}
        {pendingRequests.length > 0 && (
          <section className="admin-section">
            <div className="admin-section__title">
              <Clock size={18} />
              Demandes clients en attente ({pendingRequests.length})
            </div>
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Client</th>
                    <th>Voiture</th>
                    <th>Période demandée</th>
                    <th>Tarif</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {pendingRequests.map(req => (
                    <tr key={req.uuid}>
                      <td>
                        <div className="admin-client">
                          <span>{req.customerName}</span>
                          <span className="admin-client__phone"><Phone size={12} /> {req.customerPhone}</span>
                        </div>
                      </td>
                      <td>{req.carName}</td>
                      <td>{formatDate(req.startDate)} → {formatDate(req.endDate)}</td>
                      <td>{formatDZD(req.dailyRate)}/j</td>
                      <td>
                        <div className="admin-actions">
                          <button className="admin-btn-approve" onClick={() => handleApproveRequest(req.uuid)}>
                            <CheckCircle size={14} /> Approuver
                          </button>
                          <button className="admin-btn-delete" onClick={() => handleDelete(req.uuid)}>
                            <XCircle size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* ── Active Rentals ── */}
        <section className="admin-section">
          <div className="admin-section__title">
            <CheckCircle size={18} />
            Locations actives ({activeRentals.length})
          </div>

          {activeRentals.length === 0 ? (
            <p className="admin-empty">Aucune location active. Créez-en une ci-dessus.</p>
          ) : (
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Client</th>
                    <th>Voiture</th>
                    <th>Période</th>
                    <th>Tarif</th>
                    <th>Prolongement</th>
                    <th>Lien</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {activeRentals.map(r => (
                    <tr key={r.uuid}>
                      <td>
                        <div className="admin-client">
                          <span>{r.customerName}</span>
                          <span className="admin-client__phone"><Phone size={12} /> {r.customerPhone}</span>
                        </div>
                      </td>
                      <td>{r.carName}</td>
                      <td>{formatDate(r.startDate)} → {formatDate(r.endDate)}</td>
                      <td>{formatDZD(r.dailyRate)}/j</td>
                      <td>
                        {r.extensionRequest ? (
                          <div className="admin-ext">
                            <span className="admin-ext__badge">+{r.extensionRequest.days}j demandé</span>
                            <button className="admin-btn-approve admin-btn-approve--sm" onClick={() => handleApproveExtension(r.uuid)}>
                              <CheckCircle size={13} /> Approuver
                            </button>
                          </div>
                        ) : (
                          <span className="admin-none">—</span>
                        )}
                      </td>
                      <td>
                        <a
                          href={`${window.location.origin}/rental/${r.uuid}`}
                          target="_blank"
                          rel="noreferrer"
                          className="admin-link"
                        >
                          /rental/{r.uuid.slice(0, 8)}…
                        </a>
                      </td>
                      <td>
                        <button className="admin-btn-delete" onClick={() => handleDelete(r.uuid)} title="Supprimer">
                          <Trash2 size={14} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

      </div>
    </div>
  );
}
