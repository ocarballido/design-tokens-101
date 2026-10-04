"""Tokens101 — generación de las escalas primitivas de color (S9, S10, S11, S18).
Se construyen en oklch y se guardan en sRGB (hex). Sin dependencias externas.

Uso:  python3 tools/scales.py
      Imprime el acento, los neutros y las escalas de estado, y escribe tools/scales.json.

Fuentes:
- Conversiones OKLab/oklch: Björn Ottosson, https://bottosson.github.io/posts/oklab/
- Contraste: WCAG 2.2, definiciones "relative luminance" y "contrast ratio".
- Curvas de referencia: paleta por defecto de Tailwind CSS v4 (packages/tailwindcss/theme.css),
  comprobadas contra la versión 4.3.3 el 2026-10-04: sin diferencias.

El contraste se calcula sobre el hex redondeado, que es el valor que se guarda en Figma (S9, S30).
"""
import colorsys
import json
import math
import os

# --- Conversiones -------------------------------------------------------------

def srgb_to_lin(c): return c/12.92 if c <= 0.04045 else ((c+0.055)/1.055)**2.4
def lin_to_srgb(c): return 12.92*c if c <= 0.0031308 else 1.055*c**(1/2.4)-0.055

def rgb_to_oklab(r, g, b):
    r, g, b = map(srgb_to_lin, (r, g, b))
    l = 0.4122214708*r+0.5363325363*g+0.0514459929*b
    m = 0.2119034982*r+0.6806995451*g+0.1073969566*b
    s = 0.0883024619*r+0.2817188376*g+0.6299787005*b
    l, m, s = [x**(1/3) for x in (l, m, s)]
    return (0.2104542553*l+0.7936177850*m-0.0040720468*s,
            1.9779984951*l-2.4285922050*m+0.4505937099*s,
            0.0259040371*l+0.7827717662*m-0.8086757660*s)

def oklab_to_lin(L, a, b):
    l = (L+0.3963377774*a+0.2158037573*b)**3
    m = (L-0.1055613458*a-0.0638541728*b)**3
    s = (L-0.0894841775*a-1.2914855480*b)**3
    return (4.0767416621*l-3.3077115913*m+0.2309699292*s,
            -1.2684380046*l+2.6097574011*m-0.3413193965*s,
            -0.0041960863*l-0.7034186147*m+1.7076147010*s)

def rgb_to_oklch(r, g, b):
    L, a, bb = rgb_to_oklab(r, g, b)
    return L, math.hypot(a, bb), math.degrees(math.atan2(bb, a)) % 360

def oklch_to_rgb_gamut(L, C, H):
    """oklch → sRGB. Si el color queda fuera de la gama sRGB, reduce solo el croma
    (búsqueda binaria) y conserva L y H. Devuelve (rgb, croma usado)."""
    def conv(c):
        a = c*math.cos(math.radians(H)); b = c*math.sin(math.radians(H))
        return oklab_to_lin(L, a, b)
    def ok(lin): return all(-1e-6 <= x <= 1+1e-6 for x in lin)
    if ok(conv(C)):
        lin, used = conv(C), C
    else:
        lo, hi = 0.0, C
        for _ in range(40):
            mid = (lo+hi)/2
            if ok(conv(mid)): lo = mid
            else: hi = mid
        lin, used = conv(lo), lo
    rgb = [min(1, max(0, lin_to_srgb(x))) for x in lin]
    return rgb, used

def hexs(rgb): return '#'+''.join(f'{round(x*255):02X}' for x in rgb)
def hex_to_rgb(h): return [int(h[i:i+2], 16)/255 for i in (1, 3, 5)]
def lum(rgb): r, g, b = map(srgb_to_lin, rgb); return 0.2126*r+0.7152*g+0.0722*b
def contrast(a, b):
    la, lb = sorted((lum(a), lum(b)), reverse=True); return (la+0.05)/(lb+0.05)

# --- Referencias de Tailwind CSS v4 ------------------------------------------

STEPS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]
TW_NEUTRAL_L = [.985, .97, .922, .87, .708, .556, .439, .371, .269, .205, .145]
TW_GRAY_C = [.002, .003, .006, .01, .022, .027, .03, .034, .033, .034, .028]
TW_GREEN = [(.982, .018), (.962, .044), (.925, .084), (.871, .15), (.792, .209), (.723, .219),
            (.627, .194), (.527, .154), (.448, .119), (.393, .095), (.266, .065)]
