"""DesignToken101 — tabla semántica (A6) y comprobación de contraste WCAG 2.2.
Lee los primitivos generados por scales.py y calcula el contraste de cada par en claro y oscuro.
Los pares con cifra de referencia (componentes-v1.md) se comparan con ella. Termina con código 1
si un par no llega a su umbral o si una cifra no coincide con su referencia."""
import sys
import scales as s

prim={'white':'#FFFFFF','black':'#000000'}
b=s.build((160,60,50))
for r in b['accent']: prim[f"emerald/{r['step']}"]=r['hex']
for r in b['neutral']: prim[f"neutral/{r['step']}"]=r['hex']
for hue,rows in s.status_scales(0.66).items():
    for r in rows: prim[f"{hue}/{r['step']}"]=r['hex']

# token: (light, dark)
T={
 'color/background/neutral/default':('white','neutral/950'),
 'color/background/neutral/subtle':('neutral/50','neutral/900'),
 'color/background/neutral/strong':('neutral/100','neutral/800'),
 'color/background/neutral/hover':('neutral/100','neutral/800'),     # D12
 'color/background/neutral/active':('neutral/200','neutral/700'),    # D12
 'color/text/neutral/default':('neutral/900','neutral/50'),
 'color/text/neutral/subtle':('neutral/600','neutral/400'),
 'color/border/neutral/default':('neutral/200','neutral/800'),
 'color/border/neutral/strong':('neutral/500','neutral/500'),
 'color/text/accent/default':('emerald/700','emerald/400'),
 'color/text/accent/hover':('emerald/800','emerald/300'),            # D12
 'color/border/accent/default':('emerald/300','emerald/700'),        # D06
 'color/border/accent/strong':('emerald/600','emerald/400'),         # D12
 'color/background/accent/subtle':('emerald/50','emerald/950'),
 'color/background/accent/strong/default':('emerald/500','emerald/500'),
 'color/background/accent/strong/hover':('emerald/400','emerald/400'),
 'color/background/accent/strong/active':('emerald/600','emerald/600'),
 'color/text/on-accent':('neutral/950','neutral/950'),
 'color/border/focus':('emerald/600','emerald/400'),
}
for role,hue in (('info','blue'),('success','emerald'),('warning','amber'),('danger','red')):
    T[f'color/background/{role}/subtle']=(f'{hue}/50',f'{hue}/950')
    T[f'color/border/{role}/default']=(f'{hue}/300',f'{hue}/700')
    T[f'color/text/{role}/default']=(f'{hue}/700',f'{hue}/300')

# Valores directos con opacidad (§6.1): token: ((primitivo, alpha) light, (primitivo, alpha) dark)
A={
 'color/background/neutral/translucent':(('white',0.96),('neutral/950',0.9)),  # V28; S35: 96 % en Light
}

# pares a comprobar: (primer plano, fondo, umbral, criterio, uso, referencia light/dark)
# umbral None = decorativo o exento: se calcula, pero no se exige.
P=[
 ('color/text/neutral/default','color/background/neutral/default',4.5,'1.4.3','',None),
 ('color/text/neutral/default','color/background/neutral/subtle',4.5,'1.4.3','',None),
 ('color/text/neutral/subtle','color/background/neutral/default',4.5,'1.4.3','',None),
 ('color/text/neutral/subtle','color/background/neutral/subtle',4.5,'1.4.3','',None),
 ('color/text/accent/default','color/background/neutral/default',4.5,'1.4.3','',None),
 ('color/text/accent/default','color/background/neutral/subtle',4.5,'1.4.3','',None),
 ('color/border/neutral/strong','color/background/neutral/default',3,'1.4.11','',None),
 ('color/text/on-accent','color/background/accent/strong/default',4.5,'1.4.3','',None),
 ('color/text/on-accent','color/background/accent/strong/hover',4.5,'1.4.3','',None),
 ('color/text/on-accent','color/background/accent/strong/active',4.5,'1.4.3','',None),
 # Exento: la etiqueta identifica el control (Understanding 1.4.11; componentes-v1.md §2.2)
 ('color/background/accent/strong/default','color/background/neutral/default',None,'exento','Button primary frente a la página (§2.2)',None),
 ('color/border/focus','color/background/neutral/default',3,'1.4.11','',None),
 ('color/border/focus','color/background/neutral/subtle',3,'1.4.11','',None),
 # Anillo de foco frente a los demás fondos donde hay controles (investigacion-modulo-7.md §5)
 ('color/border/focus','color/background/neutral/strong',3,'1.4.11','selectores de idioma y tema (§4.4, §4.5)',(3.05,8.28)),
 ('color/border/focus','color/background/info/subtle',3,'1.4.11','enlace dentro de un Callout note',(3.06,8.09)),
 ('color/border/focus','color/background/warning/subtle',3,'1.4.11','enlace dentro de un Callout warning',(3.22,8.21)),
 ('color/border/focus','color/background/accent/subtle',3,'1.4.11','enlace dentro de un Callout recommendation',(3.18,8.30)),
 # S35: anillo del logotipo y del botón de menú sobre la cabecera translúcida, en el peor caso
 ('color/border/focus','color/background/neutral/translucent',3,'1.4.11','foco en SiteHeader (peor fondo)',(3.06,8.72)),
]
for role in ('info','success','warning','danger'):
    P.append((f'color/text/{role}/default',f'color/background/{role}/subtle',4.5,'1.4.3','',None))
