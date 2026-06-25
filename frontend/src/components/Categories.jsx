import { useState, useRef } from "react";
import { categories } from "../data/cars";
import "./Categories.css";

const categoryDetails = {
  suv: {
    desc: "Spacieux et puissants, parfaits pour les familles et les routes difficiles.",
    count: 38,
    gradient: "linear-gradient(135deg, #1a3a2a 0%, #0d2015 100%)",
    accent: "#2a8a5a",
  },
  berline: {
    desc: "Confortables et économiques pour les trajets quotidiens en ville.",
    count: 72,
    gradient: "linear-gradient(135deg, #1a2a3a 0%, #0d1525 100%)",
    accent: "#2a5a8a",
  },
  sport: {
    desc: "Performances élevées pour des sensations de conduite pures.",
    count: 24,
    gradient: "linear-gradient(135deg, #3a1a1a 0%, #250d0d 100%)",
    accent: "#e01010",
  },
  luxe: {
    desc: "Confort premium et élégance pour les clients les plus exigeants.",
    count: 19,
    gradient: "linear-gradient(135deg, #2a2010 0%, #1a1508 100%)",
    accent: "#d4a017",
  },
  electrique: {
    desc: "Véhicules écologiques et modernes. Zéro émission, pleine puissance.",
    count: 15,
    gradient: "linear-gradient(135deg, #0a2a3a 0%, #061520 100%)",
    accent: "#0ea5e9",
  },
  pickup: {
    desc: "Robustes et polyvalents, idéaux pour les charges et les terrains difficiles.",
    count: 12,
    gradient: "linear-gradient(135deg, #1a1a0a 0%, #100f06 100%)",
    accent: "#8a7a2a",
  },
};

