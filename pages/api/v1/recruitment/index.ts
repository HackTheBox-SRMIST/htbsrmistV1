import { NextApiRequest, NextApiResponse } from "next";
import errorHandler from "../../../../utils/error/errorHandler";
import { DBInstance } from "../../../../utils/db.connect";
import { sendRecruitmentMail } from "../../../../utils/awsServices/recruitmentMailer";

export default async (req: NextApiRequest, res: NextApiResponse) => {
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

            if (!usn || !name || !email || !phone || !domain1 || !linkedin) {
                return res.status(406).json({
                    success: false,
                    message: "❌ Provide all the required request details",
                    data: null
                });
            }

            const dbInstance = await DBInstance.getInstance();
            const recruitment24Collection = await dbInstance.getCollection(
                "recruitment24v2"
            );

            const existingParticipant = await recruitment24Collection.findOne({
                usn: usn
            });

            if (existingParticipant) {
                return res.status(201).json({
                    success: false,
                    message: "❌ Already registered for the recruitment",
                    data: null
                });
            }

            const insertedParticipant = {
                usn,
                name,
                email,
                phone,
                domain1,
                domain2,
                linkedin,
                additionalLink,
                resume
            } as any;

            const data = await recruitment24Collection.insertOne(
                insertedParticipant
            );

            try {
                await sendRecruitmentMail(insertedParticipant);
                res.status(200).json({
                    success: true,
                    message: `✅ Successfully Registered ${name}`,
                    data: data
                });
            } catch (emailError: any) {
                console.error("Error sending confirmation email:", emailError);
                res.status(500).json({
                    success: false,
                    message:
                        "❌ Registration successful, but failed to send confirmation email",
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
