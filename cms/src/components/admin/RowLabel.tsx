'use client'
import { useRowLabel } from '@payloadcms/ui'

type Props = { field?: string; fallback?: string }

/** Shows the row's own text (e.g. the link label) instead of "Item 01". */
export const RowLabel = ({ field = 'label', fallback = 'Item' }: Props) => {
  const { data, rowNumber } = useRowLabel<Record<string, unknown>>()
  const value = data?.[field]
  const n = String((rowNumber ?? 0) + 1).padStart(2, '0')
  return <span>{typeof value === 'string' && value.trim() ? value : `${fallback} ${n}`}</span>
}
