import { NextApiRequest, NextApiResponse } from "next";
import { Teams } from "../../../../utils/services/teams.service";
import errorHandler from "../../../../utils/error/errorHandler";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { current } = req.query;
        const teamData = await Teams(current);
        if (teamData) {
            res.status(200).json({
                success: true,
                message: "✅ Successfully fetched teams data!",
                data: teamData
            });
        } else {
            res.status(406).json({
                success: false,
                message: "❌ Failed to fetch teams data!",
                data: teamData
            });
        }
    } catch (err: any) {
        errorHandler(err, res, "INTERNAL_SERVER_ERROR");
    }
};
