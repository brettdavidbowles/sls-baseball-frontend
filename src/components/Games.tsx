import { Game } from "types/gqlTypes"
import GameCard from '@/components/GameCard'

interface UpcomingGamesProps {
  games: Game[],
  title: string
}

export default function UpcomingGames(props: UpcomingGamesProps) {
  return (
    <div className="p-4 w-full lg:w-1/2 m-auto">
      <h2 className="text-xl">{props.title}</h2>
      <div className="flex flex-wrap justify-around">
        {
          props.games?.map((game: Game) => (
            <GameCard key={game.id} game={game} />
          ))
        }
      </div>
    </div>
  )
}