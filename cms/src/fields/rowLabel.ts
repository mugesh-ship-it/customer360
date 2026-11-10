/** Array rows show their own text ("AI Accelerators") instead of "Item 01". */
export const rowLabel = (field: string, fallback: string) => ({
  components: {
    RowLabel: { path: '/components/admin/RowLabel#RowLabel', clientProps: { field, fallback } },
  },
})
