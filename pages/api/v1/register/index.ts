import { NextApiRequest, NextApiResponse } from "next";
import errorHandler from "../../../../utils/error/errorHandler";
import { DBInstance } from "../../../../utils/db.connect";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        if (req.method == "POST") {
            const dbInstance = await DBInstance.getInstance();
            const collection = await dbInstance.getCollection(
                "rsvp-checkedin",
                "WTFlag_prod"
            );
            const data = await collection.findOne({ usn: "RA2211047010019" });
            res.status(200).json({
                success: true,
                message: "✅ Successfully Added the user!",
                data: data
            });
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
