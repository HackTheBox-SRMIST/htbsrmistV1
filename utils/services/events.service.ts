import { DBInstance } from "../db.connect";
import { teamsDBSchema, yupTeamsSchema, teamsReqSchema } from "../types/teams";

export const Events = async (
    active: teamsReqSchema | string[]
): Promise<any[]> => {
    // await yupTeamsSchema.validate(active);
    const fetchActive = active === "false" ? false : true;
    const db = await (await DBInstance.getInstance()).getCollection("events");
    const eventItems = await db
        .find<any>({ is_active: fetchActive }, { sort: { index: 1 } })
        .toArray();
    return eventItems;
};
