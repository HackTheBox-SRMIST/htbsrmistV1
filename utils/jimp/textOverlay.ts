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
        if (!color || !font_size || !yOffset) {
            console.error("Missing required image config values:", {
                color,
                font_size,
                yOffset
            });
            return {
                buffer: null,
                error: true,
                error_message: "Missing required image config values."
            };
        }

        const fontKey = `FONT_${font_size}_${color.toUpperCase()}`;
        // console.log("Constructed fontKey:", fontKey);

        if (!jimpOptions[fontKey]) {
            console.error("Invalid font options:", jimpOptions, fontKey);
            return {
                buffer: null,
                error: true,
                error_message: `Invalid font combination: ${fontKey}`
            };
        }

        // console.log("Font URL:", jimpOptions[fontKey]);
        const font = await Jimp.loadFont(jimpOptions[fontKey]);

        if (!font) {
            console.error("Failed to load font:", { color, font_size });
            return {
                buffer: null,
                error: true,
                error_message: `Invalid font configuration: ${color} ${font_size}`
            };
        }

        // console.log("Image URL:", url);
        const image = await Jimp.read(url);
        image.scaleToFit(1300, Jimp.AUTO, Jimp.RESIZE_BEZIER);

        image.print(
            font,
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
        console.error(
            "Error during image processing:",
            (error as Error).message
        );
        return {
            buffer: null,
            error: true,
            error_message: (error as Error).message || "Failed"
        };
    }
};

export default textOverlay;
