import { NextApiRequest, NextApiResponse } from "next";
import errorHandler from "../../../../utils/error/errorHandler";
import { DBInstance } from "../../../../utils/db.connect";
import { sendConfirmationEmail } from "../../../../utils/awsServices/sesMailer";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        if (req.method === "POST") {
            const { usn, name, email, dept, isSrmite, event_name } = req.body;
            if (!usn || !name || !email || !dept || !isSrmite || !event_name) {
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
            const participantsCollection = await dbInstance.getCollection(
                "participants",
                eventData.database
            );
            const existingParticipant = await participantsCollection.findOne({
                $or: [{ usn: usn }, { email: email }]
            });

            if (existingParticipant) {
                return res.status(406).json({
                    success: false,
                    message: "❌ Already registered for the event",
                    data: null
                });
            }

            const extraData = {
                checkin: { status: false, modified_at: Date.now() },
                checkout: { status: false, modified_at: Date.now() },
                snacks: { status: false, modified_at: Date.now() },
                certificate_status: {
                    email_uid: null,
                    status: false,
                    modified_at: Date.now()
                },
                is_onsite: { status: false, modified_at: Date.now() },
                is_rsvp: { status: false, modified_at: Date.now() }
            };

            const insertedParticipant = {
                usn,
                name,
                email,
                dept,
                isSrmite,
                ...extraData
            } as any;

            const data = await participantsCollection.insertOne(
                insertedParticipant
            );

            // Send confirmation email and check for success
            try {
                await sendConfirmationEmail(
                    insertedParticipant,
                    event_name,
                    eventData
                );
                res.status(200).json({
                    success: true,
                    message: `✅ Successfully Registered user ${name} and confirmation email sent`,
                    data: data
                });
            } catch (emailError: any) {
                // If email sending fails, you may want to handle it gracefully
                console.error("Error sending confirmation email:", emailError);
                res.status(500).json({
                    success: false,
                    message: `❌ Registration successful, but failed to send confirmation email to ${email}`,
                    data: data
                });
            }
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
