
import { useState } from 'react'

interface Props {
  checkAuth: Function
}

export default function LogoutButton(props: Props) {
  const handleClick = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault()
    const response = await fetch("/api/logout", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
    })
    const data = await response.json()
    props.checkAuth()
  }

  return (
    <button onClick={handleClick}>
      Logout
    </button>
  )
}