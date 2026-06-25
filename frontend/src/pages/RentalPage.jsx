import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Phone, AlertCircle, CalendarPlus, RotateCcw, Car, Clock, TrendingUp, CheckCircle, XCircle, ArrowLeft } from 'lucide-react';
import { getRentalByUUID, updateRental } from '../utils/storage';
import './RentalPage.css';

const AGENCY_PHONE = '+213 555 000 000';

const MOCK_RENTALS = {
  'demo-1234': {
    uuid: 'demo-1234',
    customerName: 'Karim Bensalem',
    carName: 'Toyota Corolla',
    carCategory: 'Berline',
    startDate: '2026-06-24',
    endDate: '2026-06-28',
    status: 'active',
    dailyRate: 3500,
    extensionRequest: null,
  },
  'demo-5678': {
    uuid: 'demo-5678',
    customerName: 'Amina Touati',
    carName: 'Dacia Duster',
    carCategory: 'SUV',
    startDate: '2026-06-22',
    endDate: '2026-06-29',
    status: 'active',
    dailyRate: 4500,
    extensionRequest: null,
  },
};

function getDaysElapsed(startDate) {
  const start = new Date(startDate);
  const today = new Date();
  const diff = Math.floor((today - start) / (1000 * 60 * 60 * 24));
  return Math.max(0, diff + 1);
}

