// @ts-check
import { test, expect } from '@playwright/test'
const { beforeEach, describe } = test;

describe('Notes app', () => {
  beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173')
  })

  test('front page can be opened', async ({ page }) => {

    const locator = page.getByText('Notes')
    await expect(locator).toBeVisible()
    await expect(page.getByText('Note app, Department of Computer Science, University of Helsinki 2025'))
      .toBeVisible()
  })

  test('user can log in', async ({ page }) => {
    await page.getByRole('button', { name: 'login' }).click()
    await page.getByLabel('username').fill('gamer')
    await page.getByLabel('password').fill('gaming')

    await page.getByRole('button', { name: 'login' }).click()

    const userInfo = await page.getByText('Pro Gamer logged in')
    await expect(userInfo).toBeVisible()
  })
})