import {getCookie} from "cookies-next";
import {NextApiRequest, NextApiResponse} from "next";
import groupBy from 'lodash/groupBy'
import {MatchI} from "../interfaces/matches";

export const loginUser = async () => {
    const response = await fetch('http://api.cup2022.ir/api/v1/user/login')
}

export const getAllTeams = async (req: NextApiRequest, res: NextApiResponse) => {
    const token = getCookie('token', {req, res})
    const response = await fetch('http://api.cup2022.ir/api/v1/team', {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
    return await response.json()
}

export const getGroups = async (req: NextApiRequest, res: NextApiResponse) => {
    const {data} = await getAllTeams(req, res)
    return groupBy(data, (team) => {
        return team.groups
    })
}

export const getStandings = async () => {
    const response = await fetch('https://copa22.medeiro.tech/groups')
    return await response.json()
}

export const getTodayMatches = async (status: 'All' | 'in_progress' | 'scheduled' | 'completed') => {
    const response = await fetch('https://copa22.medeiro.tech/matches/today')
    const data = await response.json()
    return data.filter((item: MatchI) => item.status === status)
}

export const getAllMatches = async (date: string) => {
    const response = await fetch('https://copa22.medeiro.tech/matches')
    const data = await response.json()
    return data.filter((match: MatchI) => {
        return match.date.includes(date)
    })
}


