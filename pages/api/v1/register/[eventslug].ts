import { NextApiHandler } from "next";
const eventRegister: NextApiHandler = (req, res) => {
    const { eventslug } = req.query;
    res.json({
        message: `You have requested registration of event: ${eventslug}`
    });
};

export default eventRegister;
