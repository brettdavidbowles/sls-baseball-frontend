import client from "apollo-client"
import { GetTeamsByUser } from "gql/queries/GetTeamsByUser.gql"
import { GetServerSidePropsContext } from "next"
import { Team } from "types/gqlTypes"

export default function Profile({ teams, userId, username }: { teams: Team[], userId: number, username: string }) {
  return (
    <div>
      profile coming, hang tight {username}
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