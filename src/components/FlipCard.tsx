import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

interface LinkItem { label: string; href: string; internal?: boolean }

export default function FlipCard({ image, title, description, links }:{ image: string; title: string; description: string; links: LinkItem[] }) {
  const navigate = useNavigate();
  const [flipped, setFlipped] = useState(false);
  return (
    <div className={`card flip-card ${flipped ? 'flipped' : ''}`} onClick={() => setFlipped(!flipped)} style={{ cursor: 'pointer', perspective: '1000px' }}>
      <div className="flip-inner" style={{ position: 'relative', width: '100%', height: '100%', transition: 'transform .6s', transformStyle: 'preserve-3d', transform: flipped ? 'rotateY(180deg)' : 'none' }}>
        <div className="flip-front" style={{ position: 'absolute', inset: 0, backfaceVisibility: 'hidden' }}>
          <img src={image} alt={title} className="card-image" />
          <div className="card-content">
            <h3 className="card-title">{title}</h3>
            <p className="card-text">{description}</p>
          </div>
        </div>
        <div className="flip-back" style={{ position: 'absolute', inset: 0, backfaceVisibility: 'hidden', transform: 'rotateY(180deg)', background: '#fff' }}>
          <div className="card-content">
            <h3 className="card-title">{title}</h3>
            <ul style={{ paddingLeft: '18px' }}>
              {links.map((l, i) => (
                <li key={i} style={{ marginBottom: '8px' }}>
                  {l.internal ? (
                    <span 
                      onClick={(e) => {
                        e.stopPropagation();
                        if (l.href.startsWith('#')) {
                          const el = document.querySelector(l.href) as HTMLElement | null;
                          if (el) {
                            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            return;
                          }
                        }
                        navigate(l.href);
                      }}
                      style={{ cursor: 'pointer', color: '#136096' }}
                    >
                      {l.label} →
                    </span>
                  ) : (
                    <a 
                      href={l.href}
                      target={l.href.startsWith('#') ? undefined : "_blank"}
                      rel={l.href.startsWith('#') ? undefined : "noopener noreferrer"}
                      onClick={(e) => {
                        if (l.href.startsWith('#')) {
                          e.preventDefault();
                          e.stopPropagation();
                          const el = document.querySelector(l.href) as HTMLElement | null;
                          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        } else {
                          e.stopPropagation();
                        }
                      }}
                    >
                      {l.label} →
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
