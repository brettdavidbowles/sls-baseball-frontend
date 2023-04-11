import { LogoutMutation } from 'gql/mutations/Logout.gql'
import { useMutation } from "@apollo/client"

export default function LogoutButton() {
  const [logout, { data }] = useMutation(LogoutMutation)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault()
    logout()
  }

  return (
    <button onClick={handleClick}>
      Logout
    </button>
  )
}