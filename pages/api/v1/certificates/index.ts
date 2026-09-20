import { NextApiRequest, NextApiResponse } from "next";
import { DBInstance } from "../../../../utils/db.connect";
import textOverlay from "../../../../utils/jimp/textOverlay";

interface EventCertificateSchema {
    _id: {
        $oid: string;
    };
    event_name: string;
    slug: string;
    rsvpLimit: number;
    event_description: string;
    speakers_details: {
        name: string;
        details: string;
        designation: string;
    }[];
    event_date: string;
    is_active: boolean;
    venue: string;
    sponsors_details: {
        name: string;
        details: string;
        place: string;
    }[];
    duration: number;
    prerequisites: string[];
    cost: number;
    poster_url: string;
    registration_url: string;
    database: string;
    collection: {
        [key: string]: string | undefined;
    };
    certificate: {
        [key: string]: string | undefined;
    };
    jimp_config: {
        yOffset: string;
        color: string;
        font_size: string;
    };
    teamEvent: boolean;
    teamSize: number;
    event_time: string;
}

interface RequestBody {
    email: string;
    event: string;
    type: string;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "POST") {
        const { email, event, type } = req.body as RequestBody;

        if (!email || !event || !type) {
            return res.status(400).json({
                success: false,
                error: "All fields are required."
            });
        }

        try {
            const cleanEmail = email.toLowerCase().trim();
            const normalizedType = type.toLowerCase().trim();

            const dbInstance = await DBInstance.getInstance();
            const eventCollection = await dbInstance.getCollection(
                "events",
                "htbsrmist"
            );
            const eventData = (await eventCollection.findOne({
                slug: event
            })) as EventCertificateSchema | null;

            if (!eventData) {
                return res.status(404).json({
                    success: false,
                    error: `Event not found with slug: ${event}`
                });
            }

            if (!eventData.certificate || !(normalizedType in eventData.certificate)) {
                return res.status(404).json({
                    success: false,
                    error: `Invalid certificate type: ${normalizedType}`
                });
            }

            if (!eventData.collection || !(normalizedType in eventData.collection)) {
                return res.status(404).json({
                    success: false,
                    error: `No collection configured for type: ${normalizedType}`
                });
            }

            const certificateURL = eventData.certificate[normalizedType];

            if (!certificateURL) {
                return res.status(404).json({
                    success: false,
                    error: `Certificate URL is empty for type: ${normalizedType}`
                });
            }

            const collectionName = eventData.collection[normalizedType];

            const userCollection = await dbInstance.getCollection(
                collectionName!,
                eventData.database
            );

            // Match email (direct match first, case-insensitive regex fallback)
            let userData = await userCollection.findOne({ email: cleanEmail });
            if (!userData) {
                userData = await userCollection.findOne({
                    email: {
                        $regex: new RegExp(
                            `^${cleanEmail.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`,
                            "i"
                        )
                    }
                });
            }

            if (!userData || !userData.checkin) {
                return res.status(404).json({
                    success: false,
                    error: `No certificate found for email: ${cleanEmail}`
                });
            }

            const {
                color,
                font_size: fontSize,
                yOffset
            } = eventData.jimp_config;

            const jimpOptions = {
                FONT_64_WHITE:
                    "https://ik.imagekit.io/githubsrm/fonts/open-sans-64-white/open-sans-64-white.fnt?updatedAt=1726944338422",
                FONT_64_BLACK:
                    "https://ik.imagekit.io/githubsrm/fonts/open-sans-64-black/open-sans-64-black.fnt?updatedAt=1726944338432",
                FONT_32_WHITE:
                    "https://ik.imagekit.io/githubsrm/fonts/open-sans-32-white/open-sans-32-white.fnt?updatedAt=1726944338436",
                FONT_32_BLACK:
                    "https://ik.imagekit.io/githubsrm/fonts/open-sans-32-black/open-sans-32-black.fnt?updatedAt=1726944338420"
            };

            const { buffer, error, error_message } = await textOverlay(
                userData.name,
                certificateURL,
                color.toUpperCase(),
                fontSize,
                yOffset,
                jimpOptions
            );

            if (error) {
                return res.status(500).json({
                    success: false,
                    error: error_message
                });
            }

            return res.status(200).json({
                success: true,
                certificate: buffer,
                name: userData.name
            });
        } catch (err) {
            console.error("Error during certificate processing:", (err as Error).message);
            return res.status(500).json({
                success: false,
                error: "Internal Server Error"
            });
        }
    } else {
        return res.status(405).json({
            success: false,
            error: "Method Not Allowed"
        });
    }
}