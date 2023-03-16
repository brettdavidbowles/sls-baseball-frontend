import { Lineup, LineupPlayer } from "types/gqlTypes"

interface LineupCardProps {
  lineup: Lineup
}

const removeUnderscore = (str: string) => str.replace(/_/g, ' ')

export default function LineupCard(props: LineupCardProps) {
  return (
    <div className='w-full px-4'>
      <h2 className='py-4'>{props.lineup.team.name} Lineup:</h2>
      {
        props.lineup.players.slice(1).map((lineupPlayer: LineupPlayer) => (
          <div
            key={lineupPlayer.id}
            className='flex justify-between capitalize'
          >
            <div className="w-1/8 text-left">{lineupPlayer.battingOrderNumber}</div>
            <div>{`${lineupPlayer.player.firstName} ${lineupPlayer.player.lastName}`}</div>
            <div className="w-1/4 text-left">{removeUnderscore(lineupPlayer.position)}</div>
          </div>
        ))
      }
      <div className="border-b-2 border-gray-400 m-2" />
      <div className='flex justify-between capitalize'>
        <div className="w-1/8 text-left"></div>
        <div>{`${props.lineup.players[0].player.firstName} ${props.lineup.players[0].player.lastName}`}</div>
        <div className="w-1/4 text-left">Pitcher</div>
      </div>
    </div >
  )
}