import { useRef, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router'
import client from "apollo-client"
import { GetServerSidePropsContext } from "next"
import { GetLineupById } from 'gql/queries/GetLineupById.gql'
import { LineupPlayer, Team, Game } from 'types/gqlTypes'
import { formatDateTime } from 'utils/formatDateTime'
import Sortable from 'sortablejs'
import LineupPlayerCard from '@/components/LineupPlayerCard';

interface EditLineupPageProps {
  team: Team
  opponent: Team
  players: LineupPlayer[]
  game: Game
}

export default function EditLineup(props: EditLineupPageProps) {
  const router = useRouter()
  const { lid } = router.query
  const lineup = useRef(null)
  const [lineupOrder, setLineupOrder] = useState<LineupPlayer[]>([...props.players.filter(player => player.position !== 'pitcher')])
  useEffect(() => {
    const sortable = Sortable.create(lineup.current,
      {
        onEnd: ({ newIndex, oldIndex }: { newIndex: number, oldIndex: number }) => {
          if (newIndex === oldIndex) return
          const newOrder = lineupOrder.map((player, index) => {
            if (newIndex > oldIndex) {
              if (index === oldIndex) {
                return lineupOrder[oldIndex + 1]
              } else if (index === newIndex) {
                return lineupOrder[oldIndex]
              } else if (index > oldIndex && index <= newIndex) {
                return lineupOrder[index + 1]
              } else {
                return player
              }
            } else {
              if (index === oldIndex) {
                return lineupOrder[oldIndex - 1]
              } else if (index === newIndex) {
                return lineupOrder[oldIndex]
              } else if (index < oldIndex && index >= newIndex) {
                return lineupOrder[index - 1]
              } else {
                return player
              }
            }
          })
          setLineupOrder(newOrder)
        }
      })
    return () => sortable.destroy()
  })
  const pitcher = useMemo(() => {
    // need constants
    return props.players.find(player => player.position === 'pitcher')
  }, [props.players])

  return (
    <div>
      <h1>Edit {props.team.name} Lineup</h1>
      <h2>for game on {formatDateTime(props.game.dateTime, true)} against {props.opponent.name}</h2>
      <ul ref={lineup}>
        {lineupOrder.map((lineupPlayer, index) => (
          <li key={lineupPlayer.player.id}>
            <LineupPlayerCard
              spotInLineup={index + 1}
              lineupPlayer={lineupPlayer}
            />
          </li>
        ))}
      </ul>
      <div className="my-4">
        <LineupPlayerCard lineupPlayer={pitcher} />
      </div>

    </div>
  )
}

export async function getServerSideProps({ query, req }: GetServerSidePropsContext) {
  const cookie = req.headers.cookie
  const { data } = await client.query({
    query: GetLineupById,
    variables: {
      id: query.lid
    },
    fetchPolicy: 'network-only',
    context: {
      headers: {
        cookie
      }
    }
  })
  return {
    props: {
      ...data.lineupById,
      // userId: data.auth.id || null
    }
  }
}
