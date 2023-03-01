const numberInRange = () => {
  return Math.round((Math.random() * .5 + .3) * 100)
}

const attributesArray = [
  'composure',
  'endurance',
  'intellect',
  'reflexes',
  'speed',
  'strength',
  'willpower'
]

const createAtts = (arr) => {
  const attributesObject = {}
  arr.forEach(attribute => {
    Object.assign(attributesObject, {
      [attribute]: numberInRange()
    })
  })
  return attributesObject
}


export const assignAttributesToPlayers = (players) => {
  return players.map(player => Object.assign(player, {
    attributes: createAtts(attributesArray)
  }))
}