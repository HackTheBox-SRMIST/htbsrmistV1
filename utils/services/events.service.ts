import { DBInstance } from "../db.connect";
import { eventsDBSchema } from "../types/event";

export const Events = async (
    fetchActive: boolean
): Promise<eventsDBSchema[]> => {
    try {
        const db = await (
            await DBInstance.getInstance()
        ).getCollection("events");

        const eventItems = await db
            .find<eventsDBSchema>(
                { is_active: fetchActive },
                { sort: { index: 1 } }
            )
            .toArray();
        return eventItems;
    } catch (err: any) {
        console.error(err.message);
        return err.message;
    }
};
