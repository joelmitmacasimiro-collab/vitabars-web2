"""Static resource and confirmed-content checks; standard Python 3 only."""
from pathlib import Path
import json,re,xml.etree.ElementTree as ET

root=Path(__file__).resolve().parent.parent
errors=[]
def check_path(ref,base):
    if ref.startswith(('data:','http:','https:','mailto:','tel:','#','%23')):return
    target=(base/ref.split('?')[0].split('#')[0]).resolve()
    if not target.is_relative_to(root):errors.append('Ruta fuera del proyecto: '+ref)
    elif not target.is_file():errors.append('Recurso ausente: '+ref)

html=(root/'index.html').read_text(encoding='utf-8')
for ref in re.findall(r'(?:src|href)="([^"#]+)"',html):check_path(ref,root)
for css in (root/'css').glob('*.css'):
    for ref in re.findall(r'url\([\'"]?([^\)\'"\s]+)',css.read_text(encoding='utf-8')):check_path(ref,css.parent)
data_text=(root/'js/products.js').read_text(encoding='utf-8')
records=json.loads(data_text.split('const CATALOG_DATA = ',1)[1].rstrip().removesuffix(';'))
ids=[p['id'] for p in records]
assert len(ids)==len(set(ids)), 'IDs duplicados'
confirmed=json.loads((root/'docs/datos-confirmados.json').read_text(encoding='utf-8'))
for p in records:
    assert isinstance(p['price'],(int,float)) and p['price']>=0, 'Precio inválido'
    for key in ['image','ingredientImage','originalImage']:
        if p.get(key):check_path(p[key],root)
    if p['id'] in confirmed:
        assert p['nutrition']==confirmed[p['id']]['nutrition'], 'Cambió nutrición: '+p['id']
        assert p['ingredients']==confirmed[p['id']]['ingredients'], 'Cambiaron ingredientes: '+p['id']
for svg in (root/'assets').rglob('*.svg'):
    ET.parse(svg)
    for ref in re.findall(r'href="([^"]+)"',svg.read_text(encoding='utf-8')):check_path(ref,svg.parent)
for file in [root/'index.html',*list((root/'css').glob('*.css')),*list((root/'js').glob('*.js'))]:
    content=file.read_text(encoding='utf-8-sig')
    assert not any(token in content for token in ['C:/Users/','AppData/Local/Temp','127.0.0.1:4186','LÃº','ManÃ']), 'Referencia temporal o error de codificación: '+file.name
if errors:raise SystemExit('\n'.join(errors))
print(f'Correcto: {len(records)} productos, {len(confirmed)} fichas confirmadas, rutas y SVG válidos.')
