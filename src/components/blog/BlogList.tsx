import React, { useEffect, useState } from 'react';
import { useLanguage } from '../../hooks/useLanguage';
import { Link } from 'react-router-dom';
import { useArticles } from '../../services/blogService';
import './Blog.css';

// Types pulled from service
// interface ArticleEntry { title: string; path: string; encodedPath: string; category: string; subcategory: string }
// interface CategoryStructure { [cat: string]: { [sub: string]: ArticleEntry[] } }

const BlogList: React.FC = () => {
  const { language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const { articles: articleStructure, loading, error } = useArticles();
  const [translatedIndex, setTranslatedIndex] = useState<any | null>(null);

  useEffect(() => {
    let cancelled = false;
    if (language !== 'en') { setTranslatedIndex(null); return; }
    (async () => {
      try {
        const base = import.meta.env.BASE_URL || '/';
        const res = await fetch(`${base}blog-index-en.json`, { cache: 'no-cache' });
        if (!res.ok) return;
        const text = await res.text();
        if (!text || !text.trim()) return;
        const json = JSON.parse(text);
        if (!cancelled) setTranslatedIndex(json);
      } catch {/* ignore */}
    })();
    return () => { cancelled = true };
  }, [language]);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  // Filter articles based on search term
  const filterArticles = (term: string) => {
    setSearchTerm(term.toLowerCase());
  };

  return (
    <div className="blog-container">
      <h1>{language === 'es' ? 'Artículos del Blog' : 'Blog Articles'}</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder={language === 'es' ? "Buscar artículos..." : "Search articles..."}
          onChange={(e) => filterArticles(e.target.value)}
          className="search-input"
        />
      </div>
      
      <div className="categories-container">
        {Object.entries(articleStructure).map(([category, subcategories]) => {
          const firstSubArray = Object.values(subcategories)[0] as any[] | undefined;
          const firstArticle = firstSubArray && firstSubArray[0];
          const translatedCat = (language === 'en' && translatedIndex?.entries && firstArticle)
            ? (translatedIndex.entries.find((e:any)=>e.encodedPath===firstArticle.encodedPath)?.category || category)
            : category;
          return (
          <div key={category} className="category-section">
            <h2 className="category-title">{translatedCat}</h2>
            {Object.entries(subcategories).map(([subcategory, articles]) => {
              const firstA = (articles as any[])[0];
              const translatedSub = (language === 'en' && translatedIndex?.entries && firstA)
                ? (translatedIndex.entries.find((e:any)=>e.encodedPath===firstA.encodedPath)?.subcategory || subcategory)
                : subcategory;
              return (
              <div key={subcategory} className="subcategory-section">
                <h3 className="subcategory-title">{translatedSub}</h3>
                <ul className="articles-list">
                  {articles
                    .filter(article => 
                      article.title.toLowerCase().includes(searchTerm) ||
                      category.toLowerCase().includes(searchTerm) ||
                      subcategory.toLowerCase().includes(searchTerm)
                    )
                    .map((article, index) => (
                      <li key={index} className="article-item">
                        <Link to={`/blog/article/${article.encodedPath || encodeURIComponent(article.path)}`}>
                          {language==='en' && translatedIndex?.entries ? (translatedIndex.entries.find((e:any)=>e.encodedPath===article.encodedPath)?.title || article.title) : article.title}
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>
            )})}
          </div>
        )})}
      </div>
    </div>
  );
};

export default BlogList;
