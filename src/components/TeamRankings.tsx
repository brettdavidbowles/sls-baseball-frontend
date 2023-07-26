import { Season, TeamRanking } from "types/gqlTypes"
import { removeUnderscore } from "utils/removeUnderscore"


export default function TeamRankings({ season }: { season: Season }) {


  return (
    <div>
      <h2 className="capitalize text-xl">{removeUnderscore(season.name)} Rankings</h2>
      {
        season.rankings?.map((ranking: TeamRanking) => (
          <div
            key={ranking.team.id}
            className="flex justify-between max-w-sm mx-auto px-8"
          >
            <div className="text-left capitalize">{ranking.rank}. {ranking.team.name}</div>
            <div className="text-right">{ranking.wins} - {ranking.losses}</div>
          </div>
        ))
      }
    </div>
  )
}