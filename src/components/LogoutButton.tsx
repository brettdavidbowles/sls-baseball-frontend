import { LogoutMutation } from 'gql/mutations/Logout.gql'
import { useMutation } from "@apollo/client"
import { useState } from 'react'

export default function LogoutButton() {
  const [logout, { data }] = useMutation(LogoutMutation)
  const [isLoggedIn, setIsLoggedIn] = useState({})
  const handleClick = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault()
    // const loginStatus = await logout()

    const response = await fetch("/api/logout", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
    })
    const data = await response.json()
    console.log(data)
    setIsLoggedIn(response)
    console.log(isLoggedIn)
  }

  return (
    <button onClick={handleClick}>
      Logout
    </button>
  )
}