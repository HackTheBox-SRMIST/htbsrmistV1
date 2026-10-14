import React from "react";

interface SocialProps {
    link?: string;
    logo: React.ReactNode;
}

export const isValidSocialUrl = (url?: string): boolean => {
    if (!url || typeof url !== "string") return false;
    const trimmed = url.trim();
    if (trimmed.length <= 2) return false;
    const lower = trimmed.toLowerCase();
    if (["na", "n/a", "nil", "none", "-", ".", "null", "undefined", "n.a."].includes(lower)) {
        return false;
    }
    return true;
};

export const formatExternalUrl = (url?: string): string => {
    if (!url) return "#";
    const trimmed = url.trim();
    if (!trimmed) return "#";

    // Extract URL if embedded in text
    const match = trimmed.match(/(https?:\/\/[^\s]+)/i);
    if (match) {
        return match[1];
    }

    if (/^(https?:\/\/|\/\/|mailto:|tel:)/i.test(trimmed)) {
        return trimmed;
    }
    return `https://${trimmed}`;
};

const Social = (props: SocialProps) => {
    const formattedLink = formatExternalUrl(props.link);

    return (
        <a
            href={formattedLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-400 hover:bg-htb-green hover:text-black ease-linear duration-150 rounded-full p-1 text-xl sm:text-2xl transition-all hover:scale-110 flex items-center justify-center shrink-0"
        >
            {props.logo}
        </a>
    );
};

export default Social;

