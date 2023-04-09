import { DBInstance } from "../db.connect";
import Jimp from "jimp-compact";
import plugin from "@jimp/plugin-print";
import path from "path";
const textOverlay = async (
    name: string,
    url: string,
    color: string,
    font_size: string,
    yOffset: string
) => {
    try {
        // const jimp_options: any = {
        //     FONT_64_WHITE: path.resolve(
        //         plugin,
        //         "../../node_modules/jimp-compact/fonts/open-sans/open-sans-32-black/open-sans-32-black.fnt"
        //     ),
        //     FONT_64_BLACK: Jimp.FONT_SANS_64_BLACK,
        //     FONT_32_WHITE: Jimp.FONT_SANS_32_WHITE,
        //     FONT_32_BLACK: Jimp.FONT_SANS_32_BLACK
        // };

        // const jimp_font =
        //     jimp_options[`FONT_${font_size}_${color.toUpperCase()}`];

        const jimp_font = path.resolve(
            plugin +
                `../../../fonts/open-sans/open-sans-${font_size}-${color.toLowerCase()}/open-sans-${font_size}-${color.toLowerCase()}.fnt`
        );

        const image = await Jimp.read(`${url}`);
        image.scaleToFit(1300, Jimp.AUTO, Jimp.RESIZE_BEZIER);
        const font = await Jimp.loadFont(jimp_font);
        image.print(
            font,
            0,
            parseInt(yOffset),
            {
                text: name,
                alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
                alignmentY: 300
            },
            1300,
            900
        );
        const bufferImage = await image.getBase64Async(Jimp.MIME_PNG);
        return { buffer: bufferImage, error: false, error_message: "Success" };
    } catch (error: any) {
        return {
            buffer: null,
            error: true,
            error_message: error.message || "Failed",
            name: null
        };
    }
};

export const Certificates = async (
    email: string,
    event: string,
    type: string
) => {
    try {
        const db = await DBInstance.getInstance();
        const eventsCollection = await db.getCollection("events");
        const eventData = await eventsCollection.findOne({
            event_name: event
        });
        if (!eventData) {
            return {
                certificate: null,
                error: true,
                error_message: `No events found with name : ${event}`,
                name: null
            };
        }

        const certificateURL = eventData.certificate[type];
        const userCollection = await db.getCollection(
            eventData.collection[type],
            eventData.database
        );
        const userData = await userCollection.findOne({
            email: email
        });
        if (!userData) {
            return {
                certificate: null,
                error: true,
                error_message: `No User found with email : ${email} in ${type} collection`,
                name: null
            };
        }

        const { buffer, error, error_message } = await textOverlay(
            userData.name,
            certificateURL,
            eventData.jimp_config.color,
            eventData.jimp_config.font_size,
            eventData.jimp_config.yOffset
        );

        if (error) {
            return {
                certificate: null,
                error: true,
                error_message: error_message,
                name: null
            };
        }
        return {
            certificate: buffer,
            error: false,
            error_message: "Success",
            name: userData.name
        };
    } catch (err: any) {
        console.error(err.message);
        return {
            certificate: null,
            error: true,
            error_message: err.message || "Failed",
            name: null
        };
    }
};
