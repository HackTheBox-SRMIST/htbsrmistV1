import { DBInstance } from "../db.connect";
import { eventsDBSchema } from "../types/event";

export const Events = async (
    fetchCurrent: boolean
): Promise<eventsDBSchema[]> => {
    try {
        const db = await (
            await DBInstance.getInstance()
        ).getCollection("event");

        const eventItems = await db
            .find<eventsDBSchema>(
                { isCurrent: fetchCurrent },
                { sort: { index: 1 } }
            )
            .toArray();
        return eventItems;
    } catch (err: any) {
        console.error(err.message);
        return err.message;
    }
};
