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
  // const csrf = cookie?.split(';').find(item => item.substring(0, 4) === 'csrf')?.substring(10)
  // const response = await fetch('http://localhost:8000/graphql/', {
  const response = await fetch('https://baseballsimulator.online/graphql/', {
    method: 'POST',
    headers: <HeadersInit | undefined>{
      'Accept': 'application/json',
      'cookie': cookie,
      // 'X-CSRFToken': csrf
    },
    credentials: 'include',
    body: query
  })
  const readableResponse = await response.json()
  res.status(200).json(readableResponse)
}