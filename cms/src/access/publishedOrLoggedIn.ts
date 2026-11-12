import type { Access } from 'payload'

/** Editors see everything; the public site (and its build) only sees published documents. */
export const publishedOrLoggedIn: Access = ({ req: { user } }) =>
  user ? true : { _status: { equals: 'published' } }
