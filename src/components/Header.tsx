import React from 'react';
const Header: React.FC = () => (
  <header className="header">
    {(() => { const base = import.meta.env.BASE_URL || '/'; return (
      <img src={`${base}images/banner.png`} alt="Banner" className="banner" />
    )})()}
  </header>
);
export default Header;
