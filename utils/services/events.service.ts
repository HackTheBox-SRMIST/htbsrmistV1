import { DBInstance } from "../db.connect";
import { eventsDBSchema } from "../types/event";

export const Events = async (): Promise<eventsDBSchema[]> => {
    try {
        const db = await (
            await DBInstance.getInstance()
        ).getCollection("events");

        const eventItems = await db.find<eventsDBSchema>({}).toArray();
        return eventItems;
    } catch (err: any) {
        console.error(err.message);
        return err.message;
    }
};
