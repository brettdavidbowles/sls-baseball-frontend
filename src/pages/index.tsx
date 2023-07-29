import Head from 'next/head'
import Link from 'next/link'
import { Game, Season, TeamRanking } from "types/gqlTypes"
import client from "apollo-client"
import { GetHomePage } from "gql/queries/GetHomePage.gql"
import Games from '@/components/Games'
import TeamRankings from '@/components/TeamRankings'


export default function Home({ upcomingGames, recentGames, seasons }: { upcomingGames: Game[], recentGames: Game[], seasons: Season[] }) {
  return (
    <>
      <Head>
        <title>Baseball Simulator</title>
        <meta name="description" content="interactive baseball simulator" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className='w-full text-center pt-24'>
          <p className="max-w-md w-full m-auto py-8">Due to a bug in the Simulator, some games were finishing as ties (which is impossible in baseball). These games have been deleted and rescheduled for 7-30.</p>
          {seasons.map((season: Season) => (
            <TeamRankings
              key={season.id}
              season={season}
            />
          ))
          }
          <Games
            games={upcomingGames}
            title='Upcoming Games'
          />
          <Games
            games={recentGames}
            title='Recent Games'
          />
        </div>
      </main>
    </>
  )
}

export async function getServerSideProps() {
  const { data } = await client.query({
    query: GetHomePage,
    fetchPolicy: 'network-only'
  })
  return {
    props: {
      // leagues: data.leagues,
      upcomingGames: data.upcomingGames,
      recentGames: data.recentGames,
      seasons: data.seasons
    }
  }
}