const CategorySVG = ({ id }) => {
  const svgs = {
    suv: (
      <svg
        viewBox="0 0 120 60"
        xmlns="http://www.w3.org/2000/svg"
        className="cat-svg">
        <path
          d="M10 42 L16 28 L38 20 L82 20 L104 28 L110 42 Z"
          fill="rgba(255,255,255,0.12)"
          stroke="rgba(255,255,255,0.25)"
          strokeWidth="1"
        />
        <rect
          x="10"
          y="42"
          width="100"
          height="10"
          rx="3"
          fill="rgba(255,255,255,0.08)"
        />
        <path
          d="M32 28 L42 20 L78 20 L90 28 Z"
          fill="rgba(100,200,150,0.15)"
          stroke="rgba(100,200,150,0.3)"
          strokeWidth="0.5"
        />
        <ellipse
          cx="30"
          cy="52"
          rx="9"
          ry="9"
          fill="rgba(0,0,0,0.6)"
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="1"
        />
        <ellipse cx="30" cy="52" rx="5" ry="5" fill="#2a8a5a" opacity="0.8" />
        <ellipse
          cx="90"
          cy="52"
          rx="9"
          ry="9"
          fill="rgba(0,0,0,0.6)"
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="1"
        />
        <ellipse cx="90" cy="52" rx="5" ry="5" fill="#2a8a5a" opacity="0.8" />
        <line
          x1="10"
          y1="36"
          x2="110"
          y2="36"
          stroke="#2a8a5a"
          strokeWidth="1.5"
        />
        <ellipse cx="12" cy="34" rx="6" ry="4" fill="#e01010" opacity="0.9" />
        <ellipse cx="108" cy="34" rx="5" ry="3" fill="#e01010" opacity="0.7" />
      </svg>
    ),
    berline: (
      <svg
        viewBox="0 0 120 60"
        xmlns="http://www.w3.org/2000/svg"
        className="cat-svg">
        <path
          d="M12 42 L18 32 L40 24 L80 24 L102 32 L108 42 Z"
          fill="rgba(255,255,255,0.10)"
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="1"
        />
        <rect
          x="12"
          y="42"
          width="96"
          height="8"
          rx="2"
          fill="rgba(255,255,255,0.06)"
        />
        <path
          d="M36 32 L50 24 L70 24 L86 32 Z"
          fill="rgba(100,150,200,0.15)"
          stroke="rgba(100,150,200,0.3)"
          strokeWidth="0.5"
        />
        <ellipse
          cx="32"
          cy="50"
          rx="8"
          ry="8"
          fill="rgba(0,0,0,0.6)"
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="1"
        />
        <ellipse cx="32" cy="50" rx="4" ry="4" fill="#2a5a8a" opacity="0.8" />
        <ellipse
          cx="88"
          cy="50"
          rx="8"
          ry="8"
          fill="rgba(0,0,0,0.6)"
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="1"
        />
        <ellipse cx="88" cy="50" rx="4" ry="4" fill="#2a5a8a" opacity="0.8" />
        <line
          x1="12"
          y1="37"
          x2="108"
          y2="37"
          stroke="#2a5a8a"
          strokeWidth="1.5"
        />
        <ellipse cx="14" cy="36" rx="5" ry="3" fill="#e01010" opacity="0.9" />
        <ellipse cx="106" cy="36" rx="4" ry="3" fill="#e01010" opacity="0.7" />
      </svg>
    ),
    sport: (
      <svg
        viewBox="0 0 120 60"
        xmlns="http://www.w3.org/2000/svg"
        className="cat-svg">
        <path
          d="M8 44 L20 30 L50 22 L70 22 L100 30 L112 44 Z"
          fill="rgba(255,255,255,0.09)"
          stroke="rgba(255,255,255,0.18)"
          strokeWidth="1"
        />
        <rect
          x="8"
          y="44"
          width="104"
          height="7"
          rx="2"
          fill="rgba(255,255,255,0.05)"
        />
        <path
          d="M40 30 L58 22 L62 22 L82 30 Z"
          fill="rgba(255,80,80,0.2)"
          stroke="rgba(255,80,80,0.4)"
          strokeWidth="0.5"
        />
        <ellipse
          cx="28"
          cy="51"
          rx="8"
          ry="8"
          fill="rgba(0,0,0,0.6)"
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="1"
        />
        <ellipse cx="28" cy="51" rx="4" ry="4" fill="#e01010" opacity="0.8" />
        <ellipse
          cx="92"
          cy="51"
          rx="8"
          ry="8"
          fill="rgba(0,0,0,0.6)"
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="1"
        />
        <ellipse cx="92" cy="51" rx="4" ry="4" fill="#e01010" opacity="0.8" />
        <line
          x1="8"
          y1="38"
          x2="112"
          y2="38"
          stroke="#e01010"
          strokeWidth="2"
        />
        <ellipse cx="10" cy="36" rx="6" ry="4" fill="#e01010" opacity="0.9" />
        <ellipse cx="110" cy="36" rx="5" ry="3" fill="#e01010" opacity="0.7" />
      </svg>
    ),
    luxe: (
      <svg
        viewBox="0 0 120 60"
        xmlns="http://www.w3.org/2000/svg"
        className="cat-svg">
        <path
          d="M10 43 L18 30 L42 22 L78 22 L102 30 L110 43 Z"
          fill="rgba(255,255,255,0.11)"
          stroke="rgba(212,160,23,0.3)"
          strokeWidth="1"
        />
        <rect
          x="10"
          y="43"
          width="100"
          height="9"
          rx="3"
          fill="rgba(212,160,23,0.06)"
        />
        <path
          d="M38 30 L52 22 L68 22 L84 30 Z"
          fill="rgba(212,160,23,0.15)"
          stroke="rgba(212,160,23,0.4)"
          strokeWidth="0.5"
        />
        <ellipse
          cx="30"
          cy="52"
          rx="8"
          ry="8"
          fill="rgba(0,0,0,0.6)"
          stroke="rgba(212,160,23,0.3)"
          strokeWidth="1"
        />
        <ellipse cx="30" cy="52" rx="4" ry="4" fill="#d4a017" opacity="0.8" />
        <ellipse
          cx="90"
          cy="52"
          rx="8"
          ry="8"
          fill="rgba(0,0,0,0.6)"
          stroke="rgba(212,160,23,0.3)"
          strokeWidth="1"
        />
        <ellipse cx="90" cy="52" rx="4" ry="4" fill="#d4a017" opacity="0.8" />
        <line
          x1="10"
          y1="37"
          x2="110"
          y2="37"
          stroke="#d4a017"
          strokeWidth="1.5"
        />
        <ellipse cx="12" cy="35" rx="5" ry="3" fill="#e01010" opacity="0.9" />
        <ellipse cx="108" cy="35" rx="4" ry="3" fill="#e01010" opacity="0.7" />
      </svg>
    ),
    electrique: (
      <svg
        viewBox="0 0 120 60"
        xmlns="http://www.w3.org/2000/svg"
        className="cat-svg">
        <path
          d="M12 42 L20 28 L44 21 L76 21 L100 28 L108 42 Z"
          fill="rgba(255,255,255,0.10)"
          stroke="rgba(14,165,233,0.3)"
          strokeWidth="1"
        />
        <rect
          x="12"
          y="42"
          width="96"
          height="9"
          rx="2"
          fill="rgba(14,165,233,0.05)"
        />
        <path
          d="M38 28 L52 21 L68 21 L84 28 Z"
          fill="rgba(14,165,233,0.2)"
          stroke="rgba(14,165,233,0.4)"
          strokeWidth="0.5"
        />
        <ellipse
          cx="32"
          cy="51"
          rx="8"
          ry="8"
          fill="rgba(0,0,0,0.6)"
          stroke="rgba(14,165,233,0.3)"
          strokeWidth="1"
        />
        <ellipse cx="32" cy="51" rx="4" ry="4" fill="#0ea5e9" opacity="0.8" />
        <ellipse
          cx="88"
          cy="51"
          rx="8"
          ry="8"
          fill="rgba(0,0,0,0.6)"
          stroke="rgba(14,165,233,0.3)"
          strokeWidth="1"
        />
        <ellipse cx="88" cy="51" rx="4" ry="4" fill="#0ea5e9" opacity="0.8" />
        <line
          x1="12"
          y1="36"
          x2="108"
          y2="36"
          stroke="#0ea5e9"
          strokeWidth="1.5"
        />
        <path
          d="M57 15 L54 25 L59 25 L56 35 L63 22 L58 22 Z"
          fill="#0ea5e9"
          opacity="0.8"
        />
        <ellipse cx="14" cy="34" rx="5" ry="3" fill="#0ea5e9" opacity="0.6" />
        <ellipse cx="106" cy="34" rx="5" ry="3" fill="#0ea5e9" opacity="0.6" />
      </svg>
    ),
    pickup: (
      <svg
        viewBox="0 0 120 60"
        xmlns="http://www.w3.org/2000/svg"
        className="cat-svg">
        <path
          d="M8 42 L14 26 L44 18 L72 18 L72 42 Z"
          fill="rgba(255,255,255,0.10)"
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="1"
        />
        <rect
          x="72"
          y="26"
          width="42"
          height="16"
          rx="2"
          fill="rgba(255,255,255,0.05)"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="1"
        />
        <rect
          x="8"
          y="42"
          width="106"
          height="9"
          rx="2"
          fill="rgba(255,255,255,0.07)"
        />
        <path
          d="M30 26 L42 18 L72 18 L72 26 Z"
          fill="rgba(138,122,42,0.15)"
          stroke="rgba(138,122,42,0.3)"
          strokeWidth="0.5"
        />
        <ellipse
          cx="28"
          cy="51"
          rx="8"
          ry="8"
          fill="rgba(0,0,0,0.6)"
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="1"
        />
        <ellipse cx="28" cy="51" rx="4" ry="4" fill="#8a7a2a" opacity="0.8" />
        <ellipse
          cx="94"
          cy="51"
          rx="8"
          ry="8"
          fill="rgba(0,0,0,0.6)"
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="1"
        />
        <ellipse cx="94" cy="51" rx="4" ry="4" fill="#8a7a2a" opacity="0.8" />
        <line
          x1="8"
          y1="37"
          x2="114"
          y2="37"
          stroke="#8a7a2a"
          strokeWidth="1.5"
        />
        <ellipse cx="10" cy="35" rx="6" ry="4" fill="#e01010" opacity="0.9" />
        <ellipse cx="112" cy="35" rx="5" ry="3" fill="#e01010" opacity="0.7" />
      </svg>
    ),
  };
  return svgs[id] || null;
};

