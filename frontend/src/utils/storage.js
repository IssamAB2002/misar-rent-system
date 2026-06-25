const RENTALS_KEY = 'bms_rentals';

export function getRentals() {
  try {
    return JSON.parse(localStorage.getItem(RENTALS_KEY) || '[]');
  } catch {
    return [];
  }
}

export function saveRentals(rentals) {
  localStorage.setItem(RENTALS_KEY, JSON.stringify(rentals));
}

export function getRentalByUUID(uuid) {
  return getRentals().find(r => r.uuid === uuid) || null;
}

export function addRental(rental) {
  const rentals = getRentals();
  rentals.push(rental);
  saveRentals(rentals);
}

export function updateRental(uuid, updates) {
  const rentals = getRentals();
  const idx = rentals.findIndex(r => r.uuid === uuid);
  if (idx === -1) return null;
  rentals[idx] = { ...rentals[idx], ...updates };
  saveRentals(rentals);
  return rentals[idx];
}

export function deleteRental(uuid) {
  saveRentals(getRentals().filter(r => r.uuid !== uuid));
}

export function isCarAvailable(carId) {
  return !getRentals().some(r => r.carId === carId && r.status === 'active');
}

export function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export function addDays(dateStr, days) {
  const d = new Date(dateStr);
  d.setDate(d.getDate() + days);
  return d.toISOString().split('T')[0];
}
