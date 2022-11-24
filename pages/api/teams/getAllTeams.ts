import {NextApiRequest, NextApiResponse} from "next";
import {getAllTeams} from "../../../utils/api.util";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        let data;
        try {
            data = await getAllTeams(req, res)
        } catch (e) {
            res.status(500).json({message: 'Internal server error!'})
            return;
        }
        res.status(200).json({data})
        return;
    }
    res.status(405).json({message: 'Method is not allowed!'})
}