export default function Categories() {
  const [active, setActive] = useState("suv");
  const scrollRef = useRef(null);

  return (
    <section id="categories" className="categories">
      <div className="container">
        <div className="categories__header">
          <div>
            <div className="section-label">Parcourir par type</div>
            <h2 className="section-title">
              EXPLORER LES <span>CATÉGORIES</span>
            </h2>
          </div>
          <p className="categories__subtitle">
            Des berlines économiques aux 4x4 robustes — tous les goûts, tous les
            budgets.
          </p>
        </div>

        {/* Horizontal scrollable bar */}
        <div className="categories__scrollbar" ref={scrollRef}>
          {categories.map((cat) => {
            const detail = categoryDetails[cat.id];
            return (
              <button
                key={cat.id}
                className={`categories__scroll-item ${active === cat.id ? "categories__scroll-item--active" : ""}`}
                onClick={() => setActive(cat.id)}>
                <div
                  className="categories__scroll-image"
                  style={{ background: detail?.gradient }}>
                  {detail?.image ? (
                    <img src={detail.image} alt={cat.label} className="cat-img" />
                  ) : (
                    <CategorySVG id={cat.id} />
                  )}
                  <span
                    className="categories__scroll-badge"
                    style={{
                      background:
                        active === cat.id ? "var(--red)" : "rgba(0,0,0,0.6)",
                    }}>
                    {detail?.count}
                  </span>
                </div>
                <span className="categories__scroll-label">{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Active category showcase */}
        <div className="categories__showcase">
          {categories.map((cat) => {
            const detail = categoryDetails[cat.id];
            return (
              <div
                key={cat.id}
                className={`categories__panel ${active === cat.id ? "categories__panel--active" : ""}`}
                style={{ background: detail?.gradient }}>
                <div className="categories__panel-content">
                  <div className="categories__panel-visual">
                    {detail?.image ? (
                      <img src={detail.image} alt={cat.label} className="cat-panel-img" />
                    ) : (
                      <CategorySVG id={cat.id} />
                    )}
                  </div>
                  <div>
                    <h3 className="categories__panel-title">{cat.label}</h3>
                    <p className="categories__panel-desc">{detail?.desc}</p>
                    <div className="categories__panel-meta">
                      <span className="categories__panel-count">
                        {detail?.count} véhicules
                      </span>
                      <a
                        href="#catalogue"
                        className="btn-primary categories__panel-btn">
                        Voir tout
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
