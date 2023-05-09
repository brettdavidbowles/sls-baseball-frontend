import Link from "next/link"
import { useRouter } from 'next/router'
import LogoutButton from "./LogoutButton"
import { useEffect, useState } from "react"

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
  const checkAuth = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth`, {
      method: "GET"
    })
    const { data } = await response.json()
    setIsLoggedIn(!!data?.auth?.id)
  }
  useEffect(() => {
    checkAuth()
  }, [])
  const router = useRouter()
  const loginUrl = process.env.NEXT_PUBLIC_ENV === 'development' ? 'http://localhost:8000/login/' : `${process.env.NEXT_PUBLIC_BASE_URL}/login/`
  const content = () => {
    if (isLoggedIn) {
      return (
        <div className="flex justify-end w-full">
          <Link href="/"
            className="text-left w-full"
          >
            Home
          </Link>
          <LogoutButton checkAuth={checkAuth} />
        </div>
      )
    } else {
      return (
        <div className="flex justify-end w-full">
          <Link href="/"
            className="text-left w-full"
          >
            Home
          </Link>
          <a
            href={loginUrl}
            className="text-right w-full"
          >
            Login
          </a>
        </div>
      )
    }
  }

  return (
    <div className="relative h-8">
      <div className="fixed flex justify-end bg-green-700 w-full z-50 py-1 px-4 h-8">
        {content()}
      </div>
    </div>
  )
}
