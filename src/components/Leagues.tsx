
import { League } from "types/gqlTypes"
import Link from 'next/link'

interface LeagueProps {
  leagues: League[]
}

export default function Leagues(props: LeagueProps) {
  return (
    <div className='w-full text-center'>
      <h1 className='py-4'>Leagues</h1>
      <ul>
        {props.leagues?.map((league: League) => (
          <li key={league.id}>
            <Link href={`/leagues/${league.id}`}>{league.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
