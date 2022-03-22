import { Document } from "mongodb";
import { DBInstance } from "../db.connect";

export const Teams = async (query: string | string[]): Promise<Document> => {
    try {
        const db = await DBInstance.getInstance().getCollection("teams");
        //console.log(query);

        const teamItems = await db.find({ category: query }).toArray();
        return teamItems;
    } catch (err: any) {
        console.error(err.message);
        return err.message;
    }
};
