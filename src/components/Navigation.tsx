import React from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { translationsEs, translationsEn } from '../translations';
import { useLocation, useNavigate } from 'react-router-dom';
import LanguageSelector from './LanguageSelector';

interface Props { activeSection: string; setActiveSection: (s: string) => void; }

const Navigation: React.FC<Props> = ({ activeSection, setActiveSection }) => {
  const { language } = useLanguage();
  const t = language === 'es' ? translationsEs : translationsEn;
  const location = useLocation();
  const navigate = useNavigate();

  const items = [
    { id: 'home', label: t.home },
    { id: 'explore', label: t.explore },
    { id: 'connect', label: t.connect },
    { id: 'transform', label: t.transform },
    { id: 'contact', label: t.contact },
    // Interact and Learn are intentionally hidden from navigation
  ];

  const BASE = import.meta.env.BASE_URL || '/'
  const handleNavigation = (sectionId: string) => {
    if (location.pathname !== BASE) {
      navigate('/');
    }
    setActiveSection(sectionId);
  };

  return (
    <nav className="navigation">
      <div className="container nav-inner">
        <ul className="nav-list">
          {items.map(item => (
            <li key={item.id} className="nav-item">
              <button
                onClick={() => handleNavigation(item.id)}
                className={`nav-link ${activeSection === item.id && location.pathname === BASE ? 'active' : ''}`}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
        <div className="nav-lang">
          <LanguageSelector />
        </div>
      </div>
    </nav>
  );
};
export default Navigation;
