// AstroPower Clock — JavaScript starter
// Node 20+ (fetch built-in). No dependencies.

const API_BASE = process.env.ASTROPOWER_API_BASE || 'https://astropower.co.in'
const API_KEY = process.env.ASTROPOWER_API_KEY || 'demo-key-hackathon-2026'
const PROFILES = ['demo-delhi', 'demo-mumbai', 'demo-indore', 'demo-bangalore', 'demo-kolkata']

async function fetchWindows(profile, date) {
  const url = new URL(`${API_BASE}/api/v1/today`)
  url.searchParams.set('profile', profile)
  if (date) url.searchParams.set('date', date)

  const res = await fetch(url, {
    headers: { 'x-api-key': API_KEY },
  })
  const data = await res.json()
  if (!res.ok || !data.success) {
    throw new Error(`${res.status} ${data.error || data.message || 'failed'} — ${JSON.stringify(data)}`)
  }
  return data
}

async function main() {
  const date = new Date().toISOString().split('T')[0] // YYYY-MM-DD
  console.log(`Fetching windows for ${date} with key ${API_KEY.slice(0, 14)}...\n`)

  for (const profile of PROFILES) {
    const data = await fetchWindows(profile, date)
    console.log(`== ${profile} (${data.timezone}) ==`)
    for (const w of data.windows) {
      console.log(`  ${w.start}-${w.end} [${w.type}/${w.activity}] ${w.badge} — ${w.title}`)
    }
    console.log('')
  }

  // Example: pick next GOOD window for scheduling
  const delhi = await fetchWindows('demo-delhi', date)
  const nextGood = delhi.windows.find((w) => w.type === 'good')
  if (nextGood) {
    console.log(`Next GOOD for demo-delhi: ${nextGood.start}-${nextGood.end} ${nextGood.title} (${nextGood.activity})`)
  }
}

main().catch((err) => {
  console.error(err.message)
  process.exit(1)
})
