import { NextApiRequest, NextApiResponse } from "next";
import { Certificates } from "../../../../utils/services/certificate.service";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const certificate = await Certificates(req.body.usn);
        res.status(200).json({
            certificate,
            usn: req.body.usn,
            success: true,
            message: "✅ Successfully tested!"
        });
    } catch (err: any) {
        console.error(err.message);
        res.status(500).json({
            success: false,
            message: "❌ Database connected but failed to fetch the data!"
        });
    }
};
