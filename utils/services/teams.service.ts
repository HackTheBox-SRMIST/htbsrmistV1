import { Document } from "mongodb";
import { DBInstance } from "../db.connect";

export const Teams = async (): Promise<Document> => {
    try {
        const db = await DBInstance.getInstance().getCollection("teams");
        const teamItems = await db.find({}).toArray();
        return teamItems;
    } catch (err: any) {
        console.error(err.message);
        return err.message;
    }
};
