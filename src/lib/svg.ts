/**
 * Figma exports reuse ids like `filter0_d_0_4` across files. When several SVGs are
 * inlined on one page those ids collide, so prefix every id and its references.
 */
export function scopeSvgIds(svg: string, prefix: string): string {
  const ids = [...svg.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]);
  let out = svg;
  for (const id of new Set(ids)) {
    const esc = id.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    out = out
      .replace(new RegExp(`id="${esc}"`, 'g'), `id="${prefix}-${id}"`)
      .replace(new RegExp(`url\\(#${esc}\\)`, 'g'), `url(#${prefix}-${id})`)
      .replace(new RegExp(`href="#${esc}"`, 'g'), `href="#${prefix}-${id}"`);
  }
  // Drop Figma's inline sizing so CSS controls layout.
  return out.replace(/\sstyle="display: block;"/, '').replace(/\spreserveAspectRatio="none"/, '');
}
