import Link from "next/link"
import { useRouter } from 'next/router'

export default function Navbar() {
  const router = useRouter()

  const loginOrHomeButton = () => {
    if (router.route === '/login') return (
      <Link href="/"
        className="text-left w-full"
      >
        Home
      </Link>
    )
    return (
      <Link
        href="/login"
        className="text-right w-full"
      >
        Login
      </Link>
    )
  }

  return (
    <div className="relative h-8">
      <div className="fixed flex justify-end bg-green-700 w-full z-50 py-1 px-4 h-8">
        {loginOrHomeButton()}
      </div>
    </div>
  )
}