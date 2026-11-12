// Runs database migrations before the CMS build, without letting a preview touch the live database.
//
// Production deploys always migrate. A preview migrates only when it has its own database
// (a Neon branch per preview, flagged with PREVIEW_DB_ISOLATED=true); otherwise it skips,
// so an unmerged branch can never change the live schema.
import { spawnSync } from 'node:child_process'

const env = process.env.VERCEL_ENV

// Set PREVIEW_DB_ISOLATED=true on the Preview environment once Neon gives each preview its own branch.
if (env === 'preview' && process.env.PREVIEW_DB_ISOLATED !== 'true') {
  console.warn(
    '[migrate] Skipped: previews share the production database. ' +
      'Turn on Neon preview branching, then set PREVIEW_DB_ISOLATED=true for Preview.',
  )
  process.exit(0)
}

const result = spawnSync('npx', ['payload', 'migrate'], {
  stdio: 'inherit',
  env: { ...process.env, NODE_OPTIONS: '--no-deprecation' },
})
process.exit(result.status ?? 1)
