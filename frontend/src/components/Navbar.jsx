import { useState, useEffect } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import logoImg from '../../1782335142954.png';
import './Navbar.css';

const navLinks = [
  { label: 'Accueil', to: '/' },
  { label: 'Voitures', to: '/voitures' },
  { label: 'Catégories', href: '/#categories' },
  { label: 'Comment ça marche', href: '/#how-it-works' },
  { label: 'Contact', to: '/contact' },
];

function NavLink({ link, className, onClick }) {
  const location = useLocation();
  const isActive = link.to && location.pathname === link.to;
  if (link.to) {
    return (
      <Link
        to={link.to}
        className={`${className} ${isActive ? `${className}--active` : ''}`}
        onClick={onClick}
      >
        {link.label}
      </Link>
    );
  }
  return (
    <a href={link.href} className={className} onClick={onClick}>
      {link.label}
    </a>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="container navbar__inner">
        {/* Logo */}
        <Link to="/" className="navbar__logo">
          <img src={logoImg} alt="BMS Location" className="navbar__logo-img" />
        </Link>

        {/* Desktop Links */}
        <nav className="navbar__links">
          {navLinks.map((l) => (
            <NavLink key={l.label} link={l} className="navbar__link" />
          ))}
        </nav>

        {/* CTA */}
        <div className="navbar__actions">
          <a href="tel:+213555000000" className="navbar__phone">
            <Phone size={16} />
            <span>+213 555 000 000</span>
          </a>
          <Link to="/voitures" className="btn-primary navbar__cta">
            Réserver
          </Link>
        </div>

        {/* Hamburger */}
        <button
          className="navbar__hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <div className={`navbar__drawer ${menuOpen ? 'navbar__drawer--open' : ''}`}>
        {navLinks.map((l) => (
          <NavLink
            key={l.label}
            link={l}
            className="navbar__drawer-link"
            onClick={() => setMenuOpen(false)}
          />
        ))}
        <Link
          to="/voitures"
          className="btn-primary"
          style={{ marginTop: '16px' }}
          onClick={() => setMenuOpen(false)}
        >
          Voir les voitures
        </Link>
      </div>
    </header>
  );
}
