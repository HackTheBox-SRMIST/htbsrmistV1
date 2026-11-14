import Jimp from "jimp-compact";

// In-memory cache for parsed fonts (0ms subsequent loads)
const fontCache = new Map<string, any>();

// In-memory cache for downloaded and pre-scaled base certificate templates
const templateCache = new Map<string, any>();

// Reliable ImageKit hosted bitmap fonts that work universally across local dev and Vercel serverless environments
const DEFAULT_IMAGEKIT_FONTS: Record<string, string> = {
    FONT_64_WHITE:
        "https://ik.imagekit.io/githubsrm/fonts/open-sans-64-white/open-sans-64-white.fnt?updatedAt=1726944338422",
    FONT_64_BLACK:
        "https://ik.imagekit.io/githubsrm/fonts/open-sans-64-black/open-sans-64-black.fnt?updatedAt=1726944338432",
    FONT_32_WHITE:
        "https://ik.imagekit.io/githubsrm/fonts/open-sans-32-white/open-sans-32-white.fnt?updatedAt=1726944338436",
    FONT_32_BLACK:
        "https://ik.imagekit.io/githubsrm/fonts/open-sans-32-black/open-sans-32-black.fnt?updatedAt=1726944338420"
};

const textOverlay = async (
    name: string,
    url: string,
    color: string,
    font_size: string,
    yOffset: string,
    jimpOptions: any,
    extra?: { xOffset?: string; text_case?: string }
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
        const fallbackUrl =
            (color.toUpperCase() === "WHITE"
                ? DEFAULT_IMAGEKIT_FONTS.FONT_64_WHITE
                : DEFAULT_IMAGEKIT_FONTS.FONT_64_BLACK) ||
            DEFAULT_IMAGEKIT_FONTS.FONT_64_BLACK;

        // Prioritize hosted ImageKit URL so it works in serverless environments (Vercel) without missing file errors
        const fontSource =
            (jimpOptions && jimpOptions[fontKey]) ||
            DEFAULT_IMAGEKIT_FONTS[fontKey] ||
            fallbackUrl;

        // Check font cache first, or load and cache font
        let font = fontCache.get(fontSource);
        if (!font) {
            try {
                font = await Jimp.loadFont(fontSource);
            } catch (loadErr: any) {
                console.warn(
                    `Failed to load font from ${fontSource}:`,
                    loadErr.message
                );
                if (fontSource !== fallbackUrl) {
                    try {
                        font = await Jimp.loadFont(fallbackUrl);
                    } catch (fallbackErr: any) {
                        console.error(
                            `Failed to load fallback font ${fallbackUrl}:`,
                            fallbackErr.message
                        );
                    }
                }
            }
            if (font) {
                fontCache.set(fontSource, font);
            }
        }

        if (!font) {
            console.error("Failed to load font:", { color, font_size, fontSource });
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

        // The CMS designer positions the name on a 1300x900 canvas (template is
        // stretched to that size). Our template is scaled to 1300 wide with its
        // own height, so convert the Y offset proportionally to keep placement identical.
        const imgW = image.bitmap.width;
        const imgH = image.bitmap.height;
        const x = parseInt(extra?.xOffset ?? "0") || 0;
        const y = Math.round(((parseInt(yOffset) || 0) * imgH) / 900);

        let text = name;
        if (extra?.text_case === "uppercase") {
            text = name.toUpperCase();
        } else if (extra?.text_case === "capitalize") {
            text = name
                .toLowerCase()
                .split(" ")
                .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                .join(" ");
        }

        image.print(
            font,
            x,
            y,
            {
                text,
                alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
                alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE
            },
            imgW,
            imgH
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
