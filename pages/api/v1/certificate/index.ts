import { NextApiRequest, NextApiResponse } from "next";
import { Certificates } from "../../../../utils/services/certificate.service";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        if (req.method === "POST") {
            const { email, event, type } = req.body;

            if (
                type !== "participants" &&
                type !== "volunteers" &&
                type !== "organizers"
            ) {
                throw {
                    success: false,
                    message:
                        "Invalid type it should be participants, volunteers or organizers"
                };
            }

            const { certificate, error, error_message } = await Certificates(
                email,
                event,
                type
            );

            if (error) {
                res.status(406).json({
                    success: false,
                    message: error_message
                });
            }
            if (certificate) {
                res.status(200).json({
                    certificate,
                    usn: req.body.usn,
                    success: true,
                    message: "✅ Certificate generated successfully!"
                });
            }
        }
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message || "Internal Server Error"
        });
    }
};
