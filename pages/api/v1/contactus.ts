import { NextApiRequest, NextApiResponse } from "next";
import { ContactUs } from "../../../utils/services/contactus.service";
import errorHandler from "../../../utils/error/errorHandler";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        if (req.method == "POST") {
            await ContactUs(req.body);
            res.status(200).json({
                success: true,
                message: "✅ Successfully sent the message!"
            });
        } else {
            console.log("🚫", req.method, "was called and got error!!");
            res.status(405).json({
                success: false,
                message: "🚫 HTTP Method not Allowed"
            });
        }
    } catch (err: any) {
        errorHandler(err, res, "INTERNAL_SERVER_ERROR");
    }
};
