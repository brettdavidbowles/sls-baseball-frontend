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
import { GetServerSidePropsContext } from "next"

interface GamePageProps {
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
  isPast: boolean,
  userId: string
}

export default function Game(props: GamePageProps) {
  const router = useRouter()
  const { gid } = router.query
  const isMobile = useSelector(selectIsMobile)

  const visitorScores = useMemo(() => {
    return props?.halfInnings?.filter(halfInning => !halfInning.homeTeamAtBat).map(({ rbis }) => rbis)
  }, [props.halfInnings])
  const homeScores = useMemo(() => {
    return props?.halfInnings?.filter(halfInning => halfInning.homeTeamAtBat).map(({ rbis }) => rbis)
  }, [props.halfInnings])
  const totalInnings = useMemo(() => {
    if (props?.halfInnings?.length) {
      return [...props?.halfInnings]?.pop()?.inning
    } else {
      return 0
    }
  }, [props.halfInnings])

  const scoreBoard = () => {
    if (props.isPast) {
      return (
        <ScoreBoard
          visitorScores={visitorScores}
          homeScores={homeScores}
          visitorHits={props.awayTeamTotalHits}
          homeHits={props.homeTeamTotalHits}
          totalInnings={totalInnings}
          homeErrors={props.homeTeamTotalErrors}
          visitorErrors={props.awayTeamTotalErrors}
          visitorName={props.awayTeam.name}
          homeName={props.homeTeam.name}
        />
      )
    }
  }
  return (
    <div className="py-8">
      <h1>Game {gid}</h1>
      <h2>
        <Link
          key={props.awayTeam?.id}
          href={`/team/${props.awayTeam?.id}`}
          className="hover:text-bb-tan"
        >
          {props.awayTeam?.name}
        </Link>
        &nbsp;vs&nbsp;
        <Link
          key={props.homeTeam?.id}
          href={`/team/${props.homeTeam?.id}`}
          className="hover:text-bb-tan"
        >
          {props.homeTeam?.name}
        </Link>
      </h2>
      {scoreBoard()}

      <div className={`${!isMobile ? 'flex' : 'block'}`}>
        {props.lineups?.map((lineup, index) => (
          <LineupCard key={index} lineup={lineup} userId={props.userId} />
        ))}
      </div>
    </div>
  )
}

export async function getServerSideProps({ query, req }: GetServerSidePropsContext) {
  const cookie = req.headers.cookie
  const { data } = await client.query({
    query: GetGamePage,
    variables: {
      id: query.gid
    },
    fetchPolicy: 'network-only',
    context: {
      headers: {
        cookie
      }
    }
  })
  return {
    props: {
      ...data.gameById,
      userId: data.auth.id || null
    }
  }
}