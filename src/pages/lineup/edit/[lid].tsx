import { useRef, useEffect, useMemo, useState, use } from 'react';
import { useRouter } from 'next/router'
import client from "apollo-client"
import { useMutation } from "@apollo/client"
import { GetServerSidePropsContext } from "next"
import { GetLineupById } from 'gql/queries/GetLineupById.gql'
import { LineupPlayer, Team, Game, Player, User } from 'types/gqlTypes'
import { formatDateTime } from 'utils/formatDateTime'
import Sortable from 'sortablejs'
import LineupPlayerCard from '@/components/LineupPlayerCard';
import { UpdateLineup } from 'gql/mutations/UpdateLineup.gql'

interface EditLineupPageProps {
  team: Team
  opponent: Team
  players: LineupPlayer[]
  game: Game
  userId?: string
  bench: Player[]
}

export default function EditLineup(props: EditLineupPageProps) {
  const router = useRouter()
  const { lid } = router.query
  const lineup = useRef(null)
  const [lineupOrder, setLineupOrder] = useState<LineupPlayer[]>([...props.players.filter(player => player.position !== 'pitcher')])
  const [pitcher, setPitcher] = useState<LineupPlayer | undefined>(props.players.find(player => player.position === 'pitcher'))
  const [bench, setBench] = useState<Player[]>(props.bench)
  const [stagedSubstitute, setStagedSubstitute] = useState<LineupPlayer | undefined>()
  const [showStartingLineup, setShowStartingLineup] = useState(true)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const [lineupExpandedPlayerIndex, setLineupExpandedPlayerIndex] = useState<number | undefined>()
  const [benchExpandedPlayerIndex, setBenchExpandedPlayerIndex] = useState<number | undefined>()

  // TODO need to add redirect if logout

  useEffect(() => {
    if (!lineup.current) return
    const sortable = Sortable.create(lineup.current,
      {
        onEnd: function (ev: Sortable.SortableEvent) {
          setLineupExpandedPlayerIndex(undefined)
          if (ev.newIndex === ev.oldIndex || !ev?.newIndex || !ev.oldIndex) return
          const newIndex = ev.newIndex
          const oldIndex = ev.oldIndex
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

  useEffect(() => {
    if (stagedSubstitute) {
      setShowStartingLineup(false)
    } else {
      setShowStartingLineup(true)
    }
  }, [stagedSubstitute])

  const [updateLineup, { data }] = useMutation(UpdateLineup)
  const saveLienup = () => {
    if (!pitcher) return // need to handle this
    const players = lineupOrder.map(({ player, position }, index) => ({
      id: player.id,
      position,
      battingOrderNumber: index + 1
    }))
    players.unshift({
      id: pitcher.player.id,
      position: 'pitcher',
      battingOrderNumber: 0
    })
    updateLineup({
      variables: {
        id: lid,
        players: players
      }
      // change this to update cache maybe? might not matter because it's network only
      // needs error handling
    })
  }
  const saveLineupOnClick = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault()
    saveLienup()
  }

  const substitutePlayer = (substitute: Player) => {
    if (pitcher && stagedSubstitute === pitcher) {
      setPitcher({
        id: pitcher.id,
        player: substitute,
        position: 'pitcher',
        battingOrderNumber: 0
      })
    } else {
      setLineupOrder(lineupOrder.map(lineupPlayer => {
        if (lineupPlayer === stagedSubstitute) {
          return {
            id: lineupPlayer.id,
            player: substitute,
            position: lineupPlayer.position,
            battingOrderNumber: lineupPlayer.battingOrderNumber
          }
        } else {
          return lineupPlayer
        }
      }))
    }
    setBench(bench.map(player => {
      if (player === substitute && stagedSubstitute) {
        return stagedSubstitute.player
      } else {
        return player
      }
    }))
    setStagedSubstitute(undefined)
  }

  const successMessage = () => {
    if (!showSuccessMessage) return
    return (
      <span>
        Lineup Saved! (I know this should be a toast you don&apos;t know my life)
      </span>
    )
  }
  useEffect(() => {
    if (data) {
      setShowSuccessMessage(true)
      setTimeout(() => {
        setShowSuccessMessage(false)
      }, 3500)
    }
  }, [data])

  return (
    <div className='flex flex-col h-full justify-between overscroll-none'>
      <h1>Edit {props.team.name} Lineup</h1>
      <h2>for game on {formatDateTime(props.game.dateTime).date} against {props.opponent.name}</h2>
      <div className="w-full block md:hidden py-4 text-lg">
        <button
          className={`w-1/2 ${showStartingLineup ? 'border-b' : 'border-0'}`}
          onClick={() => setShowStartingLineup(true)}
        >
          Starting Lineup
        </button>
        <button
          className={`w-1/2 ${showStartingLineup ? 'border-0' : 'border-b'}`}
          onClick={() => setShowStartingLineup(false)}
        >
          Bench
        </button>
      </div>
      <div>
        <div className='static flex justify-between w-full h-full'>
          <div className={`static h-full left-0 transition-all transition-1000 ${showStartingLineup ? 'visible w-full' : 'invisible w-0'} md:visible md:w-1/2`}>
            <h2 className="hidden md:block my-4 text-lg">
              Starting Lineup
            </h2>
            <ul className="overflow-hidden overflow-y-auto h-[30rem] px-4 py-8">
              <div ref={lineup}>
                {lineupOrder.map((lineupPlayer, index) => (
                  <li key={lineupPlayer.player.id}>
                    <LineupPlayerCard
                      spotInOrder={index + 1}
                      lineupPlayer={lineupPlayer}
                      showSubButton={stagedSubstitute === lineupPlayer || !stagedSubstitute}
                      showCancelSubButton={stagedSubstitute === lineupPlayer}
                      setStagedSubstitute={setStagedSubstitute}
                      setExpandedPlayerIndex={setLineupExpandedPlayerIndex}
                      expandedPlayerIndex={lineupExpandedPlayerIndex}
                      isLineup
                    />
                  </li>
                ))}
              </div>
              <li className="my-4">
                <LineupPlayerCard
                  spotInOrder={0}
                  lineupPlayer={pitcher}
                  showSubButton={stagedSubstitute === pitcher || !stagedSubstitute}
                  showCancelSubButton={stagedSubstitute === pitcher}
                  setStagedSubstitute={setStagedSubstitute}
                  setExpandedPlayerIndex={setLineupExpandedPlayerIndex}
                  expandedPlayerIndex={lineupExpandedPlayerIndex}
                />
              </li>
            </ul>
          </div>
          <div className={`absolute md:static right-0 transition-all transition-1000 ${showStartingLineup ? 'invisible w-0' : 'w-full visible'} md:visible md:w-1/2`}>
            <h2 className="hidden md:block my-4 text-right text-lg">Bench</h2>
            <ul className="overflow-hidden overflow-y-auto h-[30rem] px-4 py-8">
              {bench.map((player, index) => (
                <li key={player.id}>
                  <LineupPlayerCard
                    spotInOrder={index}
                    player={player}
                    showSubButton={!!stagedSubstitute}
                    substitutePlayer={substitutePlayer}
                    expandedPlayerIndex={benchExpandedPlayerIndex}
                    setExpandedPlayerIndex={setBenchExpandedPlayerIndex}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className='absolute bottom-0 left-0 w-full md:w-1/2 px-4'>
        <button
          onClick={saveLineupOnClick}
          className={`${!showStartingLineup ? 'hidden md:block' : 'block'} w-full my-8 text-center bg-bb-black py-2 rounded-lg text-bb-peach font-bold hover:bg-bb-peach hover:text-bb-black border`}
        >
          {/* should probably put disabled state and some kind of debounce */}
          Save Lineup
        </button>
        {successMessage()}
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
  if (!data.lineupById?.team?.managers?.some(({ user }: { user: User }) => user.id === data.auth?.id)) {
    return {
      redirect: {
        destination: '/login'
      }
    }
  }
  return {
    props: {
      userId: data.auth.id || null,
      ...data.lineupById,
      bench: data.benchByLineupId
    }
  }
}