# Escalas de estado (S18): L, C y H por paso. Sin green: success usa emerald (S19).
TW_STATUS = {
 'red': [(.971, .013, 17.38), (.936, .032, 17.717), (.885, .062, 18.334), (.808, .114, 19.571), (.704, .191, 22.216), (.637, .237, 25.331), (.577, .245, 27.325), (.505, .213, 27.518), (.444, .177, 26.899), (.396, .141, 25.723), (.258, .092, 26.042)],
 'amber': [(.987, .022, 95.277), (.962, .059, 95.617), (.924, .12, 95.746), (.879, .169, 91.605), (.828, .189, 84.429), (.769, .188, 70.08), (.666, .179, 58.318), (.555, .163, 48.998), (.473, .137, 46.201), (.414, .112, 45.904), (.279, .077, 45.635)],
 'blue': [(.97, .014, 254.604), (.932, .032, 255.585), (.882, .059, 254.128), (.809, .105, 251.813), (.707, .165, 254.624), (.623, .214, 259.815), (.546, .245, 262.881), (.488, .243, 264.376), (.424, .199, 265.638), (.379, .146, 265.522), (.282, .091, 267.935)],
}

def row(step, L, C, H, rgb=None):
    """Una fila de escala. El rgb que se guarda es el del hex (redondeado)."""
    if rgb is None:
        rgb, C = oklch_to_rgb_gamut(L, C, H)
    h = hexs(rgb)
    return dict(step=step, oklch=[round(L, 3), round(C, 3), round(H, 1)], hex=h, rgb=hex_to_rgb(h))

# --- Método (S10, S11) --------------------------------------------------------

def build(accent_hsl, tint=0.5):
    """Acento y neutros a partir del color de marca en HSL (grados, %, %)."""
    h, s, l = accent_hsl
    brand = colorsys.hls_to_rgb(h/360, l/100, s/100)
    aL, aC, aH = rgb_to_oklch(*brand)
    # 1. Paso ancla: el de luminosidad más cercana en la curva de referencia.
    anchor = min(range(11), key=lambda i: abs(TW_GREEN[i][0]-aL))
    # 2. Proporción de croma entre la marca y la referencia en ese paso.
    ratio = aC/TW_GREEN[anchor][1]
    accent = []
    for i, (L, C) in enumerate(TW_GREEN):
        if i == anchor:  # 3. La marca, exacta en su paso.
            r = row(STEPS[i], aL, aC, aH, rgb=list(brand)); r['anchor'] = True
        else:            # 4. L de la referencia, C × proporción, tono de la marca.
            r = row(STEPS[i], L, C*ratio, aH)
        accent.append(r)
    # Neutros: L de neutral, C de gray × tinte, tono de la marca.
    neutral = [row(STEPS[i], L, TW_GRAY_C[i]*tint, aH) for i, L in enumerate(TW_NEUTRAL_L)]
    return dict(accent_input=dict(hsl=accent_hsl, hex=hexs(brand),
                                  oklch=[round(aL, 3), round(aC, 3), round(aH, 1)],
                                  anchor_step=STEPS[anchor], chroma_ratio=round(ratio, 3)),
                accent=accent, neutral=neutral)

def status_scales(chroma_factor=0.66):
    """Escalas de estado (S18): L y H de Tailwind por paso; C × chroma_factor;
    ajuste a sRGB reduciendo solo el croma."""
    return {name: [row(STEPS[i], L, C*chroma_factor, H) for i, (L, C, H) in enumerate(ref)]
            for name, ref in TW_STATUS.items()}

# --- Salida -------------------------------------------------------------------

if __name__ == '__main__':
    ACCENT_HSL = (160, 60, 50)  # color de marca de Tokens101: #33CC99 (S8)
    out = build(ACCENT_HSL)
    out['status'] = status_scales(0.66)
    white = [1, 1, 1]; n950 = out['neutral'][-1]['rgb']
    print('Color de marca:', out['accent_input'])
    def table(title, rows):
        print(f'\n{title}: paso | oklch | hex | contraste con blanco | con neutral-950')
        for r in rows:
            mark = '  ← color de marca' if r.get('anchor') else ''
            print(f"{r['step']:>4} | {r['oklch']} | {r['hex']} | {contrast(r['rgb'], white):5.2f} | {contrast(r['rgb'], n950):5.2f}{mark}")
    table('emerald (acento)', out['accent'])
    table('neutral', out['neutral'])
    for name, rows in out['status'].items():
        table(name, rows)
    for r in out['accent']+out['neutral']+[r for rows in out['status'].values() for r in rows]:
        r.pop('rgb')
    with open(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'scales.json'), 'w') as f:
        json.dump(out, f, indent=2)
