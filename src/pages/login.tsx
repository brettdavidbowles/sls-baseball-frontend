import { useRef } from "react"
import { useMutation } from "@apollo/client"
import { LoginMutation } from "gql/mutations/Login.gql"
import client from "apollo-client"
import { GetLoginState } from "gql/queries/GetLoginState.gql"


export default function Login({ id, username, email }: { id: number, username: string, email: string }) {
  const usernameRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const [login, { data }] = useMutation(LoginMutation)
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const username = usernameRef.current?.value
    const password = passwordRef.current?.value
    login({ variables: { username, password } })
  }
  console.log('wtf', id, username, email)
  if (id && typeof window !== 'undefined') {
    const now = new Date()
    const item = {
      id: id,
      expiry: now.getTime() + 1000 * 60 * 60 * 24 * 7
    }
    localStorage.setItem('auth', JSON.stringify(item))
  }
  return (
    <div className="h-full bg-green-700">
      <form
        className="flex flex-col bg-green-700 p-8 items-center"
        onSubmit={handleSubmit}
      >
        <label htmlFor="username">Username</label>
        <input
          type="text" name="username" id="username"
          ref={usernameRef}
          className="bg-black rounded border border-white w-full md:w-1/2"
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
          className="bg-black rounded border border-white w-full md:w-1/2"
        />
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export async function getServerSideProps(context: any) {
  const cookie = context.req.headers.cookie
  const { data } = await client.query({
    query: GetLoginState,
    context: {
      headers: {
        cookie: cookie
      }
    }
  })
  return {
    props: {
      id: data?.auth?.id || '',
      username: data?.auth?.username || '',
      email: data?.auth?.email || ''
    }
  }
}
