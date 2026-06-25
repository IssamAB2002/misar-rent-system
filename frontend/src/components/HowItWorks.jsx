import { ClipboardList, QrCode, Smartphone, Car, TrendingUp, CalendarPlus } from 'lucide-react';
import './HowItWorks.css';

const steps = [
  {
    icon: <ClipboardList size={32} />,
    number: '01',
    title: "L'agence crée la location",
    desc: "L'agent saisit les informations du client : Nom complet, Numéro de téléphone, Voiture choisie, Date de début et Date de fin.",
  },
  {
    icon: <Car size={32} />,
    number: '02',
    title: 'Location unique générée',
    desc: "Le système crée une location sans compte client, liée à un identifiant unique (UUID). Aucun compte n'est nécessaire.",
  },
  {
    icon: <QrCode size={32} />,
    number: '03',
    title: 'QR Code généré',
    desc: 'Un QR Code est produit contenant le lien du site combiné à l\'UUID de la location. Prêt à être partagé ou imprimé.',
  },
  {
    icon: <Smartphone size={32} />,
    number: '04',
    title: 'Client scanne le QR Code',
    desc: "L'agence remet le QR Code au client (imprimé ou numérique). Le client le scanne et est redirigé directement vers sa page de location.",
  },
  {
    icon: <TrendingUp size={32} />,
    number: '05',
    title: 'Suivi du coût en temps réel',
    desc: 'La page de location affiche le coût accumulé jour par jour. Ex. : 4 500 DZD/j → Jour 2 = 9 000 DZD → Jour 3 = 13 500 DZD…',
  },
  {
    icon: <CalendarPlus size={32} />,
    number: '06',
    title: 'Le client gère sa location',
    desc: "Depuis sa page personnelle, le client peut prolonger la période de location, consulter les instructions de retour et contacter l'agence.",
  },
];

const perks = [
  { icon: '🔒', title: 'Sans Compte', desc: 'Le client n\'a pas besoin de s\'inscrire. Un simple QR Code suffit.' },
  { icon: '📲', title: 'Accès Instantané', desc: 'Scanner le QR Code redirige directement vers la page de location.' },
  { icon: '💰', title: 'Coût en Temps Réel', desc: 'Le montant dû est mis à jour automatiquement chaque jour (DZD).' },
  { icon: '📅', title: 'Prolongement Facile', desc: 'Ajout de jours supplémentaires directement depuis la page client.' },
  { icon: '🛡️', title: 'Données Sécurisées', desc: 'Vos informations ne sont utilisées que pour la location — jamais partagées.' },
  { icon: '💬', title: 'Support 24h/24', desc: 'Notre équipe est disponible par téléphone — toujours un humain en ligne.' },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="hiw">
      <div className="container">

        <div className="hiw__header">
          <div className="section-label">Processus Simple</div>
          <h2 className="section-title">
            COMMENT ÇA <span>MARCHE</span>
          </h2>
          <p className="hiw__sub">
            Un système pensé pour les clients sans compte — réservé, géré, terminé via un simple QR Code.
          </p>
        </div>

        <div className="hiw__steps hiw__steps--6">
          {steps.map((step, i) => (
            <div key={i} className="hiw__step">
              <div className="hiw__step-number">{step.number}</div>
              <div className="hiw__step-icon">{step.icon}</div>
              <h3 className="hiw__step-title">{step.title}</h3>
              <p className="hiw__step-desc">{step.desc}</p>
              {i < steps.length - 1 && (
                <div className="hiw__step-arrow" aria-hidden="true">→</div>
              )}
            </div>
          ))}
        </div>

        {/* QR flow callout */}
        <div className="hiw__callout">
          <div className="hiw__callout-left">
            <span className="hiw__callout-tag">Pour tous les clients</span>
            <h3 className="hiw__callout-title">
              Pas de compte&nbsp;? <span>Pas de problème.</span>
            </h3>
            <p className="hiw__callout-desc">
              BMS Cars est conçu pour tous. L'agence crée votre location, génère
              un QR Code unique et vous le remet. Il vous suffit de le scanner
              pour accéder à votre page personnelle de location et suivre votre coût en temps réel.
            </p>
            <div className="hiw__callout-ctas">
              <a href="#contact" className="btn-primary">Nous contacter</a>
              <a href="#catalogue" className="btn-outline">Voir les voitures</a>
            </div>
          </div>
          <div className="hiw__callout-right">
            <div className="hiw__qr-preview">
              <div className="hiw__qr-header">
                <span className="hiw__qr-dot hiw__qr-dot--red" />
                <span className="hiw__qr-dot hiw__qr-dot--yellow" />
                <span className="hiw__qr-dot hiw__qr-dot--green" />
                <span className="hiw__qr-title">Ma Location BMS</span>
              </div>
              <div className="hiw__qr-body">
                <div className="hiw__qr-code">
                  <QRMock />
                </div>
                <div className="hiw__qr-info">
                  <div className="hiw__qr-row">
                    <span className="hiw__qr-key">Voiture</span>
                    <span className="hiw__qr-val">Toyota Corolla</span>
                  </div>
                  <div className="hiw__qr-row">
                    <span className="hiw__qr-key">Début</span>
                    <span className="hiw__qr-val">24 juin 2026</span>
                  </div>
                  <div className="hiw__qr-row">
                    <span className="hiw__qr-key">Fin</span>
                    <span className="hiw__qr-val">28 juin 2026</span>
                  </div>
                  <div className="hiw__qr-row hiw__qr-row--cost">
                    <span className="hiw__qr-key">Coût J2</span>
                    <span className="hiw__qr-val hiw__qr-val--red">7 000 DZD</span>
                  </div>
                </div>
                <div className="hiw__qr-btn">Scanner pour accéder →</div>
              </div>
            </div>
          </div>
        </div>

        <div className="hiw__perks">
          {perks.map((p) => (
            <div key={p.title} className="hiw__perk">
              <span className="hiw__perk-icon">{p.icon}</span>
              <h4 className="hiw__perk-title">{p.title}</h4>
              <p className="hiw__perk-desc">{p.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

function QRMock() {
  return (
    <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" className="hiw__qr-svg">
      {/* Top-left finder */}
      <rect x="4" y="4" width="24" height="24" rx="2" fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="2"/>
      <rect x="9" y="9" width="14" height="14" rx="1" fill="rgba(224,16,16,0.9)"/>
      {/* Top-right finder */}
      <rect x="52" y="4" width="24" height="24" rx="2" fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="2"/>
      <rect x="57" y="9" width="14" height="14" rx="1" fill="rgba(224,16,16,0.9)"/>
      {/* Bottom-left finder */}
      <rect x="4" y="52" width="24" height="24" rx="2" fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="2"/>
      <rect x="9" y="57" width="14" height="14" rx="1" fill="rgba(224,16,16,0.9)"/>
      {/* Data dots */}
      {[34,38,42,46,34,42,46,38,42,34,46].map((x,i) => (
        <rect key={i} x={x} y={34 + (i%5)*8} width="4" height="4" rx="0.5" fill={i%3===0 ? "rgba(224,16,16,0.8)" : "rgba(255,255,255,0.5)"}/>
      ))}
      {[54,58,62,66,54,62,66,58].map((x,i) => (
        <rect key={i} x={x} y={54 + (i%3)*8} width="4" height="4" rx="0.5" fill={i%2===0 ? "rgba(255,255,255,0.6)" : "rgba(224,16,16,0.6)"}/>
      ))}
    </svg>
  );
}
