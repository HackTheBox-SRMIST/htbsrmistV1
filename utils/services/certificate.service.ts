import path from "path";
import { DBInstance } from "../db.connect";
import Jimp from "jimp";

const textOverlay = async (name: string) => {
    const image = await Jimp.read("https://i.imgur.com/yjxu68J.png");
    image.scaleToFit(1300, Jimp.AUTO, Jimp.RESIZE_BEZIER);
    const font = await Jimp.loadFont(Jimp.FONT_SANS_64_BLACK);
    image.print(
        font,
        0,
        480,
        {
            text: name,
            alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
            alignmentY: 550
        },
        1300,
        900
    );
    const bufferImage = await image.getBase64Async(Jimp.MIME_PNG);
    return bufferImage;
};

export const Certificates = async (usn: string) => {
    try {
        const db = await (
            await DBInstance.getInstance()
        ).getCollection("events");

        // const student = await db.findOne({ usn });
        // if (!student) {
        //     throw "student error";
        // }

        return await textOverlay(usn);
    } catch (err: any) {
        console.error(err.message);
        return err.message;
    }
};
