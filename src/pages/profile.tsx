import client from "apollo-client"
import { GetProfileData } from "gql/queries/GetProfileData.gql"
import { GetServerSidePropsContext } from "next"
import { Team, UserGame } from "types/gqlTypes"
import Link from "next/link"
import { formatDateTime } from "utils/formatDateTime"
import ProfileGame from "@/components/ProfileGame"

export default function Profile({ teams, userId, username, games }: { teams: Team[], userId: number, username: string, games: UserGame[] }) {
  return (
    <div>
      <h1 className="capitalize">{username}&apos;s Profile</h1>
      <h2 className="py-2 underline text-xl">Teams</h2>
      <div className="flex flex-col">
        {teams.map(team => (
          <Link href={`team/${team.id}`} key={team.id}>{team.name}</Link>
        ))}
      </div>
      <div className="py-4">
        <h2 className="py-2 underline text-xl">Games</h2>
        <div className="flex flex-col">
          {games.map(game => (
            <ProfileGame game={game} key={game.id} />
          ))}
        </div>
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