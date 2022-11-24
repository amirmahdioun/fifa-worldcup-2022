import {NextApiRequest, NextApiResponse} from "next";
import {getGroups} from "../../../../utils/api.util";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if(req.method === "GET"){
        const groupedTeams = await getGroups(req, res)
        res.status(200).json({data: groupedTeams})
        return;
    }
    res.status(405).json({message: 'Method is not allowed!'})
}

export default handler