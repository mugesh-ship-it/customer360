/**
 * Payload Lexical rich text → HTML, at build time (no client JS, no extra
 * dependency). Headings get stable ids so the "On this page" list can link to
 * them; `toc` lists every H2 and H3 in order.
 */
import { mediaSrcset, mediaUrl, populated, type Media } from './cms';

type LexicalNode = {
  type: string;
  children?: LexicalNode[];
  text?: string;
  format?: number | string;
  tag?: string;
  listType?: 'bullet' | 'number' | 'check';
  checked?: boolean;
  url?: string;
  fields?: { url?: string; newTab?: boolean; linkType?: string; doc?: { value?: { slug?: string } | number; relationTo?: string } };
  value?: Media | number;
  [key: string]: unknown;
};
export type RichText = { root: LexicalNode } | null | undefined;
export type TocItem = { id: string; text: string; level: 2 | 3 };

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const plain = (n: LexicalNode): string => (n.type === 'text' ? (n.text ?? '') : (n.children ?? []).map(plain).join(''));
const slug = (s: string) =>
  s
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'section';

// Lexical text format bit flags
const BOLD = 1, ITALIC = 2, STRIKE = 4, UNDERLINE = 8, CODE = 16, SUB = 32, SUP = 64;

export function renderRichText(value: RichText): { html: string; toc: TocItem[]; words: number } {
  const toc: TocItem[] = [];
  const used = new Map<string, number>();
  let words = 0;

  const uniqueId = (text: string) => {
    const base = slug(text);
    const n = used.get(base) ?? 0;
    used.set(base, n + 1);
    return n ? `${base}-${n + 1}` : base;
  };

  const text = (n: LexicalNode) => {
    const raw = n.text ?? '';
    words += raw.split(/\s+/).filter(Boolean).length;
    let out = esc(raw);
    const f = typeof n.format === 'number' ? n.format : 0;
    if (f & CODE) out = `<code>${out}</code>`;
    if (f & BOLD) out = `<strong>${out}</strong>`;
    if (f & ITALIC) out = `<em>${out}</em>`;
    if (f & UNDERLINE) out = `<u>${out}</u>`;
    if (f & STRIKE) out = `<s>${out}</s>`;
    if (f & SUB) out = `<sub>${out}</sub>`;
    if (f & SUP) out = `<sup>${out}</sup>`;
    return out;
  };

  const kids = (n: LexicalNode) => (n.children ?? []).map(node).join('');
  const align = (n: LexicalNode) => (typeof n.format === 'string' && ['center', 'right', 'justify'].includes(n.format) ? ` style="text-align:${n.format}"` : '');

  const linkHref = (n: LexicalNode) => {
    const f = n.fields ?? {};
    if (f.linkType === 'internal') {
      const doc = f.doc?.value;
      const s = typeof doc === 'object' ? doc?.slug : undefined;
      if (s) return f.doc?.relationTo === 'case-studies' ? `/case-studies/${s}` : s === 'home' ? '/' : `/${s}`;
    }
    return f.url || n.url || '#';
  };

  function node(n: LexicalNode): string {
    switch (n.type) {
      case 'root':
        return kids(n);
      case 'text':
        return text(n);
      case 'linebreak':
        return '<br>';
      case 'tab':
        return ' ';
      case 'paragraph': {
        const inner = kids(n);
        return inner ? `<p${align(n)}>${inner}</p>` : '';
      }
      case 'heading': {
        const tag = /^h[1-6]$/.test(n.tag ?? '') ? n.tag! : 'h2';
        // The page already has the H1, so an H1 in the story renders as H2.
        const level = tag === 'h1' ? 'h2' : tag;
        const label = plain(n).trim();
        const id = uniqueId(label);
        if (level === 'h2' || level === 'h3') toc.push({ id, text: label, level: level === 'h2' ? 2 : 3 });
        return `<${level} id="${id}"${align(n)}>${kids(n)}</${level}>`;
      }
      case 'list': {
        const tag = n.listType === 'number' ? 'ol' : 'ul';
        const cls = n.listType === 'check' ? ' class="is-checklist"' : '';
        return `<${tag}${cls}>${kids(n)}</${tag}>`;
      }
      case 'listitem': {
        // A nested list arrives as a list item that only holds a list.
        const nested = n.children?.length === 1 && n.children[0].type === 'list';
        const check = typeof n.checked === 'boolean' ? ` data-checked="${n.checked}"` : '';
        return nested ? `<li class="is-nested">${kids(n)}</li>` : `<li${check}>${kids(n)}</li>`;
      }
      case 'quote':
        return `<blockquote>${kids(n)}</blockquote>`;
      case 'link':
      case 'autolink': {
        const href = linkHref(n);
        const external = n.fields?.newTab || /^https?:\/\//.test(href);
        return `<a href="${esc(href)}"${external ? ' target="_blank" rel="noopener noreferrer"' : ''}>${kids(n)}</a>`;
      }
      case 'horizontalrule':
        return '<hr>';
      case 'upload': {
        const media = populated<Media>(n.value as Media | number);
        const src = mediaUrl(media);
        if (!media || !src) return '';
        const srcset = mediaSrcset(media);
        const img = `<img src="${esc(src)}"${srcset ? ` srcset="${esc(srcset)}" sizes="(min-width: 64rem) 736px, 100vw"` : ''} width="${media.width ?? ''}" height="${media.height ?? ''}" alt="${esc(media.alt ?? '')}" loading="lazy" decoding="async">`;
        return `<figure>${img}${media.alt ? `<figcaption>${esc(media.alt)}</figcaption>` : ''}</figure>`;
      }
      default:
        return kids(n);
    }
  }

  const html = value?.root ? node(value.root) : '';
  return { html, toc, words };
}

/** Reading time in whole minutes (at least 1). */
export const readingMinutes = (words: number) => Math.max(1, Math.round(words / 220));
