import { NextApiRequest, NextApiResponse } from "next";
import errorHandler from "../../../../utils/error/errorHandler";
import { DBInstance } from "../../../../utils/db.connect";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        if (req.method == "POST") {
            console.log(req.body,"Success");
            const dbInstance = await DBInstance.getInstance();
            await dbInstance.changeDatabase("htbsrmist");
            const collection = await dbInstance.getCollection("subscribers");
            const data = await collection.findOne({ usn: req.body.usn });
            console.log(data)
            if(data){
                res.status(200).json({
                    success: true,
                    message: "✅ Successfully Added the user!",
                    data: data
                });
            }
            else {
            console.log("🚫", req.method, "was called and got error!!");
            res.status(405).json({
                success: false,
                data: null,
                message: "🚫 HTTP Method not Allowed"
            });
        }
    } }catch (err: any) {
        errorHandler(err, res, "INTERNAL_SERVER_ERROR");
    }
};