function getDaysTotal(startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  return Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

function formatDZD(amount) {
  return amount.toLocaleString('fr-FR') + ' DZD';
}

export default function RentalPage() {
  const { uuid } = useParams();
  const [rental, setRental] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [extDays, setExtDays] = useState(1);
  const [extSent, setExtSent] = useState(false);
  const [activeTab, setActiveTab] = useState('details');

  useEffect(() => {
    setTimeout(() => {
      const fromStorage = getRentalByUUID(uuid);
      const found = fromStorage || MOCK_RENTALS[uuid] || null;
      if (found) {
        setRental(found);
      } else {
        setNotFound(true);
      }
      setLoading(false);
    }, 600);
  }, [uuid]);

  if (loading) {
    return (
      <div className="rental-page rental-page--loading">
        <div className="rental-loading">
          <div className="rental-loading__spinner" />
          <p>Chargement de votre location…</p>
        </div>
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="rental-page rental-page--error">
        <div className="rental-error">
          <XCircle size={56} />
          <h2>Location introuvable</h2>
          <p>Ce lien de location n'est pas valide ou a expiré.</p>
          <a href="/" className="btn-primary">Retour à l'accueil</a>
        </div>
      </div>
    );
  }

  const daysElapsed = getDaysElapsed(rental.startDate);
  const daysTotal = getDaysTotal(rental.startDate, rental.endDate);
  const daysRemaining = Math.max(0, daysTotal - daysElapsed);
  const costSoFar = daysElapsed * rental.dailyRate;
  const totalCost = daysTotal * rental.dailyRate;
  const progress = Math.min(100, (daysElapsed / daysTotal) * 100);

  const handleExtend = () => {
    const request = { days: extDays, requestedAt: new Date().toISOString(), status: 'pending' };
    const updated = updateRental(uuid, { extensionRequest: request });
    if (!updated && MOCK_RENTALS[uuid]) {
      // demo rental — just show success without persisting
    }
    setExtSent(true);
  };

  return (
    <div className="rental-page">
      {/* Header */}
      <header className="rental-header">
        <div className="rental-header__inner">
          <a href="/" className="rental-header__back">
            <ArrowLeft size={18} />
            BMS Location
          </a>
          <div className="rental-header__logo">
            <span className="rental-header__logo-bms">BMS</span>
            <span className="rental-header__logo-tag">Location</span>
          </div>
          <a href={`tel:${AGENCY_PHONE}`} className="rental-header__phone">
            <Phone size={16} />
            <span>Appeler l'agence</span>
          </a>
        </div>
      </header>

      <main className="rental-main">
        <div className="rental-container">

          {/* Hero summary card */}
          <div className="rental-summary">
            <div className="rental-summary__left">
              <div className="rental-summary__status rental-summary__status--active">
                <CheckCircle size={14} />
                Location active
              </div>
              <h1 className="rental-summary__name">Bonjour, {rental.customerName}</h1>
              <div className="rental-summary__car">
                <Car size={18} />
                <span>{rental.carName}</span>
                <span className="rental-summary__category">{rental.carCategory}</span>
              </div>
              <div className="rental-summary__dates">
                <div className="rental-summary__date-item">
                  <span className="rental-summary__date-label">Début</span>
                  <span className="rental-summary__date-val">{formatDate(rental.startDate)}</span>
                </div>
                <div className="rental-summary__date-arrow">→</div>
                <div className="rental-summary__date-item">
                  <span className="rental-summary__date-label">Fin</span>
                  <span className="rental-summary__date-val">{formatDate(rental.endDate)}</span>
                </div>
              </div>
            </div>
            <div className="rental-summary__right">
              <div className="rental-summary__cost-box">
                <span className="rental-summary__cost-label">Coût accumulé</span>
                <span className="rental-summary__cost-amount">{formatDZD(costSoFar)}</span>
                <span className="rental-summary__cost-sub">{daysElapsed} j × {formatDZD(rental.dailyRate)}</span>
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="rental-progress">
            <div className="rental-progress__header">
              <span>
                <Clock size={14} /> Jour {daysElapsed} sur {daysTotal}
              </span>
              <span>{daysRemaining} jour{daysRemaining > 1 ? 's' : ''} restant{daysRemaining > 1 ? 's' : ''}</span>
            </div>
            <div className="rental-progress__bar">
              <div
                className="rental-progress__fill"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Tabs */}
          <div className="rental-tabs">
            {[
              { id: 'details', label: 'Détails' },
              { id: 'cost', label: 'Coût' },
              { id: 'extend', label: 'Prolonger' },
              { id: 'actions', label: 'Actions' },
            ].map(tab => (
              <button
                key={tab.id}
                className={`rental-tab ${activeTab === tab.id ? 'rental-tab--active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div className="rental-tab-content">

            {/* Details tab */}
            {activeTab === 'details' && (
              <div className="rental-details">
                <div className="rental-info-grid">
                  {[
                    { label: 'Client', value: rental.customerName },
                    { label: 'Voiture', value: rental.carName },
                    { label: 'Catégorie', value: rental.carCategory },
                    { label: 'Tarif journalier', value: formatDZD(rental.dailyRate) },
                    { label: 'Date de début', value: formatDate(rental.startDate) },
                    { label: 'Date de fin', value: formatDate(rental.endDate) },
                    { label: 'Durée totale', value: `${daysTotal} jours` },
                    { label: 'Statut', value: 'Active' },
                  ].map(({ label, value }) => (
                    <div key={label} className="rental-info-item">
                      <span className="rental-info-label">{label}</span>
                      <span className="rental-info-value">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Cost tab */}
            {activeTab === 'cost' && (
              <div className="rental-cost">
                <div className="rental-cost__header">
                  <TrendingUp size={20} />
                  <h3>Accumulation du coût</h3>
                </div>
                <div className="rental-cost__rows">
                  {Array.from({ length: daysTotal }, (_, i) => {
                    const day = i + 1;
                    const amount = day * rental.dailyRate;
                    const isPast = day <= daysElapsed;
                    const isToday = day === daysElapsed;
                    return (
                      <div
                        key={day}
                        className={`rental-cost__row ${isToday ? 'rental-cost__row--today' : ''} ${!isPast ? 'rental-cost__row--future' : ''}`}
                      >
                        <div className="rental-cost__day">
                          <span className="rental-cost__day-num">Jour {day}</span>
                          {isToday && <span className="rental-cost__today-tag">Aujourd'hui</span>}
                        </div>
                        <div className="rental-cost__calc">
                          {day} j × {formatDZD(rental.dailyRate)}
                        </div>
                        <div className={`rental-cost__total ${isPast ? 'rental-cost__total--active' : ''}`}>
                          {formatDZD(amount)}
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="rental-cost__summary">
                  <div className="rental-cost__summary-row">
                    <span>Total à ce jour</span>
                    <span className="rental-cost__summary-val">{formatDZD(costSoFar)}</span>
                  </div>
                  <div className="rental-cost__summary-row rental-cost__summary-row--total">
                    <span>Total prévu (fin de location)</span>
                    <span className="rental-cost__summary-val rental-cost__summary-val--red">{formatDZD(totalCost)}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Extend tab */}
            {activeTab === 'extend' && (
              <div className="rental-extend">
                <div className="rental-extend__header">
                  <CalendarPlus size={20} />
                  <h3>Prolonger la location</h3>
                </div>
                {extSent ? (
                  <div className="rental-extend__success">
                    <CheckCircle size={40} />
                    <h4>Demande envoyée !</h4>
                    <p>Votre demande de prolongement de <strong>{extDays} jour{extDays > 1 ? 's' : ''}</strong> a été transmise à l'agence. Vous serez contacté rapidement.</p>
                  </div>
                ) : (
                  <>
                    <p className="rental-extend__desc">
                      Sélectionnez le nombre de jours supplémentaires. L'agence confirmera votre demande.
                    </p>
                    <div className="rental-extend__current">
                      <span>Date de fin actuelle :</span>
                      <strong>{formatDate(rental.endDate)}</strong>
                    </div>
                    <div className="rental-extend__selector">
                      <label>Jours supplémentaires</label>
                      <div className="rental-extend__days">
                        {[1, 2, 3, 4, 5, 7].map(d => (
                          <button
                            key={d}
                            className={`rental-extend__day-btn ${extDays === d ? 'rental-extend__day-btn--active' : ''}`}
                            onClick={() => setExtDays(d)}
                          >
                            +{d}j
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="rental-extend__cost-preview">
                      <div className="rental-extend__cost-row">
                        <span>Jours ajoutés</span>
                        <span>+{extDays} jour{extDays > 1 ? 's' : ''}</span>
                      </div>
                      <div className="rental-extend__cost-row rental-extend__cost-row--total">
                        <span>Coût supplémentaire estimé</span>
                        <span>{formatDZD(extDays * rental.dailyRate)}</span>
                      </div>
                    </div>
                    <button className="btn-primary rental-extend__submit" onClick={handleExtend}>
                      Demander le prolongement de {extDays} jour{extDays > 1 ? 's' : ''}
                    </button>
                    <p className="rental-extend__note">
                      La demande sera examinée par l'agence. Le prolongement n'est pas automatique.
                    </p>
                  </>
                )}
              </div>
            )}

            {/* Actions tab */}
            {activeTab === 'actions' && (
              <div className="rental-actions">
                <h3>Actions disponibles</h3>
                <div className="rental-actions__grid">
                  <a href={`tel:${AGENCY_PHONE}`} className="rental-action-card">
                    <Phone size={28} />
                    <h4>Appeler l'agence</h4>
                    <p>Contactez-nous directement pour toute question ou urgence.</p>
                    <span className="rental-action-card__link">{AGENCY_PHONE}</span>
                  </a>
                  <button className="rental-action-card" onClick={() => setActiveTab('extend')}>
                    <CalendarPlus size={28} />
                    <h4>Prolonger la location</h4>
                    <p>Ajoutez des jours supplémentaires à votre période de location.</p>
                    <span className="rental-action-card__link">Voir les options →</span>
                  </button>
                  <div className="rental-action-card">
                    <RotateCcw size={28} />
                    <h4>Instructions de retour</h4>
                    <p>Ramenez la voiture propre, avec le plein fait, au même point de prise en charge.</p>
                    <span className="rental-action-card__link rental-action-card__link--gray">Agence BMS — Alger Centre</span>
                  </div>
                  <div className="rental-action-card">
                    <AlertCircle size={28} />
                    <h4>Signaler un problème</h4>
                    <p>Incident, panne ou dégât ? Contactez-nous immédiatement par téléphone.</p>
                    <a href={`tel:${AGENCY_PHONE}`} className="rental-action-card__link">Appel urgence →</a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="rental-footer">
        <p>© 2026 BMS Location — Alger, Algérie</p>
        <p>Location n° {rental.uuid.toUpperCase()}</p>
      </footer>
    </div>
  );
}
