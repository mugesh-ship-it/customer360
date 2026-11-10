'use client'
import type { FieldDescriptionClientComponent } from 'payload'
import { useFormFields } from '@payloadcms/ui'

type Props = { min?: number; max?: number; hint?: string }

/** Live character count under SEO fields: green inside the ideal range, amber outside it. */
export const LengthHint: FieldDescriptionClientComponent = (props) => {
  const { path, min = 0, max = 160, hint } = props as typeof props & Props
  const value = useFormFields(([fields]) => fields[path]?.value)
  const length = typeof value === 'string' ? value.length : 0
  const ok = length >= min && length <= max
  const colour = length === 0 ? 'var(--theme-elevation-500)' : ok ? 'var(--theme-success-600)' : 'var(--theme-warning-600)'

  return (
    <div className="field-description" style={{ marginTop: 6 }}>
      <span style={{ color: colour, fontWeight: 600 }}>
        {length} characters
      </span>
      <span style={{ color: 'var(--theme-elevation-500)' }}>
        {' '}· ideal {min}–{max}
        {hint ? ` · ${hint}` : ''}
      </span>
    </div>
  )
}
