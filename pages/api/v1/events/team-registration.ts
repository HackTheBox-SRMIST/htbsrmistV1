import { NextApiRequest, NextApiResponse } from "next";
import { DBInstance } from "../../../../utils/db.connect";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const dbInstance = await DBInstance.getInstance();

    try {
        const { participants, teamName, event_name } = req.body;
        if (!participants || !event_name) {
            return res.status(406).json({
                success: false,
                message: "❌ Provide all the required request details",
                data: null
            });
        }

        const eventsCollection = await dbInstance.getCollection("events");
        const eventData: any = await eventsCollection.findOne({
            event_name: event_name
        });
        const participantsCollection = await dbInstance.getCollection(
            "participants",
            eventData.database
        );

        for (let i = 0; i < participants.length; i++) {
            const { usn, name, email, department } = participants[i];
            if (!usn || !name || !email || !department) {
                res.status(406).json({
                    success: false,
                    message: `❌ Provide all details for team member ${i + 1}`,
                    data: null
                });

                return;
            }

            const student = await participantsCollection.findOne({
                $or: [{ usn: usn }, { email: email }]
            });

            if (student) {
                res.status(406).json({
                    success: false,
                    message: `❌ ${name} has already registered for the event`,
                    data: null
                });

                return;
            }
        }

        const extraData = {
            checkin: {
                status: false,
                modified_at: Date.now()
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

        participants.forEach(async (participant: any) => {
            const { usn, name, email, department } = participant;
            await participantsCollection.insertOne({
                usn,
                name,
                email,
                department,
                teamName,
                ...extraData
            });
        });

        res.status(200).json({
            success: true,
            message: `✅ ${teamName} Successfully registered`
        });
    } catch (err: any) {
        if (err.name === "ValidationError") {
            let message = "";
            err.errors?.forEach((e: any) => {
                message += `${e}. `;
            });
            res.status(422).json({
                success: false,
                message: message
            });
        } else {
            res.status(err.statusCode || 500).json({
                success: false,
                message: err.message || "❌ Unknown Error Occurred!!"
            });
        }
    }
};
