"""Tokens101 — generación de escalas primitivas de color (método B).
Diseñar en OKLCH, guardar en sRGB. Sin dependencias externas.
Conversiones OKLab según Björn Ottosson (https://bottosson.github.io/posts/oklab/).
Contraste según WCAG 2.2 (definiciones 'relative luminance' y 'contrast ratio').
"""
import math, json, colorsys

def srgb_to_lin(c): return c/12.92 if c <= 0.04045 else ((c+0.055)/1.055)**2.4
def lin_to_srgb(c): return 12.92*c if c <= 0.0031308 else 1.055*c**(1/2.4)-0.055

def rgb_to_oklab(r,g,b):
    r,g,b = map(srgb_to_lin,(r,g,b))
    l=0.4122214708*r+0.5363325363*g+0.0514459929*b
    m=0.2119034982*r+0.6806995451*g+0.1073969566*b
    s=0.0883024619*r+0.2817188376*g+0.6299787005*b
    l,m,s=[x**(1/3) for x in (l,m,s)]
    return (0.2104542553*l+0.7936177850*m-0.0040720468*s,
            1.9779984951*l-2.4285922050*m+0.4505937099*s,
            0.0259040371*l+0.7827717662*m-0.8086757660*s)

def oklab_to_lin(L,a,b):
    l=(L+0.3963377774*a+0.2158037573*b)**3
    m=(L-0.1055613458*a-0.0638541728*b)**3
    s=(L-0.0894841775*a-1.2914855480*b)**3
    return (4.0767416621*l-3.3077115913*m+0.2309699292*s,
            -1.2684380046*l+2.6097574011*m-0.3413193965*s,
            -0.0041960863*l-0.7034186147*m+1.7076147010*s)

def rgb_to_oklch(r,g,b):
    L,a,bb=rgb_to_oklab(r,g,b)
    return L, math.hypot(a,bb), math.degrees(math.atan2(bb,a))%360

def oklch_to_rgb_gamut(L,C,H):
    """Ajuste a la gama sRGB reduciendo solo el croma (L y H se conservan)."""
    lo,hi=0.0,C
    def conv(c):
        a=c*math.cos(math.radians(H)); b=c*math.sin(math.radians(H))
        return oklab_to_lin(L,a,b)
    def ok(lin): return all(-1e-6<=x<=1+1e-6 for x in lin)
    if ok(conv(C)): lin=conv(C); used=C
    else:
        for _ in range(40):
            mid=(lo+hi)/2
            if ok(conv(mid)): lo=mid
            else: hi=mid
        lin=conv(lo); used=lo
    rgb=[min(1,max(0,lin_to_srgb(x))) for x in lin]
    return rgb, used

def hexs(rgb): return '#'+''.join(f'{round(x*255):02X}' for x in rgb)
def lum(rgb): r,g,b=map(srgb_to_lin,rgb); return 0.2126*r+0.7152*g+0.0722*b
def contrast(a,b):
    la,lb=sorted((lum(a),lum(b)),reverse=True); return (la+0.05)/(lb+0.05)

STEPS=[50,100,200,300,400,500,600,700,800,900,950]
# Referencia verificada: paleta por defecto de Tailwind CSS v4 (tailwindcss.com/docs/colors)
TW_NEUTRAL_L=[.985,.97,.922,.87,.708,.556,.439,.371,.269,.205,.145]
TW_GRAY_C=[.002,.003,.006,.01,.022,.027,.03,.034,.033,.034,.028]
TW_GREEN=[(.982,.018),(.962,.044),(.925,.084),(.871,.15),(.792,.209),(.723,.219),
          (.627,.194),(.527,.154),(.448,.119),(.393,.095),(.266,.065)]

