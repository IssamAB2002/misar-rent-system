import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Phone, Mail, MapPin, Clock, Shield, Award, Users, Heart } from 'lucide-react';
import './ContactPage.css';

const values = [
  { Icon: Shield, title: 'Confiance', desc: 'Service transparent et honnête depuis plus de 10 ans.' },
  { Icon: Award, title: 'Qualité', desc: 'Flotte entretenue et contrôlée régulièrement pour votre sécurité.' },
  { Icon: Users, title: 'Accessibilité', desc: 'Sans inscription requise — la location pour tout le monde.' },
  { Icon: Heart, title: 'Satisfaction', desc: 'Plus de 15 000 clients satisfaits à travers toute l\'Algérie.' },
];

const contactItems = [
  { Icon: Phone, label: 'Téléphone', value: '+213 555 000 000', href: 'tel:+213555000000' },
  { Icon: Mail, label: 'Email', value: 'contact@bmscars.dz', href: 'mailto:contact@bmscars.dz' },
  { Icon: MapPin, label: 'Adresse', value: 'Rue Larbi Ben M\'hidi, Alger', href: null },
  { Icon: Clock, label: 'Horaires', value: 'Lun – Sam : 08:00 – 20:00\nDim : 09:00 – 18:00', href: null },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  return (
    <>
      <Navbar />
      <main className="contact-page">
        {/* Banner */}
        <div className="contact-page__banner">
          <div className="container">
            <div className="section-label">À Propos de Nous</div>
            <h1 className="contact-page__title">BMS <span>CARS RENT</span></h1>
            <p className="contact-page__subtitle">
              Location de voitures de confiance en Algérie. Simple, rapide, sans inscription.
            </p>
          </div>
        </div>

        {/* About Section */}
        <section id="about" className="contact-page__about">
          <div className="container contact-page__about-inner">
            <div className="contact-page__about-text">
              <div className="section-label">Notre Histoire</div>
              <h2 className="section-title">QUI <span>SOMMES-NOUS</span>&nbsp;?</h2>
              <p className="contact-page__about-p">
                BMS Cars Rent est une agence de location de véhicules basée à Alger,
                fondée avec une mission claire : rendre la location de voiture accessible
                à tous les Algériens, sans friction et sans paperasse inutile.
              </p>
              <p className="contact-page__about-p">
                Notre système innovant permet à nos clients de suivre leur location en
                temps réel via un simple QR code — aucune application à télécharger,
                aucun compte à créer. Juste la route qui s'ouvre devant vous.
              </p>
              <div className="contact-page__stats">
                {[
                  { v: '500+', l: 'Véhicules' },
                  { v: '15K+', l: 'Clients' },
                  { v: '50+', l: 'Villes' },
                  { v: '10+', l: "Ans d'expérience" },
                ].map(s => (
                  <div key={s.l} className="contact-page__stat">
                    <span className="contact-page__stat-value">{s.v}</span>
                    <span className="contact-page__stat-label">{s.l}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="contact-page__values">
              {values.map(({ Icon, title, desc }) => (
                <div key={title} className="contact-page__value-card">
                  <div className="contact-page__value-icon">
                    <Icon size={22} />
                  </div>
                  <div>
                    <h4 className="contact-page__value-title">{title}</h4>
                    <p className="contact-page__value-desc">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact-info" className="contact-page__contact">
          <div className="container">
            <div className="contact-page__contact-header">
              <div className="section-label">Contactez-Nous</div>
              <h2 className="section-title">PRENEZ <span>CONTACT</span></h2>
            </div>

            <div className="contact-page__contact-inner">
              {/* Info */}
              <div className="contact-page__info">
                {contactItems.map(({ Icon, label, value, href }) => (
                  <div key={label} className="contact-page__info-item">
                    <div className="contact-page__info-icon">
                      <Icon size={20} />
                    </div>
                    <div>
                      <h4 className="contact-page__info-label">{label}</h4>
                      {href ? (
                        <a href={href} className="contact-page__info-value contact-page__info-link">
                          {value}
                        </a>
                      ) : (
                        <p className="contact-page__info-value" style={{ whiteSpace: 'pre-line' }}>{value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Form */}
              <form className="contact-page__form" onSubmit={e => e.preventDefault()}>
                <h3 className="contact-page__form-title">Envoyez-nous un message</h3>

                <div className="contact-page__form-row">
                  <div className="contact-page__form-group">
                    <label>Nom complet</label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Votre nom"
                      value={form.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="contact-page__form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="votre@email.com"
                      value={form.email}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="contact-page__form-group">
                  <label>Téléphone</label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="+213 555 000 000"
                    value={form.phone}
                    onChange={handleChange}
                  />
                </div>

                <div className="contact-page__form-group">
                  <label>Message</label>
                  <textarea
                    name="message"
                    placeholder="Votre message..."
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                  />
                </div>

                <button type="submit" className="btn-primary contact-page__submit">
                  Envoyer le message
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
