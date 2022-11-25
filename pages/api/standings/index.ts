import {NextApiRequest, NextApiResponse} from "next";

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if(req.method === "GET"){
        const response = await fetch('https://copa22.medeiro.tech/groups')
        const data = await response.json()
        res.status(200).json({data})
        return;
    }
    res.status(405).json({message: 'Method is not allowed!'})
}