import { useRef, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router'
import client from "apollo-client"
import { useMutation } from "@apollo/client"
import { GetServerSidePropsContext } from "next"
import { GetLineupById } from 'gql/queries/GetLineupById.gql'
import { LineupPlayer, Team, Game } from 'types/gqlTypes'
import { formatDateTime } from 'utils/formatDateTime'
import Sortable from 'sortablejs'
import LineupPlayerCard from '@/components/LineupPlayerCard';
import { UpdateLineup } from 'gql/mutations/UpdateLineup.gql'

interface EditLineupPageProps {
  team: Team
  opponent: Team
  players: LineupPlayer[]
  game: Game
}

export default function EditLineup(props: EditLineupPageProps) {
  console.log(props)
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
  const [updateLineup, { data }] = useMutation(UpdateLineup)
  const saveLienup = () => {
    const players = lineupOrder.map(({ player, position }, index) => ({
      id: player.id,
      position,
      battingOrderNumber: index + 1
    }))
    console.log(players)
    //   updateLineup({
    //     variables: {
    //       id: lid,
    //       players:
  }
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault()
    saveLienup()
  }

  return (
    <div>
      <h1>Edit {props.team.name} Lineup</h1>
      <h2>for game on {formatDateTime(props.game.dateTime, true)} against {props.opponent.name}</h2>
      <div className='max-w-lg'>
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
      <button onClick={handleClick}>
        Save Lineup
      </button>
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
