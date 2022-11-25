import {getCookie} from "cookies-next";
import {NextApiRequest, NextApiResponse} from "next";
import groupBy from 'lodash/groupBy'

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


