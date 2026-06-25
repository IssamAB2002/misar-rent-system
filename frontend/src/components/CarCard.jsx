import { Users, Fuel, Settings, Zap, Star } from 'lucide-react';
import './CarCard.css';

const fuelIcon = { Électrique: <Zap size={13} />, Hybride: <Zap size={13} /> };
const badgeColor = {
  Populaire: '#e01010',
  'Meilleur Prix': '#16a34a',
  Éco: '#0ea5e9',
  Nouveau: '#a855f7',
  Luxe: '#d97706',
  Premium: '#d97706',
};

const DAYS_FR = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven'];

export default function CarCard({ car, compact = false, isAvailable, onRequest }) {
  const badge = car.badge;

  return (
    <div className={`car-card ${compact ? 'car-card--compact' : ''}`}>
      {badge && (
        <span
          className="car-card__badge"
          style={{ background: badgeColor[badge] || '#e01010' }}
        >
          {badge}
        </span>
      )}

      <div className="car-card__visual" style={{ background: car.color }}>
        {car.image ? (
          <img src={car.image} alt={car.name} className="car-card__img" />
        ) : (
          <MiniCarSVG />
        )}
        <span className="car-card__name-overlay">{car.name.split(' ')[0]}</span>
      </div>

      <div className="car-card__info">
        <div className="car-card__header">
          <div>
            <p className="car-card__brand">{car.name.split(' ').slice(0, -1).join(' ')}</p>
            <h3 className="car-card__model">{car.name.split(' ').slice(-1)[0]}</h3>
          </div>
          <div className="car-card__rating">
            <Star size={12} fill="currentColor" />
            <span>4.8</span>
          </div>
        </div>

        <div className="car-card__specs">
          <span className="car-card__spec">
            <Users size={13} /> {car.seats} places
          </span>
          <span className="car-card__spec">
            <Settings size={13} /> {car.transmission}
          </span>
          <span className="car-card__spec">
            {fuelIcon[car.fuel] || <Fuel size={13} />} {car.fuel}
          </span>
          <span className="car-card__spec">
            ⚡ {car.hp} CV
          </span>
        </div>

        {/* 5-day availability indicator */}
        {car.availability && (
          <div className="car-card__availability">
            <span className="car-card__avail-label">Prochains 5 jours</span>
            <div className="car-card__avail-days">
              {car.availability.map((avail, i) => (
                <span
                  key={i}
                  className={`car-card__avail-day ${avail ? 'car-card__avail-day--ok' : 'car-card__avail-day--no'}`}
                  title={avail ? 'Disponible' : 'Indisponible'}
                >
                  {DAYS_FR[i]}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="car-card__footer">
          <div className="car-card__price">
            <span className="car-card__price-amount">{car.price.toLocaleString('fr-FR')}</span>
            <span className="car-card__price-unit"> DZD/j</span>
          </div>
          {onRequest !== undefined ? (
            isAvailable ? (
              <button className="btn-primary car-card__book" onClick={onRequest}>
                Demander
              </button>
            ) : (
              <span className="car-card__book" style={{ background: '#333', color: '#888', cursor: 'not-allowed', fontSize: '0.78rem' }}>
                Indisponible
              </span>
            )
          ) : (
            <a href="#catalogue" className="btn-primary car-card__book">
              Voir
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

function MiniCarSVG() {
  return (
    <svg viewBox="0 0 240 120" xmlns="http://www.w3.org/2000/svg" className="car-card__svg">
      <ellipse cx="120" cy="110" rx="90" ry="8" fill="rgba(0,0,0,0.4)" />
      <path d="M30 78 L42 58 L80 40 L120 36 L160 40 L198 60 L210 78 Z" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.15)" strokeWidth="1"/>
      <path d="M78 68 L95 45 L120 39 L145 45 L165 68 Z" fill="rgba(100,160,255,0.12)" stroke="rgba(100,160,255,0.3)" strokeWidth="1"/>
      <path d="M30 78 L42 58 L80 40 L80 78Z" fill="rgba(255,255,255,0.04)"/>
      <path d="M210 78 L198 60 L160 40 L160 78Z" fill="rgba(255,255,255,0.04)"/>
      <line x1="30" y1="74" x2="210" y2="74" stroke="#e01010" strokeWidth="2" strokeLinecap="round"/>
      <ellipse cx="67" cy="80" rx="20" ry="20" fill="rgba(0,0,0,0.7)" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5"/>
      <ellipse cx="67" cy="80" rx="13" ry="13" fill="rgba(30,30,30,0.9)" stroke="#e01010" strokeWidth="1.5"/>
      {[0,60,120,180,240,300].map((a,i) => {
        const r = (a*Math.PI)/180;
        return <line key={i} x1={67+Math.cos(r)*7} y1={80+Math.sin(r)*7} x2={67+Math.cos(r)*12} y2={80+Math.sin(r)*12} stroke="#555" strokeWidth="1.5"/>;
      })}
      <ellipse cx="173" cy="80" rx="20" ry="20" fill="rgba(0,0,0,0.7)" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5"/>
      <ellipse cx="173" cy="80" rx="13" ry="13" fill="rgba(30,30,30,0.9)" stroke="#e01010" strokeWidth="1.5"/>
      {[0,60,120,180,240,300].map((a,i) => {
        const r = (a*Math.PI)/180;
        return <line key={i} x1={173+Math.cos(r)*7} y1={80+Math.sin(r)*7} x2={173+Math.cos(r)*12} y2={80+Math.sin(r)*12} stroke="#555" strokeWidth="1.5"/>;
      })}
      <ellipse cx="36" cy="68" rx="8" ry="5" fill="#e01010" opacity="0.9"/>
      <ellipse cx="204" cy="68" rx="7" ry="4" fill="#e01010" opacity="0.9"/>
    </svg>
  );
}
