import { NextApiRequest, NextApiResponse } from "next";
import errorHandler from "../../../../utils/error/errorHandler";
import { DBInstance } from "../../../../utils/db.connect";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        if (req.method == "POST") {
            console.log(req.body,"Success");
            const dbInstance = await DBInstance.getInstance();
            await dbInstance.changeDatabase(req.body.eventName);
            const collection = await dbInstance.getCollection("participants");
            await collection.insertOne({ email : req.body.email , usn : req.body.usn , 
                                        name : req.body.name , phone : req.body.phone , designation : req.body.designation , 
                                        department : req.body.designation , section : req.body.section , checkin : {status : false , date_time : null},
                                        checkout : {status : false , date_time : null} , snacks : {status : false , date_time : null} , certificate : {email_uid : req.body.email , status: false , date_time : null} ,
                                        is_onsite : false , is_rsvp : false
                                        });
            res.status(200).json({
                success: true,
                message: "✅ Successfully Added the user!",
            });
    } }catch (err: any) {
        errorHandler(err, res, "INTERNAL_SERVER_ERROR");
    }
};
