interface PlayersI {
    name: string,
    number: number,
    position: string
}

interface OfficialsI {
    name: string,
    role: string,
    country: string
}

interface SubstitutionsI {
    minute: string,
    playerIn: {name: string, number: number, position: string},
    playerOut: {name: string, number: number, position: string}
}

interface StaticsI {
    attemptsOnGoal: number,
    kicksOnTarget: number,
    kicksOffTarget: number,
    kicksBlocked: number,
    kicksOnWoodwork: number,
    corners: number,
    offsides: number,
    ballPossession: number,
    passes: number,
    passesCompleted: number,
    distanceCovered: number,
    freeKicks: number,
    crosses: number,
    crossesCompleted: number,
    assists: number,
    yellowCards: number,
    redCards: number,
    foulsCommited: number,
    foulsReceived: number,
    tactics: string,
}

interface EventI {
    typeOfEvent: string,
    player: string,
    extraInfo: {
        playerIn?: string,
        playerOff?: string,
        card?: 'yellow' | 'red'
    },
    minute: string
}

interface TeamI {
    country: string,
    goals: number,
    name: string,
    penalties: number,
    statistics: StaticsI,
    substitutions: SubstitutionsI[],
    startingPlayers: PlayersI[],
    events: EventI[]
}

export interface MatchI {
    id: string,
    venue: string,
    location: string,
    status: string,
    stageName: string,
    time: string,
    homeTeam: TeamI,
    awayTeam: TeamI,
    officials: OfficialsI[],
    createdAt: string,
    date: string,
    updatedAt: string,
}