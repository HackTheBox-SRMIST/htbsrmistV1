import { NextApiRequest, NextApiResponse } from "next";
import errorHandler from "../../../../utils/error/errorHandler";
import { DBInstance } from "../../../../utils/db.connect";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        if (req.method == "POST") {
            console.log(req.body);
            const { usn, name, email, dept, isSrmite, database } = req.body;
            const dbInstance = await DBInstance.getInstance();
            const collection = await dbInstance.getCollection(
                "registrations",
                database
            );
            const data = await collection.insertOne({
                usn,
                name,
                email,
                dept,
                isSrmite
            });
            res.status(200).json({
                success: true,
                message: `✅ Successfully Registered user ${name}`,
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
