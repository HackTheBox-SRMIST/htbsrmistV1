import { NextApiHandler } from "next";
const getTeam: NextApiHandler = (req, res) => {
    res.json({
        message: `You have requested team`
    });
};

export default getTeam;
