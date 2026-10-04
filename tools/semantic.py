"""Tokens101 — tabla semántica v0 (A6) y comprobación de contraste WCAG 2.2.
Lee los primitivos generados por scales.py y calcula el contraste de cada par en claro y oscuro."""
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
 'color/text/neutral/default':('neutral/900','neutral/50'),
 'color/text/neutral/subtle':('neutral/600','neutral/400'),
 'color/border/neutral/default':('neutral/200','neutral/800'),
 'color/border/neutral/strong':('neutral/500','neutral/500'),
 'color/text/accent/default':('emerald/700','emerald/400'),
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

# pares a comprobar: (primer plano, fondo, umbral, criterio)
P=[
 ('color/text/neutral/default','color/background/neutral/default',4.5,'1.4.3'),
 ('color/text/neutral/default','color/background/neutral/subtle',4.5,'1.4.3'),
 ('color/text/neutral/subtle','color/background/neutral/default',4.5,'1.4.3'),
 ('color/text/neutral/subtle','color/background/neutral/subtle',4.5,'1.4.3'),
 ('color/text/accent/default','color/background/neutral/default',4.5,'1.4.3'),
 ('color/text/accent/default','color/background/neutral/subtle',4.5,'1.4.3'),
 ('color/border/neutral/strong','color/background/neutral/default',3,'1.4.11'),
 ('color/text/on-accent','color/background/accent/strong/default',4.5,'1.4.3'),
 ('color/text/on-accent','color/background/accent/strong/hover',4.5,'1.4.3'),
 ('color/text/on-accent','color/background/accent/strong/active',4.5,'1.4.3'),
 ('color/background/accent/strong/default','color/background/neutral/default',3,'1.4.11'),
 ('color/border/focus','color/background/neutral/default',3,'1.4.11'),
 ('color/border/focus','color/background/neutral/subtle',3,'1.4.11'),
]
for role in ('info','success','warning','danger'):
    P.append((f'color/text/{role}/default',f'color/background/{role}/subtle',4.5,'1.4.3'))

def rgb(h): return [int(h[i:i+2],16)/255 for i in (1,3,5)]
def val(tok,mode): return prim[T[tok][mode]]

if __name__=='__main__':
    print('TOKENS')
    for k,(l,d) in T.items(): print(f'{k:42} {l:13} {prim[l]}   {d:13} {prim[d]}')
    print('\nPARES')
    for fg,bg,th,sc in P:
        c=[s.contrast(rgb(val(fg,m)),rgb(val(bg,m))) for m in (0,1)]
        ok=['OK' if x>=th else 'FALLA' for x in c]
        print(f'{fg.replace("color/",""):32} sobre {bg.replace("color/",""):34} {sc:6} ≥{th}  claro {c[0]:5.2f} {ok[0]:5}  oscuro {c[1]:5.2f} {ok[1]}')
