import Head from 'next/head'
import Link from 'next/link'
import Leagues from '@/components/Leagues'
import { League } from "types/gqlTypes"
import client from "apollo-client"
import { GetLeagues } from "gql/queries/GetLeagues.gql"


export default function Home({ leagues }: { leagues: League[] }) {
  return (
    <>
      <Head>
        <title>Solana League Baseball</title>
        <meta name="description" content="interactive baseball simulator" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className='w-full text-center'>
          <h1 className='py-4'>Solana League Baseball</h1>
          <p>An interactive baseball simulator.</p>
          <ul className='py-8'>
            {/* <li className='py-4'>
              <Link href='leagues'>Leagues</Link>
            </li> */}
            <li className='py-4'>
              <Link href='login'>Login</Link>
            </li>
          </ul>
          <Leagues leagues={leagues} />
        </div>
      </main>
    </>
  )
}

export async function getServerSideProps() {
  const { data } = await client.query({
    query: GetLeagues,
  })
  return {
    props: {
      leagues: data.leagues,
    }
  }
}