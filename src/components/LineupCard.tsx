import { Lineup, LineupPlayer } from "types/gqlTypes"

interface LineupCardProps {
  lineup: Lineup
}

const removeUnderscore = (str: string) => str.replace(/_/g, ' ')

export default function LineupCard(props: LineupCardProps) {
  console.log('lineup', props.lineup)
  return (
    <div className='w-full bg-green-50'>
      <h1 className='py-4'>{props.lineup.team.name}</h1>
      {props.lineup.players.map((lineupPlayer: LineupPlayer) => (
        <div
          key={lineupPlayer.id}
          className='flex justify-between capitalize'
        >
          <div className="w-1/8 text-left">{lineupPlayer.battingOrderNumber}</div>
          <div>{`${lineupPlayer.player.firstName} ${lineupPlayer.player.lastName}`}</div>
          <div className="w-1/4 text-left">{removeUnderscore(lineupPlayer.position)}</div>
        </div>
      ))}
      {/* <ul>
        {lineup.players.map((player: Player) => (
          <li key={player.id}>
            {`${player.firstName} ${player.lastName}`}
          </li>
        ))}
      </ul> */}
    </div>
  )
}