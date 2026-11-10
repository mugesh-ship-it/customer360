/** Common block UI: thumbnail in the "Add section" picker, no technical "block name" input. */
export const blockAdmin = (slug: string, alt: string) => ({
  imageURL: `/admin/blocks/${slug}.jpg`,
  imageAltText: alt,
  admin: { disableBlockName: true },
})
