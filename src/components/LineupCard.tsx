import { Lineup, LineupPlayer } from "types/gqlTypes"
import Link from 'next/link'

interface LineupCardProps {
  lineup: Lineup
  userId: string
}

const removeUnderscore = (str: string) => str.replace(/_/g, ' ')


export default function LineupCard(props: LineupCardProps) {
  const editLink = () => {
    if (props.lineup.team.managers.some(({ id }) => id === props.userId)) {
      return (
        <Link href={`/lineup/edit/${props.lineup.id}`}>
          <span className="hover:text-bb-tan font-bold">(Edit)</span>
        </Link>
      )
    }
  }
  return (
    <div className='w-full px-4'>
      <h2 className='py-4'>
        <Link
          key={props.lineup.team.id}
          href={`/team/${props.lineup.team.id}`}
          className="hover:text-bb-tan"
        >{props.lineup.team.name}
        </Link>
        &nbsp;Lineup {editLink()}:
      </h2>
      {
        props.lineup.players.slice(1).map((lineupPlayer: LineupPlayer) => (
          <div
            key={lineupPlayer.id}
            className='flex justify-between capitalize'
          >
            <div className="w-1/8 text-left">{lineupPlayer.battingOrderNumber}</div>
            <Link
              className="hover:text-bb-tan"
              key={lineupPlayer.player.id}
              href={`/player/${lineupPlayer.player.id}`}
            >
              {`${lineupPlayer.player.firstName} ${lineupPlayer.player.lastName}`}
            </Link>
            <div className="w-1/4 text-left">{removeUnderscore(lineupPlayer.position)}</div>
          </div>
        ))
      }
      <div className="border-b-2 border-gray-400 m-2" />
      <div className='flex justify-between capitalize'>
        <div className="w-1/8 text-left"></div>
        <Link
          className="hover:text-bb-tan"
          key={props.lineup.players[0].player.id}
          href={`/player/${props.lineup.players[0].player.id}`}
        >
          {`${props.lineup.players[0].player.firstName} ${props.lineup.players[0].player.lastName}`}
        </Link>
        <div className="w-1/4 text-left">Pitcher</div>
      </div>
    </div >
  )
}