P+=[
 # D06: borde del Callout recommendation, decorativo (§3.2)
 ('color/border/accent/default','color/background/accent/subtle',None,'decor.','Callout recommendation, borde',None),
 # D12: estados de los controles
 ('color/text/accent/hover','color/background/neutral/hover',4.5,'1.4.3','SidebarSection current, hover (§4.2)',(6.62,10.58)),
 ('color/text/accent/hover','color/background/accent/subtle',4.5,'1.4.3','FlowStep, título en hover (§3.7)',(6.90,10.60)),
 ('color/text/neutral/default','color/background/neutral/hover',4.5,'1.4.3','controles neutros, hover (§2.1, §2.2)',(16.28,14.34)),
 ('color/text/neutral/default','color/background/neutral/active',4.5,'1.4.3','controles neutros, active (§2.1, §2.2)',(14.16,9.84)),
 ('color/border/accent/strong','color/background/accent/subtle',3,'1.4.11','marca de SidebarItem current, borde de FlowStep en hover',(3.18,8.30)),
 # Etiquetas del Callout (§3.2)
 ('color/text/info/default','color/background/info/subtle',4.5,'1.4.3','Callout note, etiqueta',(5.99,8.10)),
 ('color/text/warning/default','color/background/warning/subtle',4.5,'1.4.3','Callout warning, etiqueta',(4.77,10.32)),
 ('color/text/accent/default','color/background/accent/subtle',4.5,'1.4.3','Callout recommendation, etiqueta',(4.85,8.30)),
 ('color/text/neutral/subtle','color/background/neutral/subtle',4.5,'1.4.3','Callout pending, etiqueta',(7.40,6.89)),
 # C18 + V35: Takeaways (§3.9)
 ('color/text/neutral/default','color/background/accent/subtle',4.5,'1.4.3','Takeaways, texto y título',(16.98,14.36)),
 ('color/text/accent/default','color/background/accent/subtle',3,'1.4.11','Takeaways, icono y marcas',(4.85,8.30)),
 # C17: etiqueta de grupo del sidebar (§4.2)
 ('color/text/neutral/subtle','color/background/neutral/default',4.5,'1.4.3','SidebarGroup, etiqueta',(7.74,7.65)),
 # V28: icono del botón de menú sobre la cabecera translúcida. El fondo deja ver el contenido
 # (al 10 %, con desenfoque): se calcula sobre negro y sobre blanco y se toma el peor caso.
 ('color/text/neutral/subtle','color/background/neutral/translucent',3,'1.4.11','IconButton de menú sobre SiteHeader (peor fondo)',None),
]

def rgb(h): return [int(h[i:i+2],16)/255 for i in (1,3,5)]

def colors(tok,mode):
    """Colores posibles de un token: uno si es opaco; si tiene opacidad, mezclado sobre negro y sobre blanco."""
    if tok in A:
        # La mezcla se redondea a 8 bits por canal, como la pinta el navegador.
        p,a=A[tok][mode]; c=rgb(prim[p])
        return [[round((a*x+(1-a)*bk)*255)/255 for x in c] for bk in (0,1)]
    return [rgb(prim[T[tok][mode]])]

def ratio(fg,bg,mode):
    return min(s.contrast(f,g) for f in colors(fg,mode) for g in colors(bg,mode))

if __name__=='__main__':
    print('TOKENS')
    for k,(l,d) in T.items(): print(f'{k:42} {l:13} {prim[l]}   {d:13} {prim[d]}')
    for k,((l,la),(d,da)) in A.items(): print(f'{k:42} {l:13} {prim[l]} {la:.0%} {d:13} {prim[d]} {da:.0%}')
    print('\nPARES')
    errors=[]
    for fg,bg,th,sc,use,ref in P:
        c=[ratio(fg,bg,m) for m in (0,1)]
        if th is None: ok=['—','—']
        else: ok=['OK' if x>=th else 'FALLA' for x in c]
        line=f'{fg.replace("color/",""):30} sobre {bg.replace("color/",""):34} {sc:6} {"≥"+str(th) if th else "—":5} claro {c[0]:5.2f} {ok[0]:5}  oscuro {c[1]:5.2f} {ok[1]:5}'
        if ref:
            same=all(f'{x:.2f}'==f'{r:.2f}' for x,r in zip(c,ref))
            line+=f'  ref {ref[0]:.2f} / {ref[1]:.2f} {"=" if same else "≠"}'
            if not same: errors.append(f'{use}: {c[0]:.2f} / {c[1]:.2f}, referencia {ref[0]:.2f} / {ref[1]:.2f}')
        if use: line+=f'  ({use})'
        print(line)
        if 'FALLA' in ok: errors.append(f'{fg} sobre {bg}: no llega a {th}')
    if errors:
        print('\nERRORES'); print('\n'.join(errors)); sys.exit(1)
    print('\nSin errores.')
