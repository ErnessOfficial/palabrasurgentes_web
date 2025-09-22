import React from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { translationsEs, translationsEn } from '../translations';

const LanguageSelector: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  const t = language === 'es' ? translationsEs : translationsEn;
  return (
    <div className="language-selector" title={t.language || 'Language'}>
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value as 'es' | 'en')}
        aria-label={t.language || 'Language'}
      >
        <option value="es">🇪🇸 {t.spanish || 'Español'}</option>
        <option value="en">🇬🇧 {t.english || 'English'}</option>
      </select>
    </div>
  );
};

export default LanguageSelector;
