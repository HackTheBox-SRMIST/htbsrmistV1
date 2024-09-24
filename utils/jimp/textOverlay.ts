import Jimp from "jimp-compact";

const textOverlay = async (
    name: string,
    url: string,
    color: string,
    font_size: string,
    yOffset: string,
    jimpOptions: any
): Promise<{
    buffer: string | null;
    error: boolean;
    error_message?: string;
}> => {
    try {
        let font;
        if (color === "WHITE" && font_size === "64") {
            font = Jimp.FONT_SANS_64_WHITE;
        } else if (color === "BLACK" && font_size === "64") {
            font = Jimp.FONT_SANS_64_BLACK;
        } else if (color === "WHITE" && font_size === "32") {
            font = Jimp.FONT_SANS_32_WHITE;
        } else if (color === "BLACK" && font_size === "32") {
            font = Jimp.FONT_SANS_32_BLACK;
        }

        if (!font) {
            return {
                buffer: null,
                error: true,
                error_message: `Invalid font configuration: ${color} ${font_size}`
            };
        }

        const loadedFont = await Jimp.loadFont(font);
        const image = await Jimp.read(url);
        image.scaleToFit(1300, Jimp.AUTO, Jimp.RESIZE_BEZIER);

        image.print(
            loadedFont,
            0,
            parseInt(yOffset),
            {
                text: name,
                alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
                alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE
            },
            1300,
            900
        );

        const bufferImage = await image.getBase64Async(Jimp.MIME_PNG);
        return { buffer: bufferImage, error: false, error_message: "Success" };
    } catch (error) {
        return {
            buffer: null,
            error: true,
            error_message: (error as Error).message || "Failed"
        };
    }
};

export default textOverlay;
