import { NextApiRequest, NextApiResponse } from "next";
import { Teams } from "../../../../utils/services/teams.service";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const teamData = await Teams();

        res.status(200).json({
            success: true,
            message: "✅ Successfully fetched!",
            data: teamData
        });
    } catch (err: any) {
        console.error(err.message);
        res.status(500).json({
            success: false,
            message: "❌ Database connected but failed to fetch the data!"
        });
    }
};
