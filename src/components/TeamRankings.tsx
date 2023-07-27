import { Season, TeamRanking } from "types/gqlTypes"
import { removeUnderscore } from "utils/removeUnderscore"
import { useMemo } from 'react'


export default function TeamRankings({ season }: { season: Season }) {

  const rankings = useMemo(() => {
    if (!season?.rankings) return []
    return [...season.rankings].sort((a: TeamRanking, b: TeamRanking) => a.rank - b.rank)
  }, [season.rankings])

  return (
    <div>
      <h2 className="capitalize text-xl">{removeUnderscore(season.name)} Rankings</h2>
      {
        rankings?.map((ranking: TeamRanking) => (
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