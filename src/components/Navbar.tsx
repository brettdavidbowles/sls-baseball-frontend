import Link from "next/link"
import { useRouter } from 'next/router'
import LogoutButton from "./LogoutButton"
import { GetLoginState } from "gql/queries/GetLoginState.gql"
import client from "apollo-client"
import { useQuery } from "@apollo/client"
import { data } from "autoprefixer"

// interface data {
//   id: number,
//   username: string,
//   email: string
// }

export default function Navbar({ id, username, email }: { id: number, username: string, email: string }) {
  // export default function Navbar() {
  // const { data } = useQuery(GetLoginState)
  const router = useRouter()
  console.log(id, username, email)
  const loginOrLogout = () => {
    if (router.route === '/login' && id) return (
      <div>
        <Link href="/"
          className="text-left w-full"
        >
          Home
        </Link>
        <LogoutButton />
      </div>
    )
    if (router.route === '/login' && !id) return (
      <Link href="/"
        className="text-left w-full"
      >
        Home
      </Link>
    )
    return (
      <div>
        <Link href="/"
          className="text-left w-full"
        >
          Home
        </Link>
        <Link
          href="/login"
          className="text-right w-full"
        >
          Login
        </Link>
      </div>
    )
  }
  const idElement = () => {
    return (
      <div>
        {id}
      </div>
    )
  }

  return (
    <div className="relative h-8">
      {idElement()}
      <div className="fixed flex justify-end bg-green-700 w-full z-50 py-1 px-4 h-8">
        {loginOrLogout()}
      </div>
    </div>
  )
}
export async function getServerSideProps(context: any) {
  const { data } = await client.query({
    query: GetLoginState,
    context: {
      headers: {
        cookie: context.req.headers.cookie
      }
    }
  })
  return {
    props: {
      id: data?.id || null,
      username: data?.username || '',
      email: data?.email || ''
    }
  }
}
