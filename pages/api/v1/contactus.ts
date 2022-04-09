import { NextApiRequest, NextApiResponse } from "next";
import { ContactUs } from "../../../utils/services/contactus.service";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        if (req.method == "POST") {
            const { message, success } = await ContactUs(req.body);
            if (success) {
                res.status(200).json({
                    success: true,
                    message: message
                });
            } else {
                res.status(400).json({
                    success: false,
                    message: message
                });
            }
        } else {
            res.status(405).json({
                success: false,
                message: "🚫 POST request are only accepted!"
            });
        }
    } catch (err: any) {
        console.error(err.message);
        res.status(500).json({
            success: false,
            message: "❌ Database connected but failed to fetch the data!"
        });
    }
};
