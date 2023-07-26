export type League = {
  id: number
  name: string
}

export interface TeamRanking {
  team: Team
  wins: number
  losses: number
  average: number
  rank: number
}

export type Season = {
  id: number
  name: string
  start_date: string
  end_date: string
  rankings: TeamRanking[]
}


interface SeasonRecord {
  seasonName: string
  wins: number
  losses: number
}
export type Team = {
  id: number
  name: string
  players: Player[]
  managers: Manager[]
  recordPerSeason: SeasonRecord[]
}

export type Game = {
  id: number
  dateTime: string
  homeTeam: Team
  awayTeam: Team
  league: League
  isPast: boolean
}

export interface Manager {
  id: string
  user: User
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
  id: number
  inning: number
  atBats?: AtBat[]
  game: Game
  homeTeamAtBat: boolean
  rbis: number
  hits: number
  errors: number
}

export type Player = {
  id: number
  firstName: string
  lastName: string
  team: Team
  at_bats: AtBat[]
  attributes: PlayerAttribute
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

export type LineupPlayer = {
  id: number
  player: Player
  position: string
  battingOrderNumber: number
}

export type Lineup = {
  id: number
  team: Team
  players: LineupPlayer[]
  __typename?: 'LineupPlayer'
}

export type User = {
  id: string
  email: string
  firstName: string
  lastName: string
  teams: Team[]
}

export type UserGame = {
  id: number
  dateTime: string
  homeTeam: Team
  awayTeam: Team
  league: League
  season: Season
  isPast: boolean
  lineupId: number
}