import type { NextApiRequest, NextApiResponse } from 'next'
type Data = {
  success: boolean
}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const query = JSON.stringify({
    query: `mutation {
      logout
    }`
  })
  const cookie = req.headers.cookie
  const response = await fetch('http://localhost:8000/graphql/', {
    method: 'POST',
    headers: <any>{
      'cookie': cookie
    },
    body: query
  })
  const readableResponse = await response.json()
  res.status(200).json({ success: readableResponse?.data?.logout || false })
}