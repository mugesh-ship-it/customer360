/**
 * One-off: upload the robot turn videos and attach them to the Home Page CTA
 * block without re-seeding (keeps any content edited in the admin).
 * Run: npx payload run src/scripts/attach-robot-turn.ts
 */
import path from 'path'
import { fileURLToPath } from 'url'
import { getPayload } from 'payload'
import config from '@payload-config'

const dirname = path.dirname(fileURLToPath(import.meta.url))
const mediaDir = path.resolve(dirname, '../../seed/media')
const payload = await getPayload({ config })

const findOrUpload = async (file: string) => {
  const existing = await payload.find({ collection: 'media', where: { filename: { equals: file } }, limit: 1 })
  if (existing.docs[0]) return existing.docs[0].id
  const doc = await payload.create({
    collection: 'media',
    data: { alt: 'Humanoid AI robot turning to face the viewer' },
    filePath: path.join(mediaDir, file),
  })
  return doc.id
}

const turnVideo = await findOrUpload('cta-robot-turn.mp4')
const turnVideoMobile = await findOrUpload('cta-robot-turn-mobile.mp4')

const { docs } = await payload.find({ collection: 'pages', where: { slug: { equals: 'home' } }, limit: 1, depth: 0 })
const home = docs[0]
if (!home) throw new Error('No home page')
const layout = (home.layout ?? []).map((b) => (b.blockType === 'cta' ? { ...b, turnVideo, turnVideoMobile } : b))
await payload.update({ collection: 'pages', id: home.id, data: { layout }, depth: 0 })
payload.logger.info(`Attached turn videos ${turnVideo} / ${turnVideoMobile} to home CTA`)
process.exit(0)
