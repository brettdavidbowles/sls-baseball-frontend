import { Game } from 'types/gqlTypes'
import { formatDateTime } from 'utils/formatDateTime'
import Link from 'next/link'
import { useEffect, useState } from 'react'

interface GameCardProps {
  game: Game
}

export default function GameCard(props: GameCardProps) {

  const [dateTime, setDateTime] = useState<string>()

  useEffect(() => {
    if (!props.game?.dateTime) return
    setDateTime(formatDateTime(props.game.dateTime))
  }, [props.game.dateTime])

  return (
    <Link
      href={`/game/${props.game.id}`}
      className='m-2'
    >
      <div className='text-center w-42 mx-auto my-2 p-6 border border-green-800 rounded'>
        <div>
          <div key={props.game.id}>
            {props.game.awayTeam.name}<br />at<br />{props.game.homeTeam.name}
          </div>
          <div className='h-6'>
            {dateTime}
          </div>
          <div>
            League: {props.game.league.name}
          </div>
        </div>
      </div>
    </Link>
  )
}