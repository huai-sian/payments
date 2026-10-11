import { chromium } from '@playwright/test'
import assert from 'node:assert/strict'
import { readFile, writeFile, mkdir } from 'node:fs/promises'

const base = process.env.PREVIEW_URL || 'http://127.0.0.1:4173/'
const browser = await chromium.launch({
  channel: process.env.BROWSER_CHANNEL || 'chrome',
  headless: true,
})
const evidence = new URL('../docs/evidence/', import.meta.url)
await mkdir(evidence, { recursive: true })
const legacy = JSON.parse(
  await readFile(new URL('live-inventory.json', evidence), 'utf8'),
)
const regions = {
  check: ['G1', 'G2', 'S1', 'S2', 'G3', 'G4', 'G5'],
  orderatm: ['G1', 'G2', 'G3', 'S3', 'S4', 'G4', 'G6', 'G5'],
  ordercard: ['G1', 'G2', 'G3', 'S5', 'S6', 'G4', 'G6', 'G5'],
  orderconvenient: ['G1', 'G2', 'G3', 'S3', 'S7', 'G4', 'G6', 'G5'],
  paycomplete: ['G1', 'G2', 'G3', 'S8', 'G5'],
}
const records = []
const errors = []
const externalRequests = []
const assertions = []
const check = (name, fn) => {
  fn()
  assertions.push(name)
}
const context = await browser.newContext()
context.on('page', (page) =>
  page.on('pageerror', (e) => errors.push(e.message)),
)
context.on('request', (request) => {
  if (
    !request.url().startsWith(new URL(base).origin) &&
    !request.url().startsWith('data:')
  )
    externalRequests.push(request.url())
})
async function ready(page, route) {
  await page
    .locator(`[data-region="${regions[route][regions[route].length - 2]}"]`)
    .waitFor()
  await page.waitForFunction(() =>
    Array.from(document.images).every((img) => img.complete),
  )
}
try {
  for (const width of [1440, 768, 390, 320]) {
    for (const route of Object.keys(regions)) {
      const page = await context.newPage({ viewport: { width, height: 1000 } })
      await page.setViewportSize({ width, height: 1000 })
      await page.goto(`${base}#/order/${route}`)
      await ready(page, route)
      const actualRegions = await page
        .locator('[data-region]')
        .evaluateAll((els) => els.map((el) => el.dataset.region))
      check(`${route}/${width}: section order`, () =>
        assert.deepEqual(actualRegions, regions[route]),
      )
      check(`${route}/${width}: no overflow`, () => {})
      assert.ok(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
        `${route}/${width} overflow`,
      )
      const failedImages = await page
        .locator('img')
        .evaluateAll((images) =>
          images.filter((img) => !img.naturalWidth).map((img) => img.src),
        )
      check(`${route}/${width}: images loaded`, () =>
        assert.deepEqual(failedImages, []),
      )
      if (route === 'orderconvenient') {
        const amount = await page.locator('.store-payment-info > div').boundingBox()
        const stores = await page.locator('.store-field').boundingBox()
        if (width >= 768) {
          assert.ok(stores.x > amount.x && Math.abs(stores.y - amount.y) < 2)
        } else {
          assert.ok(stores.y >= amount.y + amount.height)
        }
        assertions.push(`${route}/${width}: amount and store grouping`)
      }
      const screenshot = `rebuilt-${route}-${width}.png`
      await page.screenshot({
        path: new URL(screenshot, evidence).pathname,
        fullPage: true,
      })
      if (route === 'paycomplete') await page.locator('summary').click()
      const text = await page.locator('body').innerText()
      const source = legacy.find(
        (entry) => entry.route === route && entry.width === 1440,
      )
      const normalized = text.replace(/\s/g, '')
      for (const line of source.text
        .split('\n')
        .filter((line) => line.trim())) {
        // Both labels remain in order, with a decorative arrow added between actions.
        const phrases =
          line === '返回訂單下一步' ? ['返回訂單', '下一步'] : [line]
        for (const phrase of phrases)
          assert.ok(
            normalized.includes(phrase.replace(/\s/g, '')),
            `${route}/${width}: missing ${phrase}`,
          )
      }
      assertions.push(`${route}/${width}: legacy visible text`)
      const links = await page
        .locator('.method-card')
        .evaluateAll((els) => els.map((el) => el.getAttribute('href')))
      check(`${route}/${width}: payment destinations`, () =>
        assert.deepEqual(links, [
          '#/order/orderatm',
          '#/order/ordercard',
          '#/order/orderconvenient',
        ]),
      )
      await page.reload()
      await ready(page, route)
      assertions.push(`${route}/${width}: direct load + refresh`)
      records.push({
        route,
        width,
        regions: actualRegions,
        screenshot,
        text,
        links,
      })
      await page.close()
    }
  }
  const page = await context.newPage()
  await page.goto(`${base}#/missing?source=qa#keep`)
  await ready(page, 'check')
  assert.equal(new URL(page.url()).hash, '#/order/check?source=qa#keep')
  assertions.push('unknown route preserves query and fragment')
  await page.goto(`${base}#/order?source=qa`)
  await ready(page, 'check')
  assert.equal(new URL(page.url()).hash, '#/order/check?source=qa')
  await page.getByRole('button', { name: '增加第 1 項商品數量' }).click()
  assert.equal(
    await page.locator('.order-summary .total-price').innerText(),
    '$3000',
  )
  const quantity = page.getByRole('spinbutton', { name: '第 1 項商品數量' })
  for (const [value, expected] of [
    ['10', '10'],
    ['11', '10'],
    ['-1', '1'],
    ['3.9', '3'],
    ['', '1'],
    ['4', '4'],
  ]) {
    await quantity.fill(value)
    assert.equal(await quantity.inputValue(), expected)
  }
  assert.equal(
    await page.locator('.order-summary .total-price').innerText(),
    '$5000',
  )
  for (const [label, route] of [
    ['ATM付款', 'orderatm'],
    ['信用卡付款', 'ordercard'],
    ['超商代碼付款', 'orderconvenient'],
  ]) {
    await page.getByRole('link', { name: label, exact: false }).click()
    await ready(page, route)
    assert.equal(await page.locator('.amount').innerText(), '$5000')
    assert.ok(page.url().includes('source=qa'))
    assert.equal(await page.locator('.method-card.selected').count(), 1)
  }
  assertions.push(
    'quantity boundaries, manual input, totals across all payment methods, active states and queries',
  )
  await page.getByRole('radio', { name: '全家', exact: true }).check()
  assert.ok(
    await page.getByRole('radio', { name: '全家', exact: true }).isChecked(),
  )
  await page.getByRole('link', { name: '下一步' }).click()
  await ready(page, 'paycomplete')
  assert.match(
    await page.locator('.result-disclaimer').innerText(),
    /未建立實際訂單/,
  )
  await page.getByRole('link', { name: '回首頁' }).click()
  await ready(page, 'check')
  await page.getByRole('link', { name: 'ATM付款' }).click()
  await ready(page, 'orderatm')
  await page.getByLabel('選擇銀行').selectOption('HNBK')
  assert.equal(await page.getByLabel('選擇銀行').inputValue(), 'HNBK')
  await page.getByRole('link', { name: '下一步' }).click()
  await ready(page, 'paycomplete')
  await page.getByRole('link', { name: '信用卡付款' }).click()
  await ready(page, 'ordercard')
  await page.getByRole('button', { name: '下一步' }).click()
  assert.equal(await page.locator('[aria-invalid="true"]').count(), 5)
  assert.equal(await page.evaluate(() => document.activeElement.id), 'card')
  const nextYear = String(new Date().getFullYear() + 1).slice(-2)
  for (const [id, value] of Object.entries({
    card: '4111-1111-1111-1111',
    name: 'TEST USER',
    expiry: `12/${nextYear}`,
    cvv: '123',
    phone: '0912345678',
  }))
    await page.locator(`#${id}`).fill(value)
  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: 1000 })
    for (const id of ['expiry', 'cvv']) {
      const hint = page.getByRole('button', {
        name: `查看${id === 'expiry' ? '有效年月' : '安全驗證碼'}提示`,
      })
      await hint.focus()
      await page.keyboard.press('Enter')
      assert.equal(await hint.getAttribute('aria-expanded'), 'true')
      const image = page.locator(`#${id}-hint img`)
      assert.ok(
        (await image.evaluate((img) => img.currentSrc)).includes(
          width === 390 ? 'Mobile_order' : 'Web_order',
        ),
      )
      await page.screenshot({
        path: new URL(`rebuilt-card-hint-${id}-${width}.png`, evidence)
          .pathname,
        fullPage: true,
      })
      await hint.click()
    }
  }
  await page.getByRole('button', { name: '下一步' }).click()
  await ready(page, 'paycomplete')
  await page.getByRole('link', { name: '信用卡付款' }).click()
  await ready(page, 'ordercard')
  assert.equal(await page.locator('#card').inputValue(), '')
  assert.deepEqual(
    await page.evaluate(() => ({
      local: Object.keys(localStorage),
      session: Object.keys(sessionStorage),
    })),
    { local: [], session: [] },
  )
  await page.getByRole('link', { name: '返回訂單' }).click()
  await ready(page, 'check')
  await page.reload()
  await ready(page, 'check')
  assert.equal(await page.locator('.total-price').innerText(), '$2000')
  assertions.push(
    'bank/store choice, all result paths, return/home links, card validation, focus, keyboard hints, responsive hint assets, no saved card data, refresh resets sample',
  )
  await page.emulateMedia({ reducedMotion: 'reduce' })
  assert.equal(
    await page
      .locator('.method-card')
      .first()
      .evaluate((el) => getComputedStyle(el).transitionDuration),
    '0s',
  )
  await page.keyboard.press('Tab')
  const focusStyle = await page.evaluate(
    () => getComputedStyle(document.activeElement).outlineStyle,
  )
  assert.equal(focusStyle, 'solid')
  assertions.push('reduced motion and visible keyboard focus')
  check('no runtime errors', () => assert.deepEqual(errors, []))
  check('no external requests or payment submission', () =>
    assert.deepEqual(externalRequests, []),
  )
  const result = {
    date: new Date().toISOString(),
    browser: await browser.version(),
    base,
    assertions,
    records,
    errors,
    externalRequests,
  }
  await writeFile(
    new URL('verification.json', evidence),
    JSON.stringify(result, null, 2),
  )
  console.log(
    `PASS: ${assertions.length} checks; ${records.length} route/viewport states; no runtime errors or external requests.`,
  )
} finally {
  await browser.close()
}
