import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { QrCode, ArrowRight, Car, Clock, Settings } from 'lucide-react';
import './DebugPage.css';

const demoRentals = [
  {
    uuid: 'demo-1234',
    customer: 'Karim Bensalem',
    car: 'Toyota Corolla',
    category: 'Berline',
    dates: '24 – 28 juin 2026',
    rate: '3 500 DZD/j',
    status: 'En cours',
  },
  {
    uuid: 'demo-5678',
    customer: 'Amina Touati',
    car: 'Dacia Duster',
    category: 'SUV',
    dates: '22 – 29 juin 2026',
    rate: '4 500 DZD/j',
    status: 'En cours',
  },
];

export default function DebugPage() {
  return (
    <>
      <Navbar />
      <main className="debug-page">
        <div className="container">
          <div className="debug-page__header">
            <div className="section-label">Mode Debug</div>
            <h1 className="debug-page__title">LOCATIONS <span>DÉMO</span></h1>
            <p className="debug-page__subtitle">
              Accès rapide aux pages de location client pour tests et démonstrations.
              Ces pages simulent l'expérience après scan du QR code.
            </p>
          </div>

          <div className="debug-page__cards">
            {demoRentals.map(r => (
              <Link key={r.uuid} to={`/rental/${r.uuid}`} className="debug-page__card">
                <div className="debug-page__card-top">
                  <div className="debug-page__card-icon">
                    <QrCode size={28} />
                  </div>
                  <span className="debug-page__status">{r.status}</span>
                </div>

                <div className="debug-page__card-info">
                  <h3 className="debug-page__customer">{r.customer}</h3>
                  <div className="debug-page__meta">
                    <span className="debug-page__meta-item">
                      <Car size={14} /> {r.car} · {r.category}
                    </span>
                    <span className="debug-page__meta-item">
                      <Clock size={14} /> {r.dates}
                    </span>
                  </div>
                  <p className="debug-page__rate">{r.rate}</p>
                </div>

                <div className="debug-page__card-footer">
                  <code className="debug-page__uuid">/rental/{r.uuid}</code>
                  <ArrowRight size={18} />
                </div>
              </Link>
            ))}
          </div>

          <div className="debug-page__note">
            <p>
              Pour tester le flux client, cliquez sur une carte ci-dessus ou naviguez
              directement vers <code>/rental/demo-1234</code> ou <code>/rental/demo-5678</code>.
            </p>
            <p style={{ marginTop: 12 }}>
              <Link to="/admin" style={{ color: 'var(--red)', display: 'inline-flex', alignItems: 'center', gap: 6, fontWeight: 600 }}>
                <Settings size={14} /> Accéder au Panel Admin (Système Misar)
              </Link>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
