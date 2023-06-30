import client from "apollo-client"
import { GetProfileData } from "gql/queries/GetProfileData.gql"
import { GetServerSidePropsContext } from "next"
import { Team, Game } from "types/gqlTypes"
import Link from "next/link"
import { formatDateTime } from "utils/formatDateTime"

export default function Profile({ teams, userId, username, games }: { teams: Team[], userId: number, username: string, games: Game[] }) {
  console.log(games)
  return (
    <div>
      <h1 className="capitalize">{username}&apos;s Profile</h1>
      <h2 className="py-4 text-xl">Teams</h2>
      <div className="flex flex-col">
        {teams.map(team => (
          <Link href={`team/${team.id}`} key={team.id}>{team.name}</Link>
        ))}
      </div>
      <h2 className="py-4 text-xl">Games</h2>
      <div className="flex flex-col">
        {games.map(game => (
          <Link href={`game/${game.id}`} key={game.id}>
            {game.awayTeam.name} at {game.homeTeam.name} on {formatDateTime(game.dateTime)}
          </Link>
        ))}
      </div>
    </div>
  )
}

export async function getServerSideProps({ req }: GetServerSidePropsContext) {
  const cookie = req.headers.cookie
  const { data } = await client.query({
    query: GetProfileData,
    fetchPolicy: 'network-only',
    context: {
      headers: {
        cookie
      }
    }
  })
  if (!data.auth.id) {
    return {
      redirect: {
        destination: '/login',
      }
    }
  }
  return {
    props: {
      teams: data.teamsByUser,
      userId: data.auth.id,
      username: data.auth.username,
      games: data.gamesByUser
    }
  }
}