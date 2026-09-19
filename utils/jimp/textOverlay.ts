import Jimp from "jimp-compact";

// In-memory cache for parsed fonts (0ms subsequent loads)
const fontCache = new Map<string, any>();

// In-memory cache for downloaded and pre-scaled base certificate templates
const templateCache = new Map<string, any>();

// Direct mappings to local built-in Jimp Open Sans fonts (avoids slow network downloads from ImageKit)
const BUILTIN_FONTS: Record<string, string> = {
    FONT_64_WHITE: Jimp.FONT_SANS_64_WHITE,
    FONT_64_BLACK: Jimp.FONT_SANS_64_BLACK,
    FONT_32_WHITE: Jimp.FONT_SANS_32_WHITE,
    FONT_32_BLACK: Jimp.FONT_SANS_32_BLACK,
    FONT_16_WHITE: Jimp.FONT_SANS_16_WHITE,
    FONT_16_BLACK: Jimp.FONT_SANS_16_BLACK,
    FONT_128_WHITE: Jimp.FONT_SANS_128_WHITE,
    FONT_128_BLACK: Jimp.FONT_SANS_128_BLACK
};

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
        const fontSource =
            BUILTIN_FONTS[fontKey] || (jimpOptions && jimpOptions[fontKey]);

        if (!fontSource) {
            console.error("Invalid font options:", jimpOptions, fontKey);
            return {
                buffer: null,
                error: true,
                error_message: `Invalid font combination: ${fontKey}`
            };
        }

        // Check font cache first, or load and cache font
        let font = fontCache.get(fontSource);
        if (!font) {
            font = await Jimp.loadFont(fontSource);
            if (font) {
                fontCache.set(fontSource, font);
            }
        }

        if (!font) {
            console.error("Failed to load font:", { color, font_size });
            return {
                buffer: null,
                error: true,
                error_message: `Invalid font configuration: ${color} ${font_size}`
            };
        }

        // Check template cache first, or download, scale and cache base template
        let baseImage = templateCache.get(url);
        if (!baseImage) {
            baseImage = await Jimp.read(url);
            baseImage.scaleToFit(1300, Jimp.AUTO, Jimp.RESIZE_BEZIER);
            templateCache.set(url, baseImage);
        }

        // Clone base image in memory so printing text doesn't mutate cached template
        const image = baseImage.clone();

        image.print(
            font,
            0,
            parseInt(yOffset) || 0,
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
