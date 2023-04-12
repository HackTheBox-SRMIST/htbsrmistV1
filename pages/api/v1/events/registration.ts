import { NextApiRequest, NextApiResponse } from "next";
import errorHandler from "../../../../utils/error/errorHandler";
import { DBInstance } from "../../../../utils/db.connect";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        if (req.method == "POST") {
            console.log(req.body);
            const { usn, name, email, dept, isSrmite, event_name } = req.body;
            if (!usn || !name || !email || !dept || !isSrmite || !event_name) {
                res.status(406).json({
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
            const participantsCollection = await dbInstance.getCollection(
                "participants",
                eventData.database
            );
            const participants = await participantsCollection.findOne({
                usn: usn
            });
            if (participants) {
                res.status(406).json({
                    success: false,
                    message: "❌ Already registered for the event",
                    data: null
                });
            }
            const extraData = {
                checkin: {
                    status: false, // false
                    modified_at: Date.now() // null
                },
                checkout: {
                    status: false,
                    modified_at: Date.now()
                },
                snacks: {
                    status: false,
                    modified_at: Date.now()
                },
                certificate_status: {
                    email_uid: null,
                    status: false,
                    modified_at: Date.now()
                },
                is_onsite: {
                    status: false,
                    modified_at: Date.now()
                },
                is_rsvp: {
                    status: false,
                    modified_at: Date.now()
                }
            };

            const data = await participantsCollection.insertOne({
                usn,
                name,
                email,
                dept,
                isSrmite,
                ...extraData
            });
            res.status(200).json({
                success: true,
                message: `✅ Successfully Registered user ${name}`,
                data: data
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
