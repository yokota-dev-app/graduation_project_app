import { http, HttpResponse } from 'msw'

export const handlers = [
  http.get('http://localhost:3000/api/v1/logged_in', () =>
    HttpResponse.json({ logged_in: false }),
  ),
]
