import { useRouter } from 'next/router'
import client from "apollo-client"
import { GetGamePage } from "gql/queries/GetGamePage.gql"
import Link from 'next/link'
import { Team, HalfInning, League } from "types/gqlTypes"
import { ScoreBoard } from '@/components/ScoreBoard'
import { useMemo } from 'react'

interface GameProps {
  id: number,
  homeTeamTotalRuns: number,
  awayTeamTotalRuns: number,
  homeTeamTotalHits: number,
  awayTeamTotalHits: number,
  hometeamTotalErrors: number,
  awayTeamTotalErrors: number,
  halfInnings: HalfInning[],
  dateTime: string,
  homeTeam: Team,
  awayTeam: Team,
  league: League
}

// const { gid } = router.query
export default function Game(game: GameProps) {
  const router = useRouter()
  const { gid } = router.query

  const visitorScores = useMemo(() => {
    return game.halfInnings.filter(halfInning => !halfInning.homeTeamAtBat).map(({ rbis }) => rbis)
  }, [game.halfInnings])
  const homeScores = useMemo(() => {
    return game.halfInnings.filter(halfInning => halfInning.homeTeamAtBat).map(({ rbis }) => rbis)
  }, [game.halfInnings])
  const totalInnings = useMemo(() => {
    return game.halfInnings.pop()?.inning
  }, [game.halfInnings])

  return (
    <div>
      <h1>Game {gid}</h1>
      <h2>{game.awayTeam.name} vs {game.homeTeam.name}</h2>
      <ScoreBoard
        visitorScores={visitorScores}
        homeScores={homeScores}
        visitorHits={game.awayTeamTotalHits}
        homeHits={game.homeTeamTotalHits}
        totalInnings={totalInnings}
      />
    </div>
  )
}

export async function getServerSideProps({ query }: { query: { gid: string } }) {
  const { data } = await client.query({
    query: GetGamePage,
    variables: {
      pk: parseInt(query.gid)
    }
  })
  console.log(data)
  return {
    props: {
      ...data.gameByPk
    }
  }
}