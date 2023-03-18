import { DBInstance } from "../db.connect";
import Jimp from "jimp";
import { ObjectId } from "mongodb";

const textOverlay = async (name: string, url: string) => {
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
    //console.log(bufferImage);

    return bufferImage;
};

export const Certificates = async (
    email: string,
    event: string,
    type: string
) => {
    try {
        const dbInstance = await DBInstance.getInstance();
        const eventsCollection = await dbInstance.getCollection("events");
        const eventData = await eventsCollection.findOne({
            _id: new ObjectId(event)
        });
        if (!eventData) {
            throw { message: "No events found with that name" };
        }
        await dbInstance.changeDatabase(eventData.database);
        const participantsCollection = await dbInstance.getCollection(
            eventData.collection
        );
        const participantsData = await participantsCollection.findOne({
            email: email
        });
        if (!participantsData) {
            throw { message: "No participants found with that email" };
        }
        let certificateURL;
        switch (type) {
            case "participant":
                certificateURL = eventData.certificate.participant;
                break;
            case "volunteer":
                certificateURL = eventData.certificate.volunteer;
            case "organizer":
                certificateURL = eventData.certificate.organizer;
            default:
                break;
        }
        return await textOverlay(participantsData.name, certificateURL);
    } catch (err: any) {
        console.error(err.message);
        return err.message;
    }
};
