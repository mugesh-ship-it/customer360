'use client'
import type { TextFieldClientComponent } from 'payload'
import { TextInput, useField } from '@payloadcms/ui'

const HEX = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i

/** Text field with a colour swatch: click the swatch to pick, or type a hex code. */
export const ColorField: TextFieldClientComponent = ({ field, path, readOnly }) => {
  const { value, setValue, showError } = useField<string>({ path })
  const swatch = value && HEX.test(value) ? value : '#ffffff'

  return (
    <TextInput
      path={path}
      label={field.label}
      description={field.admin?.description as string | undefined}
      required={field.required}
      readOnly={readOnly}
      showError={showError}
      value={value ?? ''}
      placeholder="#1570ef"
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value.trim())}
      style={{ ...(field.admin?.width ? { width: field.admin.width } : {}) }}
      BeforeInput={
        <input
          type="color"
          aria-label={`Pick ${typeof field.label === 'string' ? field.label : 'colour'}`}
          value={swatch.length === 4 ? `#${[...swatch.slice(1)].map((c) => c + c).join('')}` : swatch}
          disabled={readOnly}
          onChange={(e) => setValue(e.target.value)}
          style={{ width: 40, height: 40, padding: 2, border: '1px solid var(--theme-elevation-150)', borderRadius: 6, background: 'none', cursor: 'pointer', flexShrink: 0, marginRight: 8 }}
        />
      }
    />
  )
}
