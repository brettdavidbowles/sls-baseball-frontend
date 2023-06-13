import { useRouter } from 'next/router'
import client from "apollo-client"
import { GetGamePage } from "gql/queries/GetGamePage.gql"
import Link from 'next/link'
import { Team, HalfInning, League, Lineup } from "types/gqlTypes"
import { ScoreBoard } from '@/components/ScoreBoard'
import { useMemo } from 'react'
import LineupCard from '@/components/LineupCard'
import { useSelector } from 'react-redux'
import { selectIsMobile } from 'store/windowSlice'

interface GameProps {
  id: number,
  homeTeamTotalRuns: number,
  awayTeamTotalRuns: number,
  homeTeamTotalHits: number,
  awayTeamTotalHits: number,
  homeTeamTotalErrors: number,
  awayTeamTotalErrors: number,
  halfInnings: HalfInning[],
  dateTime: string,
  homeTeam: Team,
  awayTeam: Team,
  league: League,
  lineups: Lineup[],
  isPast: boolean
}

export default function Game(game: GameProps) {
  const router = useRouter()
  const { gid } = router.query
  const isMobile = useSelector(selectIsMobile)

  const visitorScores = useMemo(() => {
    return game?.halfInnings?.filter(halfInning => !halfInning.homeTeamAtBat).map(({ rbis }) => rbis)
  }, [game.halfInnings])
  const homeScores = useMemo(() => {
    return game?.halfInnings?.filter(halfInning => halfInning.homeTeamAtBat).map(({ rbis }) => rbis)
  }, [game.halfInnings])
  const totalInnings = useMemo(() => {
    if (game?.halfInnings?.length) {
      return [...game?.halfInnings]?.pop()?.inning
    } else {
      return 0
    }
  }, [game.halfInnings])

  const scoreBoard = () => {
    if (game.isPast) {
      return (
        <ScoreBoard
          visitorScores={visitorScores}
          homeScores={homeScores}
          visitorHits={game.awayTeamTotalHits}
          homeHits={game.homeTeamTotalHits}
          totalInnings={totalInnings}
          homeErrors={game.homeTeamTotalErrors}
          visitorErrors={game.awayTeamTotalErrors}
          visitorName={game.awayTeam.name}
          homeName={game.homeTeam.name}
        />
      )
    }
  }
  if (!game) return (<div>loading...</div>)
  return (
    <div className="py-8">
      <h1>Game {gid}</h1>
      <h2>
        <Link
          key={game.awayTeam?.id}
          href={`/team/${game.awayTeam?.id}`}
          className="hover:text-bb-tan"
        >
          {game.awayTeam?.name}
        </Link>
        &nbsp;vs&nbsp;
        <Link
          key={game.homeTeam?.id}
          href={`/team/${game.homeTeam?.id}`}
          className="hover:text-bb-tan"
        >
          {game.homeTeam?.name}
        </Link>
      </h2>
      {scoreBoard()}

      <div className={`${!isMobile ? 'flex' : 'block'}`}>
        {game.lineups?.map((lineup, index) => (
          <LineupCard key={index} lineup={lineup} />
        ))}
      </div>
    </div>
  )
}

export async function getServerSideProps({ query }: { query: { gid: string } }) {
  const { data } = await client.query({
    query: GetGamePage,
    variables: {
      id: query.gid
    }
  })
  return {
    props: {
      ...data.gameById
    }
  }
}