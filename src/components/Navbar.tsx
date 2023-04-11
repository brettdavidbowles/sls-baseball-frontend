import Link from "next/link"
import { useRouter } from 'next/router'
import LogoutButton from "./LogoutButton"
// import { GetLoginState } from "gql/queries/GetLoginState.gql"
import { GetHomePage } from "gql/queries/GetHomePage.gql"
import client from "apollo-client"
import { useQuery } from "@apollo/client"
import { data } from "autoprefixer"


// ***** will have to fix this up with props
export default function Navbar({ id, username, email }: { id: number, username: string, email: string }) {
  // export default function Navbar({ cookie }: { cookie: string }) {

  // export default function Navbar() {
  // const { data } = useQuery(GetLoginState)
  const router = useRouter()
  console.log(id, username, email)
  // console.log('data', data)
  // console.log('cookie', cookie)
  // const loginOrLogout = () => {
  //   if (router.route === '/login' && id) return (
  //     <div>
  //       <Link href="/"
  //         className="text-left w-full"
  //       >
  //         Home
  //       </Link>
  //       <LogoutButton />
  //     </div>
  //   )
  //   if (router.route === '/login' && !id) return (
  //     <Link href="/"
  //       className="text-left w-full"
  //     >
  //       Home
  //     </Link>
  //   )
  //   return (
  //     <div>
  //       <Link href="/"
  //         className="text-left w-full"
  //       >
  //         Home
  //       </Link>
  //       <Link
  //         href="/login"
  //         className="text-right w-full"
  //       >
  //         Login
  //       </Link>
  //     </div>
  //   )
  // }
  // const idElement = () => {
  //   return (
  //     <div>
  //       {id}
  //     </div>
  //   )
  // }

  return (
    <div className="relative h-8">
      {/* {idElement()} */} commmonnn
      <div className="fixed flex justify-end bg-green-700 w-full z-50 py-1 px-4 h-8">
        {/* {loginOrLogout()} */}
      </div>
    </div>
  )
}
export async function getServerSideProps(context: any) {
  // console.log('context', context)
  // const csrfcookie = context.req.cookies.split('csrftoken=')[1] || ''
  // const { data } = await client.query({
  //   query: GetLoginState,
  //   context: {
  //     headers: {
  //       // 'Access-Control-Allow-Credentials': 'true',
  //       cookie: context.req.cookies
  //     }
  //   }
  // })
  const { data } = await client.query({
    query: GetHomePage
  })
  return {
    props: {
      // id: data?.me?.id || 'sldfjsl;j',
      // username: data?.me?.username || '',
      // email: data?.me?.email || 'asdkajh'

      id: data.leagues,
      username: data.upcomingGames,
      email: data.recentGames

    }
  }
}
