import { NextApiRequest, NextApiResponse } from "next";
import errorHandler from "../../../../utils/error/errorHandler";
import { DBInstance } from "../../../../utils/db.connect";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        if (req.method == "POST") {
            console.log(req.body);
            const { usn, name, email, dept, isSrmite, event_name } = req.body;
            if (!usn || !name || !email || !dept || !isSrmite || !event_name) {
                throw {
                    httpStatus: 404,
                    message: "🚫 Send all request data"
                };
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
                throw {
                    httpStatus: 404,
                    message: "🚫 Already registered for the event"
                };
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

            await participantsCollection.insertOne({
                usn,
                name,
                email,
                dept,
                isSrmite,
                ...extraData
            });
            res.status(200).json({
                success: true,
                message: `✅ Successfully Added the ${name}`,
                data: null
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
