import { connectToDatabase } from "../../../utils/db.connect";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { db } = await connectToDatabase();
        //verify connection
        await db.command({ ping: 1 });
        const teamData = await db.collection("teams").find().toArray();

        res.status(200).json({
            success: true,
            message: "Successfully fetched!",
            data: teamData
        });
    } catch (err: any) {
        console.error(err.message);
        res.status(500).json({
            success: false,
            message:
                "It seems as the database refused to connect. Kindly check your connection."
        });
    }
};
