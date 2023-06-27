import { LineupPlayer, Player } from "types/gqlTypes"
import { removeUnderscore } from "utils/removeUnderscore"
import Chevron from "./ImageComponents/chevron"
import { useState, useMemo } from 'react'

interface LineupPlayerCardProps {
  lineupPlayer?: LineupPlayer
  player?: Player
  spotInLineup?: number
  showSubButton: boolean
  showCancelSubButton?: boolean
  setStagedSubstitute?: (player: LineupPlayer | undefined) => void
  substitutePlayer?: (player: Player) => void
}

export default function LineupPlayerCard(props: LineupPlayerCardProps) {
  const [expanded, setExpanded] = useState(false)

  const handleClick = () => {
    setExpanded(!expanded)
  }

  const player = useMemo(() => {
    if (props.lineupPlayer) {
      return props.lineupPlayer.player
    } else {
      return props.player
    }
  }, [props.lineupPlayer, props.player])

  const filteredAttributeObject = useMemo(() => {
    if (!player) return {}
    return Object.fromEntries(
      Object.entries(player.attributes)
        .filter(([key]) => !key.includes("__typename"))
    )
  }, [player])

  const spotInLineup = () => {
    if (!props.spotInLineup) return null
    return (
      <span className="mr-4">
        {props.spotInLineup}
      </span>
    )
  }
  const position = () => {
    if (!props.lineupPlayer) return null
    return (
      <span>
        {removeUnderscore(props.lineupPlayer.position)}
      </span>
    )
  }

  const substitute = () => {
    if (props.lineupPlayer && props.setStagedSubstitute) {
      props.setStagedSubstitute(props.lineupPlayer)
    }
    if (props.player && props.substitutePlayer) {
      props.substitutePlayer(props.player)
    }
  }

  const subButton = () => {
    if (!props.showSubButton) {
      return (
        <div className={`${props.player ? 'hidden' : 'block'} md:block w-24 px-4 m-1 h-6`}></div>
      )
    }
    if (player) {
      return (
        <button
          onClick={() => substitute()}
          className={`w-24 px-4 flex ${props.player ? 'flex-row-reverse' : 'flex-row'} items-center bg-bb-black hover:bg-bb-peach hover:text-bb-black rounded m-1 border border-bb-black`}
        >
          <span className="px-2 uppercase">Sub</span>
          <Chevron classes={`w-2 h-auto ${props.player ? 'rotate-0' : 'rotate-180'}`} />
        </button>
      )
    }
  }

  const cancelStagedSubstitute = () => {
    if (!props.setStagedSubstitute) return
    props.setStagedSubstitute(undefined)
  }


  const cancelSubButton = () => {
    if (props.showCancelSubButton && props.setStagedSubstitute) {
      return (
        <button onClick={() => cancelStagedSubstitute()}>
          Cancel
        </button>
      )
    }
  }

  return (
    <div className={`flex w-full ${props.player ? 'flex-row-reverse' : 'flex-row'} items-center whitespace-nowrap md:whitespace-normal`}>
      <div className="bg-bb-black border-t border-b grow">
        <div className="flex justify-between">
          <div className={`capitalize flex w-full justify-between py-1 px-2 ${props.lineupPlayer ? 'cursor-grab' : 'cursor-default'} pr-4`}>
            <div className={`${props.lineupPlayer?.position !== 'pitcher' ? '' : 'pl-7'}`}>
              {spotInLineup()} {player?.firstName} {player?.lastName}
            </div>
            {position()}
          </div>
          <button
            onClick={handleClick}
            className="py-2 px-4"
          >
            <Chevron classes={`w-2 h-auto transition-transform duration-300 ${expanded ? 'rotate-90' : '-rotate-90'}`} />
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
      {subButton()}
      <div className="relative">
        <div className="absolute top-4 right-6">
          {cancelSubButton()}
        </div>
      </div>
    </div>
  )
}