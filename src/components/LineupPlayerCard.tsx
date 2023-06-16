import { LineupPlayer } from "types/gqlTypes"
import { removeUnderscore } from "utils/removeUnderscore"

interface LineupPlayerCardProps {
  lineupPlayer?: LineupPlayer
  spotInLineup?: number
}

export default function LineupPlayerCard(props: LineupPlayerCardProps) {
  if (!props.lineupPlayer) {
    return (
      <div>
        <span>{props.spotInLineup}</span>
      </div>
    )
  }
  return (
    <div className='capitalize flex justify-between bg-bb-black py-1 px-2 border-t border-b cursor-grab'>
      <div>
        <span className="mr-4">
          {props.spotInLineup}
        </span>
        {props.lineupPlayer.player.firstName} {props.lineupPlayer.player.lastName}
      </div>
      <span>
        {removeUnderscore(props.lineupPlayer.position)}
      </span>
    </div>
  )
}