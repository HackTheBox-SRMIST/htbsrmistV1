import { NextApiRequest, NextApiResponse } from "next";
import { Team } from "../../../utils/schema/Team";
import { connectToDatabase } from "../../../utils/connect";
//Static Routing
export default async function getTeams(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await connectToDatabase();
    const teams = await Team.find();
    res.json(teams);
  } catch (err) {
    console.log(err);
    res.status(500).send("error");
  }
}
