import { expect, it } from 'vitest'

it('returns the default logged-out response from the mocked API', async () => {
  const response = await fetch('http://localhost:3000/api/v1/logged_in')

  expect(response.status).toBe(200)
  await expect(response.json()).resolves.toEqual({ logged_in: false })
})
