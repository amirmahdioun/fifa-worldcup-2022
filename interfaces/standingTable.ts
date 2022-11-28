interface MatchI {
    createdAt: string,
    date : string,
    homeTeam: {
        country: string,
        goals: number,
        name: string,
        penalties: number
    }
    id : string,
    location : string,
    stageName : string,
    status : string,
    updatedAt : string,
    venue : string,
    winner : string,
}

export interface StandingTeamsI {
    matches: MatchI[];
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