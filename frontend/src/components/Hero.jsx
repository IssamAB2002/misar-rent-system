import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import heroImg from "../assets/pngwing car png.png";
import './Hero.css';

const stats = [
  { value: '500+', label: 'Voitures disponibles' },
  { value: '15K+', label: 'Clients satisfaits' },
  { value: '50+', label: 'Villes couvertes' },
  { value: '24/7', label: 'Assistance' },
];

export default function Hero() {

  return (
    <section id="home" className="hero">
      {/* Animated BG grid */}
      <div className="hero__grid" aria-hidden="true" />

      {/* Red glow orbs */}
      <div className="hero__orb hero__orb--1" aria-hidden="true" />
      <div className="hero__orb hero__orb--2" aria-hidden="true" />

      <div className="container hero__inner">
        {/* Left content */}
        <div className="hero__content">
          <div className="section-label">Location de voiture premium</div>

          <h1 className="hero__title">
            CONDUISEZ<br />
            VOTRE VOITURE<br />
            <span>DE RÊVE</span>
          </h1>

          <p className="hero__sub">
            Parcourez notre flotte complète et demandez votre véhicule en ligne —
            notre équipe s'occupe du reste et vous contacte rapidement.
          </p>

          <div className="hero__ctas">
            <a href="#catalogue" className="btn-primary hero__btn">
              Voir la flotte <ArrowRight size={18} />
            </a>
            <Link to="/voitures" className="btn-outline hero__btn">
              Voir les voitures
            </Link>
          </div>
        </div>

        {/* Right: Car illustration */}
        <div className="hero__visual">
          <div className="hero__car-wrap">
            <img src={heroImg} alt="Voiture BMS Location" className="hero__car-img" />
          </div>
          <div className="hero__ring" aria-hidden="true" />
          <div className="hero__ring hero__ring--2" aria-hidden="true" />

          {/* Floating badge */}
          <div className="hero__badge hero__badge--top">
            <span className="hero__badge-dot" />
            Demande<br />Rapide
          </div>
          <div className="hero__badge hero__badge--bottom">
            <span style={{ fontSize: 20 }}>⚡</span>
            Processus simple
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div className="hero__stats">
        {stats.map((s) => (
          <div key={s.label} className="hero__stat">
            <span className="hero__stat-value">{s.value}</span>
            <span className="hero__stat-label">{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

