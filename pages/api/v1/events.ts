import { NextApiHandler } from "next";
const getEvents: NextApiHandler = (req, res) => {
  res.json({
    message: `You have requested events`,
  });
};

export default getEvents;
