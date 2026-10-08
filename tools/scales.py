"""DesignToken101 — generación de las escalas primitivas de color (S9, S10, S11, S18).
Se construyen en oklch y se guardan en sRGB (hex). Sin dependencias externas.

Uso:  python3 tools/scales.py
      Imprime el acento, los neutros y las escalas de estado, con los avisos del método,
      y escribe tools/scales.json. Los valores de entrada están al final del archivo:
      el color de marca en hex (el valor que se guarda en Figma), el tinte de los neutros
      y la curva de referencia.

Fuentes:
- Conversiones OKLab/oklch: Björn Ottosson, https://bottosson.github.io/posts/oklab/
- Contraste: WCAG 2.2, definiciones "relative luminance" y "contrast ratio".
- Curvas de referencia: paleta por defecto de Tailwind CSS v4 (packages/tailwindcss/theme.css),
  copiadas de la versión 4.3.3 (etiqueta v4.3.3) el 2026-10-08.
- Marca sin croma: CSS Color 4, el tono de oklch no tiene efecto con C <= 0.000004 (powerless hue).

El contraste se calcula sobre el hex redondeado, que es el valor que se guarda en Figma (S9, S30).
"""
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
# Curvas de referencia: L y C de cada paso en las 17 paletas de color de Tailwind CSS 4.3.3.
# El método toma de la curva elegida solo L y C, nunca el tono (lección color-scales).
TW_CURVES = {
 'red': [(.971, .013), (.936, .032), (.885, .062), (.808, .114), (.704, .191), (.637, .237), (.577, .245), (.505, .213), (.444, .177), (.396, .141), (.258, .092)],
 'orange': [(.98, .016), (.954, .038), (.901, .076), (.837, .128), (.75, .183), (.705, .213), (.646, .222), (.553, .195), (.47, .157), (.408, .123), (.266, .079)],
 'amber': [(.987, .022), (.962, .059), (.924, .12), (.879, .169), (.828, .189), (.769, .188), (.666, .179), (.555, .163), (.473, .137), (.414, .112), (.279, .077)],
 'yellow': [(.987, .026), (.973, .071), (.945, .129), (.905, .182), (.852, .199), (.795, .184), (.681, .162), (.554, .135), (.476, .114), (.421, .095), (.286, .066)],
 'lime': [(.986, .031), (.967, .067), (.938, .127), (.897, .196), (.841, .238), (.768, .233), (.648, .2), (.532, .157), (.453, .124), (.405, .101), (.274, .072)],
 'green': [(.982, .018), (.962, .044), (.925, .084), (.871, .15), (.792, .209), (.723, .219), (.627, .194), (.527, .154), (.448, .119), (.393, .095), (.266, .065)],
 'emerald': [(.979, .021), (.95, .052), (.905, .093), (.845, .143), (.765, .177), (.696, .17), (.596, .145), (.508, .118), (.432, .095), (.378, .077), (.262, .051)],
 'teal': [(.984, .014), (.953, .051), (.91, .096), (.855, .138), (.777, .152), (.704, .14), (.60, .118), (.511, .096), (.437, .078), (.386, .063), (.277, .046)],
 'cyan': [(.984, .019), (.956, .045), (.917, .08), (.865, .127), (.789, .154), (.715, .143), (.609, .126), (.52, .105), (.45, .085), (.398, .07), (.302, .056)],
 'sky': [(.977, .013), (.951, .026), (.901, .058), (.828, .111), (.746, .16), (.685, .169), (.588, .158), (.50, .134), (.443, .11), (.391, .09), (.293, .066)],
 'blue': [(.97, .014), (.932, .032), (.882, .059), (.809, .105), (.707, .165), (.623, .214), (.546, .245), (.488, .243), (.424, .199), (.379, .146), (.282, .091)],
 'indigo': [(.962, .018), (.93, .034), (.87, .065), (.785, .115), (.673, .182), (.585, .233), (.511, .262), (.457, .24), (.398, .195), (.359, .144), (.257, .09)],
 'violet': [(.969, .016), (.943, .029), (.894, .057), (.811, .111), (.702, .183), (.606, .25), (.541, .281), (.491, .27), (.432, .232), (.38, .189), (.283, .141)],
 'purple': [(.977, .014), (.946, .033), (.902, .063), (.827, .119), (.714, .203), (.627, .265), (.558, .288), (.496, .265), (.438, .218), (.381, .176), (.291, .149)],
 'fuchsia': [(.977, .017), (.952, .037), (.903, .076), (.833, .145), (.74, .238), (.667, .295), (.591, .293), (.518, .253), (.452, .211), (.401, .17), (.293, .136)],
 'pink': [(.971, .014), (.948, .028), (.899, .061), (.823, .12), (.718, .202), (.656, .241), (.592, .249), (.525, .223), (.459, .187), (.408, .153), (.284, .109)],
 'rose': [(.969, .015), (.941, .03), (.892, .058), (.81, .117), (.712, .194), (.645, .246), (.586, .253), (.514, .222), (.455, .188), (.41, .159), (.271, .105)],
}
# Escalas de estado (S18): L, C y H por paso. Sin green: success usa emerald (S19).
TW_STATUS = {
 'red': [(.971, .013, 17.38), (.936, .032, 17.717), (.885, .062, 18.334), (.808, .114, 19.571), (.704, .191, 22.216), (.637, .237, 25.331), (.577, .245, 27.325), (.505, .213, 27.518), (.444, .177, 26.899), (.396, .141, 25.723), (.258, .092, 26.042)],
 'amber': [(.987, .022, 95.277), (.962, .059, 95.617), (.924, .12, 95.746), (.879, .169, 91.605), (.828, .189, 84.429), (.769, .188, 70.08), (.666, .179, 58.318), (.555, .163, 48.998), (.473, .137, 46.201), (.414, .112, 45.904), (.279, .077, 45.635)],
 'blue': [(.97, .014, 254.604), (.932, .032, 255.585), (.882, .059, 254.128), (.809, .105, 251.813), (.707, .165, 254.624), (.623, .214, 259.815), (.546, .245, 262.881), (.488, .243, 264.376), (.424, .199, 265.638), (.379, .146, 265.522), (.282, .091, 267.935)],
}

