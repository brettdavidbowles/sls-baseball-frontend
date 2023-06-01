import client from "apollo-client"
import { GetTeamsByUser } from "gql/queries/GetTeamsByUser.gql"
import { GetServerSidePropsContext } from "next"
import { Team } from "types/gqlTypes"
import Link from "next/link"

export default function Profile({ teams, userId, username }: { teams: Team[], userId: number, username: string }) {
  return (
    <div>
      <h1>Profile</h1>
      <h2 className="py-4 text-xl">Teams</h2>
      <div className="flex flex-col">
        {teams.map(team => (
          <Link href={`team/${team.id}`} key={team.id}>{team.name}</Link>
        ))}
      </div>
    </div>
  )
}

export async function getServerSideProps({ req }: GetServerSidePropsContext) {
  const cookie = req.headers.cookie
  const { data } = await client.query({
    query: GetTeamsByUser,
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
      username: data.auth.username
    }
  }
}