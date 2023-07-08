import { useMutation } from "@apollo/client"
import { CreatePlayers } from 'gql/mutations/CreatePlayers.gql'
import { players } from 'constants/firstPlayers.js'
import React, { MouseEvent } from 'react';
import { assignAttributesToPlayers } from 'utils/randomAttributes.js'

// interface AddPlayersProps {
//   onClick: React.MouseEventHandler<HTMLButtonElement>
// }
export default function AddPlayers<AddPlayersProps>() {

  const [createPlayers, { data }] = useMutation(CreatePlayers)

  const testPlayer = {
    firstName: 'test',
    lastName: 'test',
    team: 'Wu Tang Clan',
    // attributes: {
    //   composure: 50,
    //   endurance: 50,
    //   intellect: 50,
    //   reflexes: 50,
    //   speed: 50,
    //   strength: 50,
    //   willpower: 50
    // }
  }
  const addPlayers = (players: any) => {
    console.log(assignAttributesToPlayers([players]))
    createPlayers({ variables: { PlayerInput: assignAttributesToPlayers(players) } })
  }
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault()
    addPlayers(players)
  };

  return (
    <button onClick={handleClick}>
      Add Players
    </button>
  )
}