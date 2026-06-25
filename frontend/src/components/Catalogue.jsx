import { useRef, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cars, categories } from '../data/cars';
import CarCard from './CarCard';
import './Catalogue.css';

export default function Catalogue() {
  const trackRef = useRef(null);
  const animRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const posRef = useRef(0);

  const filtered = activeFilter === 'all' ? cars : cars.filter(c => c.category === activeFilter);
  const displayed = [...filtered, ...filtered];

  useEffect(() => {
    const track = trackRef.current;
    if (!track || isPaused) return;

    const cardWidth = 316;
    const halfLen = filtered.length * cardWidth;

    const step = () => {
      posRef.current += 0.5;
      if (posRef.current >= halfLen) posRef.current = 0;
      track.style.transform = `translateX(-${posRef.current}px)`;
      animRef.current = requestAnimationFrame(step);
    };

    animRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animRef.current);
  }, [isPaused, filtered.length]);

  const scrollBy = (dir) => {
    setIsPaused(true);
    posRef.current = Math.max(0, posRef.current + dir * 320);
    if (trackRef.current) {
      trackRef.current.style.transition = 'transform 0.4s ease';
      trackRef.current.style.transform = `translateX(-${posRef.current}px)`;
      setTimeout(() => {
        if (trackRef.current) trackRef.current.style.transition = '';
      }, 400);
    }
    setTimeout(() => setIsPaused(false), 3000);
  };

  return (
    <section id="catalogue" className="catalogue">
      <div className="container">
        <div className="catalogue__header">
          <div>
            <div className="section-label">Notre Flotte</div>
            <h2 className="section-title">
              VOITURES <span>DISPONIBLES</span>
            </h2>
          </div>
          <div className="catalogue__controls">
            <div className="catalogue__filters">
              <button
                className={`catalogue__filter ${activeFilter === 'all' ? 'catalogue__filter--active' : ''}`}
                onClick={() => setActiveFilter('all')}
              >
                Tous
              </button>
              {categories.map(c => (
                <button
                  key={c.id}
                  className={`catalogue__filter ${activeFilter === c.id ? 'catalogue__filter--active' : ''}`}
                  onClick={() => setActiveFilter(c.id)}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div
        className="catalogue__viewport"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="catalogue__fade catalogue__fade--left" />
        <div className="catalogue__fade catalogue__fade--right" />
        <div className="catalogue__track" ref={trackRef}>
          {displayed.map((car, i) => (
            <CarCard key={`${car.id}-${i}`} car={car} />
          ))}
        </div>
      </div>

      <div className="container">
        <div className="catalogue__nav">
          <button className="catalogue__nav-btn" onClick={() => scrollBy(-1)} aria-label="Précédent">
            <ChevronLeft size={20} />
          </button>
          <span className="catalogue__nav-hint">
            {isPaused ? 'En pause — survolez pour parcourir' : 'Défilement auto — survolez pour arrêter'}
          </span>
          <button className="catalogue__nav-btn" onClick={() => scrollBy(1)} aria-label="Suivant">
            <ChevronRight size={20} />
          </button>
        </div>

        <div className="catalogue__cta">
          <p>Vous cherchez quelque chose de précis&nbsp;?</p>
          <a href="#book" className="btn-primary">
            Contactez-nous — Sans Inscription
          </a>
        </div>
      </div>
    </section>
  );
}
