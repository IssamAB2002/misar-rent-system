import { Phone, Mail, MapPin, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
import './Footer.css';

const links = {
  'Agence': ['À propos', 'Carrières', 'Presse', 'Partenaires'],
  'Services': ['Location de voiture', 'Chauffeur privé', 'Location longue durée', 'Entreprises'],
  'Assistance': ['Suivi de location', 'Annulation', 'FAQ', 'Nous contacter'],
  'Légal': ['Politique de confidentialité', 'Conditions d\'utilisation', 'Politique cookies', 'Plan du site'],
};

export default function Footer() {
  return (
    <footer id="contact" className="footer">
      <div className="container">
        <div className="footer__main">
          <div className="footer__brand">
            <div className="footer__logo">
              <span className="footer__logo-bms">BMS</span>
              <span className="footer__logo-tag">Location</span>
            </div>
            <p className="footer__brand-desc">
              Service de location de voitures de confiance en Algérie.
              Demandez votre véhicule en ligne — notre équipe s'occupe du reste.
            </p>
            <div className="footer__contact">
              <a href="tel:+213555000000" className="footer__contact-item">
                <Phone size={15} /> +213 555 000 000
              </a>
              <a href="mailto:contact@bmslocation.dz" className="footer__contact-item">
                <Mail size={15} /> contact@bmslocation.dz
              </a>
              <span className="footer__contact-item">
                <MapPin size={15} /> Rue Larbi Ben M'hidi, Alger
              </span>
            </div>
            <div className="footer__socials">
              {[Facebook, Instagram, Twitter, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="footer__social" aria-label="Lien réseau social">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(links).map(([group, items]) => (
            <div key={group} className="footer__col">
              <h4 className="footer__col-title">{group}</h4>
              <ul>
                {items.map(item => (
                  <li key={item}>
                    <a href="#" className="footer__col-link">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="footer__bottom">
          <p>© 2026 BMS Location. Tous droits réservés.</p>
          <p className="footer__bottom-right">
            Système Misar — Location intelligente et transparente.
          </p>
        </div>
      </div>
    </footer>
  );
}
