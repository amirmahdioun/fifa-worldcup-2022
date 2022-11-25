export interface StandingTeamsI {
    alternateName: string,
    country: string,
    wins: number,
    draws: number,
    losses: number,
    goalsScored: number,
    goalsConceded: number,
    goalsDifference: number,
    points: number,
    id: string,
    position: number
}

export interface StandingGroupI {
    code: string,
    createdAt: string,
    id: string,
    teams: StandingTeamsI[],
    updatedAt: string
}