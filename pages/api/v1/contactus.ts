import { NextApiHandler } from "next";
const contactUs: NextApiHandler = (req, res) => {
    res.json({
        message: `You have requested contact us`
    });
};

export default contactUs;
