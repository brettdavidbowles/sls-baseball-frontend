import { useRouter } from 'next/router'

export default function Game() {
  const router = useRouter()
  const { gid } = router.query

  return (
    <div>
      <h1>Game {gid}</h1>
    </div>
  )
}