import { Document } from "mongodb";
import { DBInstance } from "../db.connect";
import { teamsDBSchema } from "../types/team";

export const Teams = async (
    fetchCurrent: boolean
): Promise<teamsDBSchema[]> => {
    try {
        const db = await (
            await DBInstance.getInstance()
        ).getCollection("teams");

        const teamItems = await db
            .find<teamsDBSchema>(
                { isCurrent: fetchCurrent },
                { sort: { index: 1 } }
            )
            .toArray();
        return teamItems;
    } catch (err: any) {
        console.error(err.message);
        return err.message;
    }
};
