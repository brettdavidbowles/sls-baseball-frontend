import { useRouter } from 'next/router'
import client from "apollo-client"
import { GetServerSidePropsContext } from "next"
import { GetLineupById } from 'gql/queries/GetLineupById.gql'

interface EditLineupPageProps {
  any: any
}

export default function EditLineup(props: EditLineupPageProps) {
  console.log(props)
  const router = useRouter()
  const { lid } = router.query

  return (
    <div>{lid}</div>
  )
}

export async function getServerSideProps({ query, req }: GetServerSidePropsContext) {
  const cookie = req.headers.cookie
  const { data } = await client.query({
    query: GetLineupById,
    variables: {
      id: query.lid
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
      ...data.lineupById,
      // userId: data.auth.id || null
    }
  }
}
