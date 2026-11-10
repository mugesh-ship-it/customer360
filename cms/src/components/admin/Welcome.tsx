import Link from 'next/link'

const siteUrl = process.env.SITE_URL || 'http://localhost:4321'

const cards = [
  { title: 'Edit the Home page', text: 'Change headings, text, images and buttons, section by section.', href: '/admin/collections/pages' },
  { title: 'Testimonials', text: 'Add, edit or remove client quotes and photos.', href: '/admin/collections/testimonials' },
  { title: 'Images & files', text: 'Upload new images or replace existing ones.', href: '/admin/collections/media' },
  { title: 'Top menu', text: 'Logo, menu links and the “Contact Us” button.', href: '/admin/globals/header' },
  { title: 'Footer', text: 'Contact details, social links and footer menus.', href: '/admin/globals/footer' },
]

/** Friendly start screen shown above the default dashboard. */
export const Welcome = () => (
  <div className="c360-welcome">
    <div className="c360-welcome__intro">
      <h2>Welcome 👋</h2>
      <p>
        Pick what you want to update below. Make your changes, click <strong>Save</strong>, and they go live on the
        website. Not sure how it will look? Use the <strong>Preview</strong> button on any page.
      </p>
      <a className="c360-welcome__site" href={siteUrl} target="_blank" rel="noreferrer">
        View website ↗
      </a>
    </div>
    <div className="c360-welcome__grid">
      {cards.map((c) => (
        <Link key={c.href} href={c.href} className="c360-welcome__card">
          <strong>{c.title}</strong>
          <span>{c.text}</span>
        </Link>
      ))}
    </div>
  </div>
)
