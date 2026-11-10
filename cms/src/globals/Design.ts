import type { Field, GlobalConfig } from 'payload'
import { colorField, pxField } from '../fields/design'
import { baseColors, colorScales, fonts, sizes, typeScale, type SizeKey } from '../design/tokens'
import { triggerRebuildGlobal } from '../hooks/triggerRebuild'

const shadeLabel = (key: string) => key.slice(1)

const scaleGroup = (name: keyof typeof colorScales): Field => {
  const scale = colorScales[name]
  return {
    name,
    label: scale.label,
    type: 'group',
    admin: { description: scale.description },
    fields: [{ type: 'row', fields: Object.entries(scale.shades).map(([k, v]) => colorField(k, shadeLabel(k), v)) }],
  }
}

const sizeRow = (group: string): Field => ({
  type: 'row',
  fields: (Object.entries(sizes) as [SizeKey, (typeof sizes)[SizeKey]][])
    .filter(([, s]) => s.group === group)
    .map(([k, s]) => pxField(k, s.label, s.value, group === 'buttons' ? '25%' : '33%')),
})

export const Design: GlobalConfig = {
  slug: 'design',
  label: 'Brand & design',
  access: { read: () => true },
  admin: {
    group: 'Settings',
    description: 'Colours, fonts and sizes used across the whole website. Changes apply to every page.',
  },
  hooks: { afterChange: [triggerRebuildGlobal] },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Colours',
          description: 'Click a swatch to pick a colour, or paste a hex code. Keep enough contrast between text and its background.',
          fields: [
            scaleGroup('primary'),
            scaleGroup('neutral'),
            {
              name: 'base',
              label: 'Other colours',
              type: 'group',
              fields: [
                {
                  type: 'row',
                  fields: Object.entries(baseColors).map(([k, c]) => colorField(k, c.label, c.value, '25%')),
                },
              ],
            },
          ],
        },
        {
          label: 'Fonts',
          description: 'Any family from fonts.google.com. Type the name exactly as Google shows it.',
          fields: [
            ...Object.entries(fonts).map(
              ([role, f]): Field => ({
                name: role,
                label: f.label,
                type: 'group',
                fields: [
                  {
                    type: 'row',
                    fields: [
                      { name: 'family', label: 'Google font name', type: 'text', required: true, defaultValue: f.family, admin: { width: '40%' } },
                      {
                        name: 'weights',
                        label: 'Weights',
                        type: 'text',
                        defaultValue: f.weights,
                        admin: { width: '25%', placeholder: '400;700', description: 'Separate with ;  Empty = regular only.' },
                      },
                      {
                        name: 'fallback',
                        label: 'Backup fonts',
                        type: 'text',
                        defaultValue: f.fallback,
                        admin: { width: '35%', description: 'Shown while the font loads.' },
                      },
                    ],
                  },
                ],
              }),
            ),
            {
              name: 'typeScale',
              label: 'Text sizes',
              type: 'group',
              admin: { description: 'Each size grows smoothly from the phone size to the desktop size.' },
              fields: Object.entries(typeScale).map(
                ([k, t]): Field => ({
                  name: k,
                  label: t.label,
                  type: 'group',
                  fields: [
                    {
                      type: 'row',
                      fields: [pxField('min', 'Phone', t.min, '50%'), pxField('max', 'Desktop', t.max, '50%')],
                    },
                  ],
                }),
              ),
            },
          ],
        },
        {
          label: 'Sizes & spacing',
          fields: [
            { name: 'containers', label: 'Content width', type: 'group', admin: { description: 'Maximum width of page content on large screens.' }, fields: [sizeRow('containers')] },
            { name: 'gutter', label: 'Page side margins', type: 'group', admin: { description: 'Space between content and the screen edge.' }, fields: [sizeRow('gutter')] },
            {
              name: 'section',
              label: 'Space above & below sections',
              type: 'group',
              fields: [
                {
                  type: 'row',
                  fields: (['sectionSmallMobile', 'sectionMediumMobile', 'sectionLargeMobile'] as const).map((k) => pxField(k, sizes[k].label, sizes[k].value)),
                },
                {
                  type: 'row',
                  fields: (['sectionSmallDesktop', 'sectionMediumDesktop', 'sectionLargeDesktop'] as const).map((k) => pxField(k, sizes[k].label, sizes[k].value)),
                },
              ],
            },
            {
              name: 'buttons',
              label: 'Buttons & corners',
              type: 'group',
              admin: { description: 'Rounding: 0 = square corners, 9999 = fully round.' },
              fields: [sizeRow('buttons')],
            },
          ],
        },
      ],
    },
  ],
}
