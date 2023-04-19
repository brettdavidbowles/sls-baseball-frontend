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
  const cookie = req.headers.cookie
  const response = await fetch('http://localhost:8000/graphql/', {
    method: 'POST',
    headers: <HeadersInit | undefined>{
      'cookie': cookie
    },
    body: query
  })
  const readableResponse = await response.json()
  res.status(200).json(readableResponse)
}