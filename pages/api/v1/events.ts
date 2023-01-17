import { NextApiHandler } from "next";
import { NextApiRequest, NextApiResponse } from "next";
import { Events } from "../../../utils/services/events.service";
import errorHandler from "../../../utils/error/errorHandler";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { active } = req.query;
        const eventData = await Events(active);
        //console.log(typeof active);
        //console.log(active);
        res.status(200).json({
            success: true,
            message: "✅ Successfully fetched!",
            data: eventData
        });
    } catch (err: any) {
        errorHandler(err, res, "INTERNAL_SERVER_ERROR");
    }
};
