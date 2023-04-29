import type { NextApiRequest, NextApiResponse } from 'next'
interface responseData {
  success: boolean
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<responseData>
) {
  const query = JSON.stringify({
    query: `mutation {
      logout
    }`
  })
  const cookie = req.headers.cookie
  // const response = await fetch('http://localhost:8000/graphql/', {
  const response = await fetch('https://api.baseballsimulator.online/graphql/', {
    method: 'POST',
    headers: <HeadersInit | undefined>{
      'cookie': cookie
    },
    body: query
  })
  const readableResponse = await response.json()
  res.status(200).json({ success: readableResponse?.data?.logout || false })
}