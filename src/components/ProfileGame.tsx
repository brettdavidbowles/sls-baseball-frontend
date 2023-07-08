import { UserGame } from "types/gqlTypes"
import Link from "next/link"
import { formatDateTime } from "utils/formatDateTime"

export default function ProfileGame({ game }: { game: UserGame }) {
  const editLineupLink = () => {
    if (game.isPast) return
    return (
      <Link
        href={`/lineup/edit/${game.lineupId}`}
        className="hover:text-bb-light-blue"
      >
        Edit Lineup -&gt;
      </Link>
    )
  }
  return (
    <div className="flex flex-col py-4">
      <Link href={`game/${game.id}`} key={game.id}>
        {game.awayTeam.name} at {game.homeTeam.name}
      </Link>
      <span>
        on {formatDateTime(game.dateTime)}
      </span>
      <span>
        {editLineupLink()}
      </span>
    </div>
  )
}