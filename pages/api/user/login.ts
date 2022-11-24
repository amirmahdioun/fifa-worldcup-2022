import {NextApiRequest, NextApiResponse} from "next";
import {setCookie} from "cookies-next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {
            const response = await fetch('http://api.cup2022.ir/api/v1/user/login', {
                method: 'POST',
                body: JSON.stringify({
                    email: 'amir.mahdioun@gmail.com',
                    password: 'Behnam9103140337'
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const {data} = await response.json()
            setCookie('token', data.token, {req, res})
            res.status(200).json({message: 'success', token: data.token})
            return;
        } catch (e) {
            res.status(500).json({message: 'Internal server error!'})
            return;
        }
    }
    res.status(405).json({message: 'Method is not allowed!'})
}