# EntrePalabrasUrgentes (Vite + React)

Proyecto web con Vite + React para entrepalabrasurgentes.com. Incluye:
- Sitio principal (secciones Explora, Conecta, Transforma)
- Listado y visor de artículos HTML bajo `Articulos/`
- Generación de índices (`blog-index.json`, `blog-index-en.json`)
- Compatibilidad con GitHub Pages y rutas con `BASE_URL`

## Requisitos
- Node.js 18+ (ver `.nvmrc`)
- npm 9+

## Instalación y desarrollo
```
nvm use
npm ci
npm run dev
```
Dev corre en `http://localhost:5173/`. El plugin Vite genera `public/blog-index.json` y sirve `Articulos/`.

## Build y deploy
```
npm run build
```
- Output en `dist/`.
- GitHub Pages: workflow en `.github/workflows/pages.yml` ya configura build y deploy.
- Base de rutas: `vite.config.ts` establece `base` dinámico.
  - En build: `VITE_BASE` (opcional). Por defecto `/palabrasurgentes_web/` (project page).
  - En dev: base `/`.

## Variables de entorno
- `OPENAI_API_KEY` (opcional):
  - Usada por: `api/translate.js`, `api/chat.js`, `scripts/gen-public-en.js` y tareas del plugin de Vite.
  - Si no está definida: el sitio funciona; se omiten traducciones automáticas.
- `DEV_API_PROXY` (opcional dev): URL a backend real para `/api/*` en desarrollo.
- `VITE_BASE` (opcional build): Forzar base distinta para despliegue (ej. dominio propio).

## Endpoints / API
- En desarrollo, `vite.config.ts` monta middlewares para `/api/translate` y `/api/chat` si NO hay `DEV_API_PROXY`.
- Producción en GitHub Pages es estático: `/api/*` no existe. Si necesitas API, despliega `api/` en Vercel/Netlify y configura el frontend para usar esa URL.

## Generación de contenido en inglés (opcional)
- Script manual:
```
OPENAI_API_KEY="sk-..." npm run gen:public-en
```
- Build: si `OPENAI_API_KEY` está presente, el plugin copiará `Articulos/` a `dist/Articulos_en` y traducirá `index.html` (+ generará `blog-index-en.json`).

## Notas
- Archivos generados (`public/blog-index*.json`) e `~$*` (temporales de Office) están ignorados en git.
- Las imágenes se sirven desde `public/images` y se referencian con `import.meta.env.BASE_URL` para evitar 404 en Pages.
