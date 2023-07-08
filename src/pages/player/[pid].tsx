import { GetPlayerById } from 'gql/queries/GetPlayerById.gql'
import client from 'apollo-client'
import { useMemo } from 'react'

export default function Player({ player }: { player: any }) {
  const playerAttributes = useMemo(() => {
    return Object.keys(player.attributes)
      .filter(attr => attr !== '__typename')
      .map(attr => ({
        name: attr,
        value: player.attributes[attr]
      }))
  }, [player])
  return (
    <div className="capitalize">
      <h1>{player.firstName} {player.lastName}</h1>
      <h2>{player.team.name}</h2>
      <div className="flex flex-col">
        {playerAttributes.map(({ name, value }) => (
          <div key={name}>{name}: {value}</div>
        ))}
      </div>
    </div>
  )
}

export async function getServerSideProps({ query }: { query: { pid: string } }) {
  const { data } = await client.query({
    query: GetPlayerById,
    variables: {
      id: query.pid
    }
  })
  return {
    props: {
      player: data.playerById
    }
  }
}