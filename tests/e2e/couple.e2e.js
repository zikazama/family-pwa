// Automated E2E tests for Zira Couple App
// Run with: node tests/e2e/couple.e2e.js
// Requires env variables as described in README

require('dotenv').config()
const puppeteer = require('puppeteer')

const SITE = process.env.SITE || 'http://localhost:3000'

async function loginWithEmail(page, email, pass) {
  await page.goto(`${SITE}/auth`, { waitUntil: 'networkidle0' })
  await page.type('input[type=email]', email)
  await page.type('input[type=password]', pass)
  await page.click('button[type=submit]')
  await page.waitForSelector('.btn-dashboard', { timeout: 15000 })
}

;(async () => {
  const browser = await puppeteer.launch({ headless: true })
  const ctx1 = await browser.createIncognitoBrowserContext()
  const ctx2 = await browser.createIncognitoBrowserContext()
  const page1 = await ctx1.newPage()
  const page2 = await ctx2.newPage()

  try {
    // Login both users (ensure Email/Password provider enabled for CI)
    await Promise.all([
      loginWithEmail(page1, process.env.TEST_USER1, process.env.TEST_PASS1),
      loginWithEmail(page2, process.env.TEST_USER2, process.env.TEST_PASS2)
    ])

    // ---- Background photo sync ----
    await page1.goto(`${SITE}/settings`, { waitUntil: 'networkidle0' })
    const [chooser] = await Promise.all([
      page1.waitForFileChooser(),
      page1.click('#bgPhoto')
    ])
    await chooser.accept([require('path').resolve(__dirname, '../fixtures/bg.jpg')])
    await page1.click('.btn-save')
    await page1.waitForTimeout(4000)

    await page2.goto(`${SITE}/couple`, { waitUntil: 'networkidle0' })
    await page2.waitForFunction(() => {
      const el = document.querySelector('.couple-summary')
      return el && el.style.backgroundImage.includes('background')
    }, { timeout: 10000 })
    console.log('✅ Background photo synced')

    // ---- Calendar event sync ----
    await page1.goto(`${SITE}/calendar`, { waitUntil: 'networkidle0' })
    await page1.type('#title', 'E2E Event')
    await page1.type('#date', '2025-12-31')
    await page1.click('.btn-add')
    await page1.waitForSelector('.event-item', { timeout: 5000 })

    await page2.goto(`${SITE}/calendar`, { waitUntil: 'networkidle0' })
    await page2.waitForFunction(() => document.querySelector('.event-title')?.textContent.includes('E2E Event'), { timeout: 10000 })
    console.log('✅ Calendar event synced')

    // ---- Notes sync ----
    await page1.goto(`${SITE}/notes`, { waitUntil: 'networkidle0' })
    await page1.type('.note-form textarea', 'CI note')
    await page1.click('.btn-add')
    await page1.waitForSelector('.note-item textarea', { timeout: 5000 })

    await page2.goto(`${SITE}/notes`, { waitUntil: 'networkidle0' })
    await page2.waitForFunction(() => document.querySelector('.note-item textarea')?.value.includes('CI note'), { timeout: 10000 })
    console.log('✅ Notes synced')

    console.log('🎉 All core features verified')
  } catch (err) {
    console.error('❌ Test failed:', err)
    process.exitCode = 1
  } finally {
    await browser.close()
  }
})()