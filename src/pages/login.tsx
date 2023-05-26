import { useRef, useState } from "react"
import { useMutation } from "@apollo/client"
import { LoginMutation } from "gql/mutations/Login.gql"
import { useRouter } from "next/router"

export default function Login() {
  const usernameRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const [showError, setShowError] = useState(false)

  const router = useRouter()

  const [login] = useMutation(LoginMutation)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const username = usernameRef.current?.value
    const password = passwordRef.current?.value
    const { data } = await login({ variables: { username, password } })
    if (data.login.id) {
      router.push('/profile')
    } else {
      setShowError(true)
    }
  }
  return (
    <div className="h-full">
      <form
        className="flex flex-col p-8"
        onSubmit={handleSubmit}
      >
        <label htmlFor="username">Username</label>
        <input
          type="text" name="username" id="username"
          ref={usernameRef}
          className="bg-bb-black px-2 rounded border border-white"
        />
        <label
          htmlFor="password"
          className="mt-4"
        >
          Password
        </label>
        <input
          type="password" name="password" id="password"
          ref={passwordRef}
          className="bg-bb-black px-2 rounded border border-white"
        />
        <button type="submit">Login</button>
      </form>
      {showError && <p className="p-8">Invalid username or password</p>}
    </div>
  )
}