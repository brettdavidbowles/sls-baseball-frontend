export type League = {
  id: number;
  name: string;
}

export type Team = {
  id: number;
  name: string;
}

export type Game = {
  id: number;
  dateTime: string;
  homeTeam: Team;
  awayTeam: Team;
  league: League;
}

export type AtBat = {
  id: number
  pitcher: Player
  batter: Player
  half_inning: HalfInning
  strikes: number
  balls: number
  errors: number
  rbis: number
  outcome: string
  // change outcome to enum
  leftOnRunners: LeftOnRunner[]
  gameAtBatNumber: number
  game: Game
}

export type HalfInning = {
  id: number;
  inning: number;
  atBats?: AtBat[];
  game: Game;
  homeTeamAtBat: boolean
  rbis: number;
  hits: number;
  errors: number;
}

export type Player = {
  id: number
  firstName: string
  lastName: string
  team: Team
  at_bats: AtBat[]
  attributes?: PlayerAttribute
}

export type PlayerAttribute = {
  composure: number
  endurance: number
  intellect: number
  reflexes: number
  speed: number
  strength: number
  willpower: number
}

export type LeftOnRunner = {
  id: number
  player: Player
  base: number
  atBatSubindex: number
}