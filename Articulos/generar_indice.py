import os
import html
import json
from collections import defaultdict
import urllib.parse

def generar_indice_articulos():
    """
    Genera un archivo index.html con una lista jerárquica de artículos
    y una función de búsqueda.
    """
    directorio_actual = os.path.dirname(os.path.abspath(__file__))
    
    estructura_articulos = defaultdict(lambda: defaultdict(list))

    for raiz, dirs, _ in os.walk(directorio_actual):
        dirs[:] = [d for d in dirs if not d.startswith('.') and d != 'images']
        
        partes_ruta = os.path.relpath(raiz, directorio_actual).split(os.sep)
        
        if len(partes_ruta) == 3:
            categoria, subcategoria, nombre_articulo = partes_ruta
            
            link_articulo = os.path.join(categoria, subcategoria, nombre_articulo, 'index.html')
            
            articulo = {
                'nombre': nombre_articulo.replace('_', ' ').replace('-', ' '),
                'link': urllib.parse.quote(link_articulo)
            }
            estructura_articulos[categoria][subcategoria].append(articulo)

    items_html = ""
    if not estructura_articulos:
        items_html = "<p>No se encontraron artículos.</p>"
    else:
        for categoria, subcategorias in sorted(estructura_articulos.items()):
            # CORRECCIÓN: Añadido el > al final de la etiqueta div
            items_html += f'<div class="category-container" data-category-name="{html.escape(categoria.lower())}">'
            items_html += f'<h2>{html.escape(categoria)}</h2>\n'
            for subcategoria, articulos in sorted(subcategorias.items()):
                # CORRECCIÓN: Añadido el > al final de la etiqueta div
                items_html += f'<div class="subcategory-container" data-subcategory-name="{html.escape(subcategoria.lower())}">'
                items_html += f'<h3>{html.escape(subcategoria)}</h3>\n'
                items_html += '<ul>\n'
                for articulo in sorted(articulos, key=lambda x: x['nombre']):
                    items_html += f'<li data-article-title="{html.escape(articulo['nombre'].lower())}"><a href="{articulo['link']}">{html.escape(articulo['nombre'])}</a></li>\n'
                items_html += '</ul>\n'
                items_html += '</div>'
            items_html += '</div>'

    # ACTUALIZACIÓN: Usar banner.png como imagen principal
    banner_path = "banner.png"

    html_lines = [
        '<!DOCTYPE html>',
        '<html lang="es">',
        '<head>',
        '    <meta charset="UTF-8">',
        '    <meta name="viewport" content="width=device-width, initial-scale=1.0">',
        '    <title>Listado de Artículos</title>',
        '    <style>',
        '        body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; line-height: 1.6; margin: 0; padding: 0; background-color: #022650; color: #56066c; }',
        '        .container { max-width: 800px; margin: 20px auto; padding: 0 20px; }',
        '        header img { width: 100%; height: auto; border-radius: 8px; margin-bottom: 20px; }',
        '        #search-container { margin-bottom: 20px; }',
        '        #searchInput { width: 100%; padding: 12px; border: 1px solid #ced4da; border-radius: 8px; font-size: 1em; box-sizing: border-box; }',
        '        .article-index { background-color: #f4d6f1; padding: 20px 30px; border-radius: 8px; box-shadow: 0 4px 8px rgb(84, 69, 255); }',
        '        h1 { text-align: center; }',
        '        p {',
        '            font-size: 0.875em;',
        '            color: #00185a;',
        '            text-align: center;',
        '            margin-top: 20px;',
        '        }',
        '        .container h1 + p {',
        '            font-size: 0.85em;',
        '            text-align: justify;',
        '            margin-bottom: 25px;',
        '            margin-top: 10px;',
        '        }',
        '        h2 { font-size: 1.5em; color: #0a3563; border-bottom: 2px solid #a200bf; padding-bottom: 5px; margin-top: 30px; }',
        '        h3 { font-size: 1.2em; color: #2b0251; margin-top: 20px; }',
        '        ul { list-style-type: none; padding-left: 10px; }', 
        '        li { margin-bottom: 12px; font-size: 1.1em; }',
        '        a { text-decoration: none; color: #0c1116; transition: color 0.3s ease; }',
        '        a:hover { color: #136096; }',
        '    </style>',
        '</head>',
        '<body>',
        '    <div class="container">',
        f'       <header><img src="{banner_path}" alt="Banner Principal"></header>',
        '        <main class="article-index">',
        '            <h1>⨸ Palabras Urgentes 𝕓𝕝𝕠𝕘❤︎❤︎</h1>',
        '            <p><b>🧭Explora mis palabras urgentes🧭. Son artículos que surgen de reflexiones y cuestionamientos sobre diversos temas relacionados con experiencias y circunstancias que todos hemos vivido de alguna manera.'
        '               ✍︎Mi intención no es convencerte ni que pienses igual que yo sobre lo que escribo✍︎. ' 
        '               ☞Mi propósito es compartir mi punto de vista personal y profesional en algunos casos y despertar en cada lector la crítica reflexiva y la construcción de un criterio que te ayude a establecer una base en la gestión de tus emociones☜. '
        '               🫵🏼Recuerda que este es un espacio para reflexionar y desarrollar tu criterio emocional🫵🏼.</b></p>',
        '            <div id="search-container">',
        '                <input type="text" id="searchInput" onkeyup="searchFunction()" placeholder="Buscar por artículo, categoría o subcategoría...">',
        '            </div>',
        '            <div id="article-list-container">',
        '                __ITEMS_HTML__',
        '            </div>',
        '        </main>',
        '    </div>',
        '    <script>',
        '    function searchFunction() {', 
        '        let input, filter, i, li, categoryDiv, subCategoryDiv;', 
        '        input = document.getElementById("searchInput");', 
        '        filter = input.value.toLowerCase();', 
        '        let categories = document.getElementsByClassName("category-container");', 
        '        for (categoryDiv of categories) {', 
        '            let categoryVisible = false;', 
        '            let categoryName = categoryDiv.dataset.categoryName;', 
        '            let subCategories = categoryDiv.getElementsByClassName("subcategory-container");', 
        '            for (subCategoryDiv of subCategories) {', 
        '                let subCategoryVisible = false;', 
        '                let subCategoryName = subCategoryDiv.dataset.subcategoryName;', 
        '                li = subCategoryDiv.getElementsByTagName("li");', 
        '                for (let j = 0; j < li.length; j++) {', 
        '                    let articleTitle = li[j].dataset.articleTitle;', 
        '                    if (articleTitle.includes(filter)) {', 
        '                        li[j].style.display = "";', 
        '                        subCategoryVisible = true;', 
        '                    } else {', 
        '                        li[j].style.display = "none";', 
        '                    }', 
        '                }', 
        '                if (subCategoryVisible || subCategoryName.includes(filter)) {', 
        '                    subCategoryDiv.style.display = "";', 
        '                    categoryVisible = true;', 
        '                } else {', 
        '                    subCategoryDiv.style.display = "none";', 
        '                }', 
        '            }', 
        '            if (categoryVisible || categoryName.includes(filter)) {', 
        '                categoryDiv.style.display = "";', 
        '            } else {', 
        '                categoryDiv.style.display = "none";', 
        '            }', 
        '        }', 
        '    }', 
        '    </script>',
        '</body>',
        '</html>'
    ]

    plantilla_html = '\n'.join(html_lines)
    html_final = plantilla_html.replace("__ITEMS_HTML__", items_html)

    try:
        with open(os.path.join(directorio_actual, 'index.html'), 'w', encoding='utf-8') as f:
            f.write(html_final)
        print("El archivo 'index.html' se ha generado y actualizado correctamente.")
    except IOError as e:
        print(f"Error al escribir el archivo: {e}")

if __name__ == "__main__":
    generar_indice_articulos()