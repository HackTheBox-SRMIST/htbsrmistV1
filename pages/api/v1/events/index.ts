import { NextApiRequest, NextApiResponse } from "next";
import { Events } from "../../../../utils/services/events.service";
import errorHandler from "../../../../utils/error/errorHandler";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        if (req.method === "GET") {
            const eventData = await Events();
            if (Array.isArray(eventData) && eventData.length > 0) {
                res.status(200).json({
                    success: true,
                    message: "Successfully fetched events data!",
                    data: eventData
                });
            } else if (Array.isArray(eventData)) {
                res.status(200).json({
                    success: true,
                    message: "No events found.",
                    data: []
                });
            } else {
                res.status(406).json({
                    success: false,
                    message: "Failed to fetch events data!",
                    data: []
                });
            }
        } else {
            console.log(req.method, "was called and got error!!");
            res.status(405).json({
                success: false,
                data: null,
                message: "HTTP Method not Allowed"
            });
        }
    } catch (err: any) {
        errorHandler(err, res, "INTERNAL_SERVER_ERROR");
    }
};
