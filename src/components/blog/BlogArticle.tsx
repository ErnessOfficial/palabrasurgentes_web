import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '../../hooks/useLanguage';
import MindfulnessExercise from './MindfulnessExercise';
import './Blog.css';

const BlogArticle: React.FC = () => {
  const location = useLocation();
  const { language } = useLanguage();
  const navigate = useNavigate();
  const articlePath = useMemo(() => {
    const base = '/blog/article/'
    const idx = location.pathname.indexOf(base)
    return idx >= 0 ? location.pathname.slice(idx + base.length) : ''
  }, [location.pathname])
  const [loading, setLoading] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const [iframeSrcDoc, setIframeSrcDoc] = useState<string | null>(null);

  // Caso especial: ejercicio de mindfulness
  if (articlePath?.includes('Ejercicio-mindfulness')) {
    const decoded = decodeURIComponent(articlePath);
    const assetBase = `${import.meta.env.BASE_URL || '/'}Articulos/${decoded}`;
    return <MindfulnessExercise assetBase={assetBase} />;
  }

  const decodedPath = useMemo(() => decodeURIComponent(articlePath || ''), [articlePath]);
  const category = decodedPath.split('/')[0] || '';
  const subcategory = decodedPath.split('/')[1] || '';
  const spanishSrc = useMemo(() => encodeURI(`${import.meta.env.BASE_URL || '/'}Articulos/${decodedPath}/index.html`), [decodedPath]);
  const englishSrc = useMemo(() => encodeURI(`${import.meta.env.BASE_URL || '/'}Articulos_en/${decodedPath}/index.html`), [decodedPath]);
  const [iframeSrc, setIframeSrc] = useState<string>(spanishSrc);

  const injectBase = (html: string, baseHref: string) => {
    // Ensure relative URLs inside srcDoc resolve against the article directory
    if (!html) return html;
    const hasHead = /<head[^>]*>/i.test(html);
    const baseTag = `<base href="${baseHref.endsWith('/') ? baseHref : baseHref + '/'}">`;
    if (hasHead) {
      return html.replace(/<head[^>]*>/i, (m) => `${m}\n${baseTag}`);
    }
    // If no head, create one
    return html.replace(/<html[^>]*>/i, (m) => `${m}\n<head>${baseTag}</head>`);
  };

  const adjustIframeHeight = () => {
    const iframe = iframeRef.current;
    if (!iframe) return;
    try {
      const doc = iframe.contentDocument || iframe.contentWindow?.document;
      if (!doc) return;
      const height = Math.max(
        doc.documentElement.scrollHeight,
        doc.body.scrollHeight,
        doc.documentElement.offsetHeight,
        doc.body.offsetHeight
      );
      iframe.style.height = `${height + 20}px`;
    } catch {
      iframe.style.height = '100vh';
    }
  };

  useEffect(() => {
    const onResize = () => adjustIframeHeight();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Decide fuente según idioma: EN -> Articulos_en si existe; si no, traducir dinámicamente
  useEffect(() => {
    let cancelled = false
    setLoading(true)

    async function run() {
      try {
        if (language === 'en') {
          // Try pre-translated file first
          try {
            const res = await fetch(englishSrc, { cache: 'no-cache' })
            if (res.ok) {
              if (!cancelled) {
                setIframeSrcDoc(null)
                setIframeSrc(englishSrc)
                setLoading(false)
                return
              }
            }
          } catch {}
          // If EN not available, translate Spanish content on-demand
          try {
            const cacheKey = `blog-translation:${articlePath}:en-GB:v1`;
            const cached = typeof window !== 'undefined' ? window.localStorage.getItem(cacheKey) : null;
            if (cached && !cancelled) {
              setIframeSrc('about:blank');
              setIframeSrcDoc(injectBase(cached, `${import.meta.env.BASE_URL || '/'}Articulos/${decodedPath}/`));
              setLoading(false);
              return;
            }
            const esRes = await fetch(spanishSrc, { cache: 'no-cache' });
            if (esRes.ok) {
              const esHtml = await esRes.text();
              // Call server-side translator to British English
              const trRes = await fetch('/api/translate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ html: esHtml, targetLang: 'en-GB' })
              });
              if (trRes.ok) {
                const data = await trRes.json();
                const translated: string = data?.html || '';
                if (!cancelled && translated) {
                  try { window.localStorage.setItem(cacheKey, translated); } catch {}
                  setIframeSrc('about:blank');
                  setIframeSrcDoc(injectBase(translated, `${import.meta.env.BASE_URL || '/'}Articulos/${decodedPath}/`));
                  setLoading(false);
                  return;
                }
              }
            }
          } catch {
            // ignore and fallback
          }
          // Fallback to Spanish content if translation fails
          if (!cancelled) {
            setIframeSrcDoc(null)
            setIframeSrc(spanishSrc)
            setLoading(false)
          }
        } else {
          // Spanish
          if (!cancelled) {
            setIframeSrcDoc(null)
            setIframeSrc(spanishSrc)
            setLoading(false)
          }
        }
      } catch {
        if (!cancelled) setLoading(false)
      }
    }
    run()
    return () => { cancelled = true }
  }, [language, spanishSrc, englishSrc, articlePath, decodedPath])

  const handleLoad = () => {
    setLoading(false);
    // Make embedded article responsive and avoid horizontal scroll
    try {
      const iframe = iframeRef.current;
      const doc = iframe?.contentDocument || iframe?.contentWindow?.document;
      if (doc) {
        const style = doc.createElement('style');
        style.setAttribute('data-epu-injected', 'true');
        style.textContent = `
          html, body { max-width: 100% !important; overflow-x: hidden !important; }
          img, table, pre, code, video, iframe { max-width: 100% !important; height: auto; }
          .WordSection1 { width: auto !important; }
          [style*="width:"] { max-width: 100% !important; }
        `;
        doc.head?.appendChild(style);
        // Also ensure a viewport meta exists for proper scaling
        if (!doc.querySelector('meta[name="viewport"]')) {
          const meta = doc.createElement('meta');
          meta.name = 'viewport';
          meta.content = 'width=device-width, initial-scale=1';
          doc.head?.appendChild(meta);
        }
      }
    } catch {}
    adjustIframeHeight();
    setTimeout(adjustIframeHeight, 200);
    setTimeout(adjustIframeHeight, 600);
    setTimeout(adjustIframeHeight, 1200);
  };

  const handleBack = (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      const hasHistory = typeof window !== 'undefined' && window.history && window.history.length > 1;
      if (hasHistory) {
        navigate(-1);
        return;
      }
    } catch {}
    navigate('/blog');
  };

  return (
    <div className="article-page-container" style={{ paddingTop: 20, paddingBottom: 20 }}>
      <div className="article-actions">
        <a href={`${import.meta.env.BASE_URL || '/' }blog`} onClick={handleBack} className="back-btn">
          {language === 'es' ? 'Volver al listado' : 'Back to list'}
        </a>
      </div>
      <div className="article-breadcrumb">
        <span>{category}</span> &gt; <span>{subcategory}</span>
      </div>
      <div className="article-content" style={{ padding: 0, boxShadow: 'none' }}>
        {loading && <div className="loading">Loading...</div>}
        <iframe
          ref={iframeRef}
          src={iframeSrc}
          // When we have translated content, use srcDoc
          {...(iframeSrcDoc ? { srcDoc: iframeSrcDoc } : {})}
          onLoad={handleLoad}
          style={{ width: '100%', border: 'none', display: 'block' }}
          title="Article"
        />
      </div>
      <div className="article-actions article-actions--bottom">
        <a href={`${import.meta.env.BASE_URL || '/' }blog`} onClick={handleBack} className="back-btn">
          {language === 'es' ? 'Volver al listado' : 'Back to list'}
        </a>
      </div>
    </div>
  );
};

export default BlogArticle;