def build(accent_hsl, tint=0.5):
    h,s,l=accent_hsl
    arg=colorsys.hls_to_rgb(h/360,l/100,s/100)
    aL,aC,aH=rgb_to_oklch(*arg)
    # paso ancla: el de luminosidad más cercana en la escala de referencia
    anchor=min(range(11),key=lambda i:abs(TW_GREEN[i][0]-aL))
    ratio=aC/TW_GREEN[anchor][1]
    accent=[]
    for i,(L,C) in enumerate(TW_GREEN):
        if i==anchor: rgb=list(arg); used=aC; L=aL
        else: rgb,used=oklch_to_rgb_gamut(L,C*ratio,aH)
        accent.append(dict(step=STEPS[i],oklch=[round(L,3),round(used,3),round(aH,1)],hex=hexs(rgb),rgb=rgb,anchor=i==anchor))
    neutral=[]
    for i,L in enumerate(TW_NEUTRAL_L):
        rgb,used=oklch_to_rgb_gamut(L,TW_GRAY_C[i]*tint,aH)
        neutral.append(dict(step=STEPS[i],oklch=[round(L,3),round(used,3),round(aH,1)],hex=hexs(rgb),rgb=rgb))
    return dict(accent_input=dict(hsl=accent_hsl,hex=hexs(arg),oklch=[round(aL,3),round(aC,3),round(aH,1)],anchor_step=STEPS[anchor]),accent=accent,neutral=neutral)

if __name__=='__main__':
    out=build((160,60,50))  # acento de marca en HSL (Oscar, 2026-09-30); neutros con tinte suave (0,5)
    white=[1,1,1]; n950=out['neutral'][-1]['rgb']; n50=out['neutral'][0]['rgb']
    print('Acento de entrada:',out['accent_input'])
    for name in ('accent','neutral'):
        print(f'\n{name}: paso | oklch | hex | contraste vs blanco | vs neutral-950')
        for r in out[name]:
            print(f"{r['step']:>4} | {r['oklch']} | {r['hex']} | {contrast(r['rgb'],white):5.2f} | {contrast(r['rgb'],n950):5.2f}{'  ← tu color' if r.get('anchor') else ''}")
    for k in ('accent','neutral'):
        for r in out[k]: r.pop('rgb')
    json.dump(out,open(__import__('os').path.join(__import__('os').path.dirname(__file__),'scales.json'),'w'),indent=2)

# --- Escalas de estado (S16) -------------------------------------------------
# Referencia: paleta por defecto de Tailwind CSS v4 (tailwindcss.com/docs/colors), L, C y H por paso.
TW_STATUS={
 'red':[(.971,.013,17.38),(.936,.032,17.717),(.885,.062,18.334),(.808,.114,19.571),(.704,.191,22.216),(.637,.237,25.331),(.577,.245,27.325),(.505,.213,27.518),(.444,.177,26.899),(.396,.141,25.723),(.258,.092,26.042)],
 'amber':[(.987,.022,95.277),(.962,.059,95.617),(.924,.12,95.746),(.879,.169,91.605),(.828,.189,84.429),(.769,.188,70.08),(.666,.179,58.318),(.555,.163,48.998),(.473,.137,46.201),(.414,.112,45.904),(.279,.077,45.635)],
 'green':[(.982,.018,155.826),(.962,.044,156.743),(.925,.084,155.995),(.871,.15,154.449),(.792,.209,151.711),(.723,.219,149.579),(.627,.194,149.214),(.527,.154,150.069),(.448,.119,151.328),(.393,.095,152.535),(.266,.065,152.934)],
 'blue':[(.97,.014,254.604),(.932,.032,255.585),(.882,.059,254.128),(.809,.105,251.813),(.707,.165,254.624),(.623,.214,259.815),(.546,.245,262.881),(.488,.243,264.376),(.424,.199,265.638),(.379,.146,265.522),(.282,.091,267.935)],
}

def status_scales(chroma_factor=1.0):
    """L y H de Tailwind por paso; C × chroma_factor; ajuste a sRGB reduciendo solo el croma."""
    out={}
    for name,ref in TW_STATUS.items():
        rows=[]
        for i,(L,C,H) in enumerate(ref):
            rgb,used=oklch_to_rgb_gamut(L,C*chroma_factor,H)
            rows.append(dict(step=STEPS[i],oklch=[round(L,3),round(used,3),round(H,1)],hex=hexs(rgb),contrast_white=round(contrast(rgb,[1,1,1]),2)))
        out[name]=rows
    return out
