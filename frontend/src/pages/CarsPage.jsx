import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Categories from '../components/Categories';
import CarCard from '../components/CarCard';
import { cars, categories } from '../data/cars';
import { isCarAvailable, addRental, getRentals, generateUUID } from '../utils/storage';
import { X, CheckCircle } from 'lucide-react';
import './CarsPage.css';

export default function CarsPage() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [unavailableCars, setUnavailableCars] = useState(new Set());
  const [selectedCar, setSelectedCar] = useState(null);
  const [form, setForm] = useState({ customerName: '', customerPhone: '', startDate: '', endDate: '' });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const activeRentals = getRentals().filter(r => r.status === 'active');
    setUnavailableCars(new Set(activeRentals.map(r => r.carId)));
  }, []);

  const filtered = activeFilter === 'all' ? cars : cars.filter(c => c.category === activeFilter);

  const handleOpenModal = (car) => {
    setSelectedCar(car);
    setForm({ customerName: '', customerPhone: '', startDate: '', endDate: '' });
    setSubmitted(false);
  };

  const handleCloseModal = () => {
    setSelectedCar(null);
    setSubmitted(false);
  };

  const handleSubmitRequest = (e) => {
    e.preventDefault();
    const request = {
      uuid: 'req-' + generateUUID(),
      customerName: form.customerName,
      customerPhone: form.customerPhone,
      carId: selectedCar.id,
      carName: selectedCar.name,
      carCategory: selectedCar.category,
      startDate: form.startDate,
      endDate: form.endDate,
      dailyRate: selectedCar.price,
      status: 'pending',
      extensionRequest: null,
      createdAt: new Date().toISOString(),
    };
    addRental(request);
    setSubmitted(true);
  };

  return (
    <>
      <Navbar />
      <main className="cars-page">
        {/* Banner */}
        <div className="cars-page__banner">
          <div className="container">
            <div className="section-label">Notre Flotte</div>
            <h1 className="cars-page__title">VOITURES <span>DISPONIBLES</span></h1>
            <p className="cars-page__subtitle">
              Trouvez le véhicule parfait pour chaque occasion — {cars.length} voitures disponibles.
            </p>
          </div>
        </div>

        {/* Categories */}
        <Categories />

        {/* Cars Grid */}
        <section id="catalogue" className="cars-page__grid-section">
          <div className="container">
            <div className="cars-page__grid-header">
              <div>
                <div className="section-label">Catalogue complet</div>
                <h2 className="section-title">TOUTES LES <span>VOITURES</span></h2>
              </div>
              <div className="cars-page__filters">
                <button
                  className={`cars-page__filter ${activeFilter === 'all' ? 'cars-page__filter--active' : ''}`}
                  onClick={() => setActiveFilter('all')}
                >
                  Tous
                </button>
                {categories.map(c => (
                  <button
                    key={c.id}
                    className={`cars-page__filter ${activeFilter === c.id ? 'cars-page__filter--active' : ''}`}
                    onClick={() => setActiveFilter(c.id)}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="cars-page__grid">
              {filtered.map(car => (
                <CarCard
                  key={car.id}
                  car={car}
                  isAvailable={!unavailableCars.has(car.id)}
                  onRequest={!unavailableCars.has(car.id) ? () => handleOpenModal(car) : undefined}
                />
              ))}
            </div>

            {filtered.length === 0 && (
              <div className="cars-page__empty">
                <p>Aucun véhicule trouvé dans cette catégorie.</p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />

      {/* Request Modal */}
      {selectedCar && (
        <div className="cars-modal-overlay" onClick={handleCloseModal}>
          <div className="cars-modal" onClick={e => e.stopPropagation()}>
            <button className="cars-modal__close" onClick={handleCloseModal}>
              <X size={20} />
            </button>

            {submitted ? (
              <div className="cars-modal__success">
                <CheckCircle size={48} color="#16a34a" />
                <h3>Demande envoyée !</h3>
                <p>
                  Votre demande pour <strong>{selectedCar.name}</strong> a bien été reçue.
                  Notre équipe vous contactera au <strong>{form.customerPhone}</strong> pour confirmer.
                </p>
                <button className="btn-primary" onClick={handleCloseModal}>Fermer</button>
              </div>
            ) : (
              <>
                <div className="cars-modal__header">
                  <div className="section-label">Demande de location</div>
                  <h3>{selectedCar.name}</h3>
                  <p className="cars-modal__rate">{selectedCar.price.toLocaleString('fr-FR')} DZD/j</p>
                </div>

                <form className="cars-modal__form" onSubmit={handleSubmitRequest}>
                  <div className="cars-modal__field">
                    <label>Nom complet</label>
                    <input
                      type="text"
                      required
                      placeholder="Votre nom complet"
                      value={form.customerName}
                      onChange={e => setForm(f => ({ ...f, customerName: e.target.value }))}
                    />
                  </div>
                  <div className="cars-modal__field">
                    <label>Téléphone</label>
                    <input
                      type="tel"
                      required
                      placeholder="+213 5XX XXX XXX"
                      value={form.customerPhone}
                      onChange={e => setForm(f => ({ ...f, customerPhone: e.target.value }))}
                    />
                  </div>
                  <div className="cars-modal__row">
                    <div className="cars-modal__field">
                      <label>Date de début</label>
                      <input
                        type="date"
                        required
                        value={form.startDate}
                        onChange={e => setForm(f => ({ ...f, startDate: e.target.value }))}
                      />
                    </div>
                    <div className="cars-modal__field">
                      <label>Date de fin</label>
                      <input
                        type="date"
                        required
                        value={form.endDate}
                        onChange={e => setForm(f => ({ ...f, endDate: e.target.value }))}
                      />
                    </div>
                  </div>
                  <button type="submit" className="btn-primary cars-modal__submit">
                    Envoyer la demande
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
