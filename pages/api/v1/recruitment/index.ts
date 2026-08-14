import { NextApiRequest, NextApiResponse } from "next";
import errorHandler from "../../../../utils/error/errorHandler";
import { DBInstance } from "../../../../utils/db.connect";
// import { sendRecruitmentMail } from "../../../../utils/awsServices/recruitmentMailer"; // temporarily disabled
import axios from "axios";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const DISCORD_WEBHOOK = process.env.DISCORD_WEBHOOK_URL;

    try {
        if (req.method === "POST") {
            const {
                usn,
                name,
                email,
                phone,
                domain1,
                domain2,
                linkedin,
                additionalLink,
                resume
            } = req.body;

            // Validate required fields
            if (!usn || !name || !email || !phone || !domain1 || !linkedin) {
                return res.status(406).json({
                    success: false,
                    message: "❌ Provide all the required request details",
                    data: null
                });
            }

            // Database instance and recruitment collection
            const dbInstance = await DBInstance.getInstance();
            const recruitment26Collection = await dbInstance.getCollection(
                "recruitment26",
                "htbsrmist"
            );


            // Check for existing participant
            const existingParticipant = await recruitment26Collection.findOne({ usn: usn });

            if (existingParticipant) {
                return res.status(201).json({
                    success: false,
                    message: "❌ Already registered for the recruitment",
                    data: null
                });
            }

            // Insert participant data into MongoDB
            const additionalData = {
                status: "", // Default empty string
                passKey: "" // Default empty string
            };

            const insertedParticipant = {
                usn,
                name,
                email,
                phone,
                domain1,
                domain2,
                linkedin,
                additionalLink,
                resume,
                ...additionalData
            };

            const data = await recruitment26Collection.insertOne(insertedParticipant);

            // Send confirmation email (temporarily disabled)
            // try {
            //     await sendRecruitmentMail(insertedParticipant);
            //     res.status(200).json({
            //         success: true,
            //         message: `✅ Successfully Registered ${name}`,
            //         data: data
            //     });
            // } catch (emailError: any) {
            //     console.error("Error sending confirmation email:", emailError);
            //     res.status(500).json({
            //         success: false,
            //         message:
            //             "❌ Registration successful, but failed to send confirmation email",
            //         data: data
            //     });
            // }

            res.status(200).json({
                success: true,
                message: `✅ Successfully Registered ${name}`,
                data: data
            });

            // Send a message to Discord via Webhook
            try {
                const discordMessage = {
                    content: `📢 **New Recruitment Registration**\n\n- **Name**: ${name ?? ""
                        }\n- **USN**: ${usn ?? ""}\n- **Email**: ${email ?? ""
                        }\n- **Phone**: ${phone ?? ""}\n- **Domain1**: ${domain1 ?? ""
                        }\n- **Domain2**: ${domain2 ?? ""}\n- **LinkedIn**: ${linkedin ?? ""
                        }\n- **Additional Link**: ${additionalLink ? additionalLink : "No additional link"
                        }\n- **Resume**: [Link](${resume ? resume : "No resume provided"
                        })`
                };

                if (DISCORD_WEBHOOK) {
                    await axios.post(DISCORD_WEBHOOK, discordMessage);
                } else {
                    console.error("Discord Webhook URL is not defined.");
                }
            } catch (discordError) {
                console.error(
                    "Error sending message to Discord:",
                    discordError
                );
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