def row(step, L, C, H, rgb=None):
    """Una fila de escala. El rgb que se guarda es el del hex (redondeado).
    Si el ajuste a sRGB recorta el croma, 'clip' dice cuánto, en porcentaje."""
    clip = 0
    if rgb is None:
        rgb, used = oklch_to_rgb_gamut(L, C, H)
        if C > 0 and used < C - 1e-9:
            clip = round(100*(1-used/C))
        C = used
    h = hexs(rgb)
    r = dict(step=step, oklch=[round(L, 3), round(C, 3), round(H, 1)], hex=h, rgb=hex_to_rgb(h))
    if clip:
        r['clip'] = clip
    return r

# --- Método (S10, S11) --------------------------------------------------------

ACHROMATIC = 0.000004  # CSS Color 4: con C <= 0.000004 el tono de oklch no tiene efecto

def build(accent_hex, tint=0.5, reference='green'):
    """Acento y neutros a partir del color de marca en hex (#RRGGBB) y una curva de TW_CURVES."""
    if len(accent_hex) != 7 or accent_hex[0] != '#':
        raise ValueError(f'Color de marca en hex de seis cifras (#RRGGBB): {accent_hex!r}')
    curve = TW_CURVES[reference]
    brand = hex_to_rgb(accent_hex)
    aL, aC, aH = rgb_to_oklch(*brand)
    warnings = []
    achromatic = aC <= ACHROMATIC
    if achromatic:  # Sin croma no hay tono: la escala es gris y los neutros, sin tinte.
        aC, tint = 0.0, 0.0
        warnings.append('La marca no tiene croma: su tono no existe. El acento es una escala de grises y los neutros van sin tinte.')
    # 1. Paso ancla: el de luminosidad más cercana en la curva de referencia.
    anchor = min(range(11), key=lambda i: abs(curve[i][0]-aL))
    # 2. Proporción de croma entre la marca y la referencia en ese paso.
    ratio = aC/curve[anchor][1]
    accent = []
    for i, (L, C) in enumerate(curve):
        if i == anchor:  # 3. La marca, exacta en su paso.
            r = row(STEPS[i], aL, aC, aH, rgb=list(brand)); r['anchor'] = True
        else:            # 4. L de la referencia, C × proporción, tono de la marca.
            r = row(STEPS[i], L, C*ratio, aH)
        accent.append(r)
    if STEPS[anchor] in (50, 100, 900, 950) and not achromatic:
        warnings.append(f'La marca cae en el paso {STEPS[anchor]}, un extremo de la curva: la proporción de croma se calcula sobre un croma pequeño y los pasos centrales pueden alejarse mucho de la marca.')
    clipped = [f"{r['step']} (-{r['clip']} %)" for r in accent if r.get('clip')]
    if clipped:
        warnings.append('El ajuste a sRGB recorta el croma en ' + ', '.join(clipped) + ': en esos pasos, la escala no sigue la forma de la curva. Otra curva puede recortar menos.')
    # Neutros: L de neutral, C de gray × tinte, tono de la marca.
    neutral = [row(STEPS[i], L, TW_GRAY_C[i]*tint, aH) for i, L in enumerate(TW_NEUTRAL_L)]
    return dict(accent_input=dict(hex=accent_hex.upper(), reference=reference,
                                  oklch=[round(aL, 3), round(aC, 3), round(aH, 1)],
                                  anchor_step=STEPS[anchor], chroma_ratio=round(ratio, 3)),
                accent=accent, neutral=neutral, warnings=warnings)

