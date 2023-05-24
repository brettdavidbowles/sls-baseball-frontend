import client from "apollo-client"
import { GetTeamsByUser } from "gql/queries/GetTeamsByUser.gql"
import { GetServerSidePropsContext } from "next"
import { Team } from "types/gqlTypes"

export default function Profile({ teams }: { teams: Team[] }) {
  return (
    <div>
      lksdjfs;aj
    </div>
  )
}

export async function getServerSideProps({ req }: GetServerSidePropsContext) {
  const cookie = req.headers.cookie
  const { data } = await client.query({
    query: GetTeamsByUser,
    context: {
      headers: {
        cookie
      }
    }
  })
  return {
    props: {
      teams: data.teamsByUser
    }
  }
}