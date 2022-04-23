import { NextApiRequest, NextApiResponse } from "next";
import { Teams } from "../../../../utils/services/teams.service";
import errorHandler from "../../../../utils/error/errorHandler";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { current } = req.query;
        const teamData = await Teams(current);
        //console.log(typeof current);
        //console.log(current);
        res.status(200).json({
            success: true,
            message: "✅ Successfully fetched!",
            data: teamData
        });
    } catch (err: any) {
        errorHandler(err, res, "INTERNAL_SERVER_ERROR");
    }
};
