import { NextApiRequest, NextApiResponse } from "next";
import { ContactUs } from "../../../utils/services/contactus.service";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        if (req.method == "POST") {
            await ContactUs(req.body);
            res.status(200).json({
                success: true,
                message: "✅ Data successfully Added!"
            });
        } else {
            console.log("🚫", req.method, "was called and got error!!");
            res.status(405).json({
                success: false,
                message: "🚫 HTTP Method not Allowded"
            });
        }
    } catch (err: any) {
        let message: string = "";
        console.log(err.name); // => 'ValidationError'
        err.errors.forEach((e: string) => {
            message += `${e}. `;
        }); // => [ 'Invalid Country Code!', 'Mobile Number is not valid!' ]
        console.error(message);
        //console.error(err.message);
        res.status(500).json({
            success: false,
            message: "❌ Unknown Error Occured!!"
        });
    }
};