def status_scales(chroma_factor=0.66):
    """Escalas de estado (S18): L y H de Tailwind por paso; C × chroma_factor;
    ajuste a sRGB reduciendo solo el croma."""
    return {name: [row(STEPS[i], L, C*chroma_factor, H) for i, (L, C, H) in enumerate(ref)]
            for name, ref in TW_STATUS.items()}

# --- Salida -------------------------------------------------------------------

if __name__ == '__main__':
    ACCENT_HEX = '#33CC99'  # color de marca de DesignToken101 (S8)
    TINT = 0.5              # croma de los neutros: gray × 0,5 (S11); 0 = gris puro
    REFERENCE = 'green'     # curva de referencia: una de TW_CURVES (S10)
    out = build(ACCENT_HEX, TINT, REFERENCE)
    out['status'] = status_scales(0.66)
    white = [1, 1, 1]; n950 = out['neutral'][-1]['rgb']
    print('Color de marca:', out['accent_input'])
    def table(title, rows):
        print(f'\n{title}: paso | oklch | hex | contraste con blanco | con neutral-950')
        for r in rows:
            mark = '  ← color de marca' if r.get('anchor') else (f"  ← croma recortado {r['clip']} %" if r.get('clip') else '')
            print(f"{r['step']:>4} | {r['oklch']} | {r['hex']} | {contrast(r['rgb'], white):5.2f} | {contrast(r['rgb'], n950):5.2f}{mark}")
    table(f'acento (curva {REFERENCE})', out['accent'])
    table('neutral', out['neutral'])
    for name, rows in out['status'].items():
        table(name, rows)
    for w in out['warnings']:
        print('\nAviso:', w)
    for r in out['accent']+out['neutral']+[r for rows in out['status'].values() for r in rows]:
        r.pop('rgb')
    with open(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'scales.json'), 'w') as f:
        json.dump(out, f, indent=2)
