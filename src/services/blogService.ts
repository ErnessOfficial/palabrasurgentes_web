import { useState, useEffect } from 'react';

export interface ArticleEntry {
  title: string;
  path: string; // raw, unencoded
  encodedPath: string; // encoded for routing
  category: string;
  subcategory: string;
}

export interface CategoryStructure {
  [category: string]: {
    [subcategory: string]: ArticleEntry[];
  };
}

function toStructure(entries: ArticleEntry[]): CategoryStructure {
  const map: CategoryStructure = {}
  for (const e of entries) {
    if (!map[e.category]) map[e.category] = {}
    if (!map[e.category][e.subcategory || '']) map[e.category][e.subcategory || ''] = []
    map[e.category][e.subcategory || ''].push(e)
  }
  // sort by title within each subcategory
  for (const cat of Object.keys(map)) {
    for (const sub of Object.keys(map[cat])) {
      map[cat][sub].sort((a, b) => a.title.localeCompare(b.title))
    }
  }
  return map
}

async function fetchJsonSafe(url: string) {
  const res = await fetch(url, { cache: 'no-cache' })
  if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`)
  const text = await res.text()
  if (!text || !text.trim()) throw new Error(`Empty JSON from ${url}`)
  try { return JSON.parse(text) } catch (e) { throw new Error(`Invalid JSON from ${url}`) }
}

export const useArticles = () => {
  const [articles, setArticles] = useState<CategoryStructure>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const base = import.meta.env.BASE_URL || '/'
        const data = await fetchJsonSafe(`${base}blog-index.json`) as { entries: ArticleEntry[] }
        if (!cancelled) {
          setArticles(toStructure(data.entries || []))
          setLoading(false)
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Error al cargar el índice')
          setLoading(false)
        }
      }
    })()
    return () => { cancelled = true }
  }, [])

  return { articles, loading, error };
};

export const loadArticleContent = async (p: string): Promise<string> => {
  const base = import.meta.env.BASE_URL || '/'
  const response = await fetch(`${base}Articulos/${p}/index.html`);
  if (!response.ok) throw new Error('Article not found');
  return await response.text();
};
