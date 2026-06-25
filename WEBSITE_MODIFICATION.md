# Modification

**System Overview**

*Senario 1*
* Client comes into BMS Location
* He already has a knowledge about available car 
* Inform Admin to Create a Rental for that Car client choosed
* Admin Create Rental with UUID, QR Code Generated & Displayed on the Screen So client can scan to be directed to the Rental Page (to see (Rental Cost) & act (Extend Rent Period))
* Automatically that Car marked as Unavailable

*Senario 2*
* Client Automatically Choose a Car, then Fill the Form (Only for the available Cars)
* Admin recieves the Rental Request, Approve (the Rental Automatically Created & send the QR Code to Client) 
* Client Enters the Url to Rental Page 

**Needed Adjustement**
*This is the Demo Implementation of Auto Location System Called "Misar" or "Misar Rent"*
*Demo: Pure Frontend — No Backend. All rental data stored in localStorage. Deployable on Vercel / GitHub Pages.*

1. **Remove guest booking block from HomePage** — the "Prêt à prendre la route ?" section (or any inline booking form on the homepage) is removed. Rentals are Admin-created (Scenario 1) or submitted as a request by the client from `/voitures` (Scenario 2).

2. **Create `/admin` page (no real auth for demo)** where Admin:
   - Fills: Client Full Name, Phone, Car (dropdown from the cars list), Start Date, End Date, daily price (DZD)
   - Clicks **"Générer la Location"** → UUID auto-generated → Rental object saved to localStorage
   - A **QR Code is displayed** on screen encoding the full URL: `{base-url}/rental/{uuid}`
   - Car is automatically marked as **Unavailable** in localStorage
   - Admin panel also shows a list of: active rentals + pending client requests (Scenario 2) with an Approve button

3. **Update `/rental/:uuid` (RentalPage)** to:
   - Load rental data from localStorage by UUID
   - Display: Car info, Client name, Start / End dates, running cost (price × elapsed days in DZD — updates in real time or on load)
   - Client can submit an **extension request** (+1 to +7 days) → saved in localStorage as `pending` on that rental
   - Admin sees and approves pending requests from the `/admin` page → end date updated

4. **Scenario 2 — Client Self-Request** on `/voitures`:
   - Only **available** cars show an action button: **"Demander cette voiture"**
   - Clicking opens a mini-form: Full Name, Phone, Start Date, End Date
   - On submit → request saved to localStorage as a pending rental request
   - Admin sees it in `/admin` → clicks **Approuver** → UUID generated, QR Code displayed, car marked unavailable

5. **Rename brand across all components**: every "BMS Cars Rent" / "BMS Car" text → **"BMS Location"**


**REMEMBER**
- DON'T PAY ATTENTION TO AUTHENTICATION
- PAY ATTENTION TO THE DEMO SYSTEM CREATION
- JUST CREATE A DEMO VERSION TO DEPLOY ON VERCEL OR GITHUB SO THE CLIENT CAN PREVIEW IT