import { LineupPlayer } from "types/gqlTypes"
import { removeUnderscore } from "utils/removeUnderscore"
import Chevron from "./ImageComponents/chevron"
import { useState, useMemo } from 'react'

interface LineupPlayerCardProps {
  lineupPlayer: LineupPlayer
  spotInLineup: number
}

export default function LineupPlayerCard(props: LineupPlayerCardProps) {
  const [expanded, setExpanded] = useState(false)
  console.log(props.lineupPlayer)
  const handleClick = () => {
    setExpanded(!expanded)
    console.log('okokoko')
  }

  const filteredAttributeObject = useMemo(() => {
    return Object.fromEntries(
      Object.entries(props.lineupPlayer.player.attributes)
        .filter(([key]) => !key.includes("__typename"))
    )
  }, [props.lineupPlayer.player.attributes])

  return (
    <div className="bg-bb-black border-t border-b">
      <div className="w-full flex justify-between space-x-3">
        <div className="capitalize flex justify-between w-full py-1 px-2 cursor-grab mr-4">
          <div className="flex">
            <div className="mr-4">
              {props.spotInLineup}
            </div>
            <div>
              {`${props.lineupPlayer.player.firstName} ${props.lineupPlayer.player.lastName}`}
            </div>
          </div>
          <span>
            {removeUnderscore(props.lineupPlayer.position)}
          </span>
        </div>
        <button
          onClick={handleClick}>
          <Chevron classes={`w-2 h-auto transition-all duration-300 ${expanded ? 'rotate-90' : '-rotate-90'} -mx-4`} />
        </button>
      </div>
      <div className={`bg-bb-black px-8 capitalize border-b border-bb-black overflow-hidden transition-all duration-300 ${expanded ? 'visible h-48' : 'invisible h-0'}`} >
        <div className="flex flex-col">
          {Object.keys(filteredAttributeObject).map((attribute, index) => (
            <div key={attribute}>
              {attribute}: {Object.values(filteredAttributeObject)[index]}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}