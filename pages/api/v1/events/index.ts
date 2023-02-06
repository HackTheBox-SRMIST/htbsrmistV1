import { NextApiRequest, NextApiResponse } from "next";
import { Events } from "../../../../utils/services/events.service";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { active } = req.query;
        const fetchActive = active === "false" ? false : true;
        const eventData = await Events(fetchActive);

        res.status(200).json({
            success: true,
            message: "✅ Successfully fetched!",
            data: eventData
        });
    } catch (err: any) {
        console.error(err.message);
        res.status(500).json({
            success: false,
            message: "❌ Database connected but failed to fetch the data!"
        });
    }
};
