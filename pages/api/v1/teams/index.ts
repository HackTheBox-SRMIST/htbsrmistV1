import { NextApiRequest, NextApiResponse } from "next";
import { Teams } from "../../../../utils/services/teams.service";

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
        if (err.name === "ValidationError") {
            let message: string = "";
            err.errors?.forEach((e: string) => {
                message += `${e}. `;
            });
            console.error(`🟠 ValidationError: ${message}`);
            res.status(400).json({
                success: false,
                message: message
            });
        } else {
            console.error("❌ Unknown Error Occurred!", err);
            res.status(500).json({
                success: false,
                message: "❌ Unknown Error Occurred!!"
            });
        }
    }
};
