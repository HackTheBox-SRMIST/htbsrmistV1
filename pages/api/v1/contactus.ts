import { NextApiRequest, NextApiResponse } from "next";
import { ContactUs } from "../../../utils/services/contactus.service";
import errorHandler from "../../../utils/error/errorHandler";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        if (req.method === "POST") {
            console.log("📥 Incoming Contact Us Request Body:", JSON.stringify(req.body, null, 2));
            await ContactUs(req.body);
            return res.status(200).json({
                success: true,
                message: "✅ Successfully sent the message!"
            });
        } else {
            console.log("🚫 HTTP Method Not Allowed:", req.method);
            return res.status(405).json({
                success: false,
                message: "🚫 HTTP Method Not Allowed"
            });
        }
    } catch (err: any) {
        console.error("❌ Contact Us Handler Error:", err);
        return errorHandler(err, res, "INTERNAL_SERVER_ERROR");
    }
};

