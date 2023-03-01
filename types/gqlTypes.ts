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