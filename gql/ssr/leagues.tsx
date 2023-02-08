
import client from "apollo-client"
import { GetLeagues } from "gql/queries/GetLeagues.gql"

export default async function getServerSideProps() {
  const { data } = await client.query({
    query: GetLeagues,
  })
  return {
    props: {
      leagues: data.leagues,
    }
  }
}