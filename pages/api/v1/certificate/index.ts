import { NextApiRequest, NextApiResponse } from "next";
import { Certificates } from "../../../../utils/services/certificate.service";
import errorHandler from "../../../../utils/error/errorHandler";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const certificate = await Certificates(
            req.body.email,
            req.body.event,
            req.body.type
        );
        if (certificate) {
            res.status(200).json({
                certificate,
                usn: req.body.usn,
                success: true,
                message: "✅ Certificate generated successfully!"
            });
        } else {
            res.status(406).json({
                success: false,
                message: "❌ Failed to generate certificate!"
            });
        }
    } catch (err: any) {
        errorHandler(err, res, "INTERNAL_SERVER_ERROR");
    }
};
