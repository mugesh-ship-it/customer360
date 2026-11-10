import type { NumberField, TextField, TextareaField } from 'payload'

const HEX = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i

/** Hex colour with a swatch picker. */
export const colorField = (name: string, label: string, defaultValue: string, width = '25%'): TextField => ({
  name,
  label,
  type: 'text',
  required: true,
  defaultValue,
  validate: (v: unknown) => (typeof v === 'string' && HEX.test(v) ? true : 'Use a hex colour like #1570ef'),
  admin: { width, components: { Field: '/components/admin/ColorField#ColorField' } },
})

/** Pixel size. */
export const pxField = (name: string, label: string, defaultValue: number, width = '33%', description?: string): NumberField => ({
  name,
  label: `${label} (px)`,
  type: 'number',
  required: true,
  min: 0,
  defaultValue,
  admin: { width, step: 1, description },
})

/** Text field with a live character counter (for Google titles/descriptions). */
export const seoText = (
  name: string,
  label: string,
  { min, max, hint, textarea = false, placeholder }: { min: number; max: number; hint?: string; textarea?: boolean; placeholder?: string },
): TextField | TextareaField =>
  ({
    name,
    label,
    type: textarea ? 'textarea' : 'text',
    admin: {
      placeholder,
      components: { Description: { path: '/components/admin/LengthHint#LengthHint', clientProps: { min, max, hint } } },
    },
  }) as TextField | TextareaField
