import { GetProfileData } from "gql/queries/GetProfileData.gql"
import { Team, UserGame } from "types/gqlTypes"
import Link from "next/link"
import ProfileGame from "@/components/ProfileGame"
import { useQuery } from "@apollo/client"
import { useMemo, useEffect } from "react"
import { useRouter } from 'next/router'

export default function Profile() {

  const { loading, error, data, refetch } = useQuery(GetProfileData, {
    fetchPolicy: 'network-only'
  })
  const router = useRouter()

  const teams: Team[] = useMemo(() => {
    return data?.teamsByUser || []
  }, [data])
  const games: UserGame[] = useMemo(() => {
    return data?.gamesByUser || []
  }, [data])
  const username = useMemo(() => {
    return data?.auth?.username
  }, [data])


  return (
    <div>
      <h1 className="capitalize">{`${username}'s`} Profile</h1>
      <h2 className="py-2 underline text-xl">Teams</h2>
      <div className="flex flex-col">
        {teams.map(team => (
          <Link href={`team/${team.id}`} key={team.id}>{team.name}</Link>
        ))}
      </div>
      <div className="py-4">
        <h2 className="py-2 underline text-xl">Games</h2>
        <div className="flex flex-col">
          {games.map(game => (
            <ProfileGame game={game} key={game.id} />
          ))}
        </div>
      </div>
    </div>
  )
}
