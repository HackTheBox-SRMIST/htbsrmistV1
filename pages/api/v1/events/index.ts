import { NextApiRequest, NextApiResponse } from "next";
import { Events } from "../../../../utils/services/events.service";
import errorHandler from "../../../../utils/error/errorHandler";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const eventData = await Events();
        if (eventData) {
            res.status(200).json({
                success: true,
                message: "✅ Successfully fetched events data!",
                data: eventData
            });
        } else {
            res.status(406).json({
                success: false,
                message: "❌ Failed to fetch events data!",
                data: eventData
            });
        }
    } catch (err: any) {
        errorHandler(err, res, "INTERNAL_SERVER_ERROR");
    }
};
