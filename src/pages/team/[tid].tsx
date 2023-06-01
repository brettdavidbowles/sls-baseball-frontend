import { GetTeamById } from 'gql/queries/GetTeamById.gql'
import client from 'apollo-client'
import { GetServerSidePropsContext } from "next"
import Link from 'next/link'

interface Props {
  team: any
  userId: any
}

export default function Team({ team, userId }: Props) {
  return (
    <div>
      <h1>{team.name}</h1>
      <div className="flex flex-col capitalize">
        {team.players.map((player: any) => (
          <Link href={`/player/${player.id}`} key={player.id}>{player.firstName} {player.lastName}</Link>
        ))}
      </div>
    </div >
  )
}


export async function getServerSideProps({ req, query }: GetServerSidePropsContext) {
  const cookie = req.headers.cookie
  const { data } = await client.query({
    query: GetTeamById,
    fetchPolicy: 'network-only',
    context: {
      headers: {
        cookie
      }
    },
    variables: {
      id: query.tid
    }
  })
  return {
    props: {
      team: data.teamById,
      userId: data.auth.id
    }
  }
}