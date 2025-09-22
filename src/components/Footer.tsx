import React from 'react';

export const IconYouTube: React.FC<{size?:number}> = ({size=22}) => (
  <svg width={size} height={size} viewBox="0 0 48 48" aria-label="YouTube" role="img">
    <rect x="6" y="12" rx="6" ry="6" width="36" height="24" fill="#FF0000"/>
    <polygon points="22,19 22,29 30,24" fill="#fff"/>
  </svg>
)
export const IconFacebook: React.FC<{size?:number}> = ({size=22}) => (
  <svg width={size} height={size} viewBox="0 0 48 48" aria-label="Facebook" role="img">
    <circle cx="24" cy="24" r="22" fill="#1877F2"/>
    <path d="M26 16h4v-4h-4c-3.3 0-6 2.7-6 6v4h-4v4h4v10h4V26h4l1-4h-5v-3c0-1.1.9-2 2-2z" fill="#fff"/>
  </svg>
)
export const IconInstagram: React.FC<{size?:number}> = ({size=22}) => (
  <svg width={size} height={size} viewBox="0 0 48 48" aria-label="Instagram" role="img">
    <defs>
      <linearGradient id="ig" x1="0" x2="1" y1="0" y2="1">
        <stop offset="0%" stopColor="#f58529"/>
        <stop offset="50%" stopColor="#dd2a7b"/>
        <stop offset="100%" stopColor="#8134af"/>
      </linearGradient>
    </defs>
    <rect x="8" y="8" width="32" height="32" rx="8" fill="url(#ig)"/>
    <circle cx="32" cy="16" r="2.5" fill="#fff"/>
    <circle cx="24" cy="24" r="8" fill="none" stroke="#fff" strokeWidth="3"/>
  </svg>
)
export const IconLinkedIn: React.FC<{size?:number}> = ({size=22}) => (
  <svg width={size} height={size} viewBox="0 0 48 48" aria-label="LinkedIn" role="img">
    <rect x="6" y="6" width="36" height="36" rx="6" fill="#0A66C2"/>
    <rect x="12" y="20" width="6" height="16" fill="#fff"/>
    <rect x="12" y="12" width="6" height="6" fill="#fff"/>
    <path d="M22 20h6v3c1.2-2 3.4-3.5 6-3.5 4 0 6 2.3 6 6.8V36h-6v-8.3c0-2.2-.9-3.2-2.6-3.2-2 0-3.4 1.4-3.4 3.9V36h-6V20z" fill="#fff"/>
  </svg>
)

export const IconTikTok: React.FC<{size?:number}> = ({size=22}) => (
  <svg width={size} height={size} viewBox="0 0 48 48" aria-label="TikTok" role="img">
    <rect width="48" height="48" rx="10" fill="#000"/>
    <path d="M29 12c1.6 2.5 3.7 4 6.5 4.2V21c-2.5-.1-4.6-1-6.5-2.6v7.8c0 5-3.4 8-8 8-4.2 0-7.5-3-7.5-7s3.3-7 7.5-7c.6 0 1.3.1 1.9.2v4.5c-.6-.2-1.2-.3-1.9-.3-2 0-3.5 1.4-3.5 3.3 0 2 1.5 3.3 3.5 3.3 2.2 0 3.9-1.5 4-3.8V12h3.5z" fill="#fff"/>
    <path d="M29 12v3.2c1.7 1.2 3.7 2 6.5 2.1v3.1c-2.9-.1-5.3-1.1-7.3-2.6v8.4c0 5-3.4 8-8 8-4.2 0-7.5-3-7.5-7 0-3.6 2.6-6.2 6.3-6.8v3.2c-1.6.5-2.8 1.8-2.8 3.6 0 2 1.5 3.3 3.5 3.3 2.2 0 3.9-1.5 4-3.8V12h5.3z" fill="#25F4EE" opacity=".8"/>
    <path d="M29 12v2.4c1.8 1.4 4 2.3 6.5 2.4v2.5c-2.7-.1-5-1-6.9-2.3v8.9c0 5-3.4 8-8 8-4.2 0-7.5-3-7.5-7 0-2.7 1.4-4.9 3.7-6v2.3c-.7.8-1.1 1.8-1.1 3 0 2 1.5 3.3 3.5 3.3 2.2 0 3.9-1.5 4-3.8V12h5.8z" fill="#FE2C55" opacity=".6"/>
  </svg>
)

const Footer: React.FC = () => (
  <footer className="footer">
    <div className="container">
      <div className="footer-content">
        <p className="footer-text">© 2025 EntrePalabrasUrgentes - Ernesto Mendoza Maldonado.</p>
        <div className="social-links">
          <a href="https://www.youtube.com/channel/UCGsyq1loldlo3KSDvsni5cA" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="YouTube">
            <IconYouTube /> <span style={{ marginLeft: 6 }}>YouTube</span>
          </a>
          <a href="https://www.facebook.com/share/1AC2guzVom/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Facebook">
            <IconFacebook /> <span style={{ marginLeft: 6 }}>Facebook</span>
          </a>
          <a href="https://www.instagram.com/entr3palabrasurgentes?igsh=bmp3aG12MTRqbWt1&utm_source=qr" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Instagram">
            <IconInstagram /> <span style={{ marginLeft: 6 }}>Instagram</span>
          </a>
          <a href="https://www.tiktok.com/@entrepalabrasurge?_t=ZN-8zsZRrC2fCw&_r=1" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="TikTok">
            <IconTikTok /> <span style={{ marginLeft: 6 }}>TikTok</span>
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="LinkedIn">
            <IconLinkedIn /> <span style={{ marginLeft: 6 }}>LinkedIn</span>
          </a>
        </div>
        <a href="mailto:info@entrepalabrasurgentes.com" className="contact-link">Contáctanos</a>
        <div className="logo-container">
          {(() => { const base = import.meta.env.BASE_URL || '/'; return (
            <>
              <div className="logo-box"><img className="logo-img" src={`${base}images/logopie1.png`} alt="Logo 1" loading="lazy" /></div>
              <div className="logo-box"><img className="logo-img" src={`${base}images/logopie2.png`} alt="Logo 2" loading="lazy" /></div>
              <div className="logo-box"><img className="logo-img" src={`${base}images/logopie3.png`} alt="Logo 3" loading="lazy" /></div>
              <div className="logo-box"><img className="logo-img" src={`${base}images/logopie4.png`} alt="Logo 4" loading="lazy" /></div>
            </>
          )})()}
        </div>
      </div>
    </div>
  </footer>
);
export default Footer;
