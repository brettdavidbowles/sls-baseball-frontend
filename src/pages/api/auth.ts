import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const query = JSON.stringify({
    query: `query {
      auth {
        id
        username
        email
      }
    }`
  })
  const apiUrl = process?.env?.NEXT_PUBLIC_API_URL || ''
  const cookie = req.headers.cookie
  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: <HeadersInit | undefined>{
      'Accept': 'application/json',
      'cookie': cookie,
    },
    credentials: 'include',
    body: query
  })
  const readableResponse = await response.json()
  res.status(200).json(readableResponse)
}