import { DBInstance } from "../db.connect";
import { teamsDBSchema, yupTeamsSchema, teamsReqSchema } from "../types/teams";

export const Teams = async (
    current: teamsReqSchema | string[]
): Promise<teamsDBSchema[]> => {
    await yupTeamsSchema.validate(current);
    const fetchCurrent = current === "false" ? false : true;
    const db = await (await DBInstance.getInstance()).getCollection("teams");
    const teamItems = await db
        .find<teamsDBSchema>(
            { isCurrent: fetchCurrent },
            { sort: { index: 1 } }
        )
        .toArray();
    return teamItems;
};
