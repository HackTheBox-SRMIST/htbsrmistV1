import { NextApiRequest, NextApiResponse } from "next";
import errorHandler from "../../../../utils/error/errorHandler";
import { DBInstance } from "../../../../utils/db.connect";
import { UpdateResult } from "mongodb";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        if (req.method == "GET") {
            const { email, event_name } = req.query;
            if (!email || !event_name) {
                return res.status(406).json({
                    success: false,
                    message: "❌ Provide all the required request details",
                    data: null
                });
            }
            const dbInstance = await DBInstance.getInstance();

            const eventsCollection = await dbInstance.getCollection("events");
            const eventData: any = await eventsCollection.findOne({
                event_name: event_name
            });
            if (eventData.rsvp.limit === eventData.rsvp.current) {
                return res.status(406).json({
                    success: false,
                    message: "❌ RSVP limit exceeded",
                    data: null
                });
            }
            const participantsCollection = await dbInstance.getCollection(
                "participants",
                eventData.database
            );

            const participants: any = await participantsCollection.findOne({
                email: email
            });

            if (participants.is_rsvp.status) {
                return res.status(406).json({
                    success: false,
                    message: "❌ Already RSVP done",
                    data: null
                });
            }

            const result: UpdateResult = await participantsCollection.updateOne(
                {
                    email: email
                },
                {
                    $set: {
                        "is_rsvp.status": true,
                        "is_rsvp.modified_at": Date.now()
                    }
                }
            );
            //console.log(participants);

            if (result.modifiedCount == 0 || result.acknowledged == false) {
                return res.status(406).json({
                    success: false,
                    message: "❌ RSVP already failed. Please contact us",
                    data: null
                });
            }
            await eventsCollection.updateOne(
                { event_name: event_name },
                { $inc: { "rsvp.current": 1 } }
            );
            res.status(200).json({
                success: true,
                message: `✅ Successfully RSVP Done`,
                data: result
            });
        } else {
            console.log("🚫", req.method, "was called and got error!!");
            res.status(405).json({
                success: false,
                data: null,
                message: "🚫 HTTP Method not Allowed"
            });
        }
    } catch (err: any) {
        errorHandler(err, res, "INTERNAL_SERVER_ERROR");
    }
};
