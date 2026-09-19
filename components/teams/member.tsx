import React from "react";
import { FaGithub, FaInstagram, FaLink, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import Social from "./social";

const socialIcons = {
    github: <FaGithub />,
    linkedin: <FaLinkedin />,
    twitter: <FaXTwitter />,
    website: <FaLink />
};

function getTransformedImageUrl(url?: string): string {
    if (!url) return "";
    if (url.includes("ik.imagekit.io")) {
        try {
            const urlObj = new URL(url);
            const existingTr = urlObj.searchParams.get("tr");
            if (!existingTr) {
                urlObj.searchParams.set("tr", "w-500,h-500,fo-auto");
                return urlObj.toString();
            } else if (!existingTr.includes("w-") && !existingTr.includes("h-")) {
                urlObj.searchParams.set("tr", `${existingTr},w-500,h-500,fo-auto`);
                return urlObj.toString();
            }
            return url;
        } catch {
            const separator = url.includes("?") ? "&" : "?";
            if (!url.includes("tr=")) {
                return `${url}${separator}tr=w-500,h-500,fo-auto`;
            }
        }
    }
    return url;
}

const Member = (props: any) => {
    const imageUrl = getTransformedImageUrl(props.image);
    const hasSocials = Boolean(
        (props.socials?.linkedin && props.socials.linkedin.length > 6) ||
        (props.socials?.twitter && props.socials.twitter.length > 6) ||
        (props.socials?.website && props.socials.website.length > 6) ||
        (props.socials?.github && props.socials.github.length > 6)
    );

    return (
        <div className="text-white flex flex-col items-center justify-start w-full h-full relative group transition duration-300 text-center py-1">
            {/* Green Box Container: uniform height across all members in the row */}
            <div className="w-full h-full rounded-2xl border-2 border-solid border-htb-green/50 p-2 sm:p-2.5 bg-black/40 flex flex-col justify-between items-center transition duration-300 group-hover:border-htb-green group-hover:shadow-[0_0_2px_#8bef00,inset_0_0_2px_#8bef00,0_0_5px_#8bef00,0_0_15px_#8bef00]">
                {/* Top Section: Photo, Name, Domain, ServedSince, Caption */}
                <div className="w-full flex flex-col items-center">
                    {/* Square Photo with Rounded Corners (centralized via ImageKit + object-center) */}
                    <div className="w-full aspect-square rounded-xl overflow-hidden mb-1 sm:mb-1.5 bg-[#060a12] shrink-0 border border-white/10">
                        {imageUrl ? (
                            <img
                                src={imageUrl}
                                alt={props.name || "Member"}
                                loading="lazy"
                                decoding="async"
                                className="w-full h-full object-cover object-center brightness-105 group-hover:scale-105 transition-transform duration-300"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-3xl sm:text-4xl font-mono font-bold text-htb-green/50">
                                {props.name ? props.name[0] : "?"}
                            </div>
                        )}
                    </div>

                    {/* Member Name */}
                    <div className="min-h-[1.85rem] sm:min-h-[2.2rem] flex items-center justify-center w-full px-1">
                        <span className="text-[15px] min-[380px]:text-base sm:text-[17px] md:text-[18px] text-htb-green font-bold text-center leading-tight break-words line-clamp-2">
                            {props.name}
                        </span>
                    </div>

                    {/* Domain Badge */}
                    <div className="min-h-[1.4rem] sm:min-h-[1.5rem] flex items-center justify-center w-full mt-0.5">
                        {props.domain && (
                            <span className="inline-block text-xs sm:text-[13.5px] font-mono font-bold uppercase tracking-wider text-htb-green bg-htb-green/10 border border-htb-green/30 px-2 sm:px-2.5 py-0.5 rounded-full shadow-[0_0_8px_rgba(159,239,0,0.2)] truncate max-w-[95%]">
                                {props.domain}
                            </span>
                        )}
                    </div>

                    {/* Served Since (for Founders & Convenors) */}
                    {props.servedSince && (
                        <span className="text-[10px] sm:text-xs px-2 py-0.5 bg-transparent text-zinc-300 border border-zinc-300/40 rounded-full mt-0.5 font-mono font-semibold shadow-[0_0_8px_rgba(139,239,0,0.25)]">
                            {props.servedSince}
                        </span>
                    )}

                    {/* Caption / Tag Line (given 3-line capacity) */}
                    <div className="min-h-[2.5rem] sm:min-h-[2.8rem] flex items-center justify-center w-full mt-0.5 sm:mt-1 px-1">
                        {props.caption ? (
                            <span className="text-center text-[11px] sm:text-xs font-semibold text-zinc-200 break-words leading-tight italic line-clamp-3">
                                &ldquo;{props.caption}&rdquo;
                            </span>
                        ) : null}
                    </div>
                </div>

                {/* Bottom Section: Social Icons pinned to bottom with consistent min-height */}
                <div className="w-full flex pt-1 sm:pt-1.5 gap-1.5 sm:gap-2 justify-center items-center min-h-[2rem] border-t border-white/5 mt-1">
                    {hasSocials ? (
                        <>
                            {props.socials?.linkedin && props.socials.linkedin.length > 6 && (
                                <Social
                                    link={props.socials.linkedin}
                                    logo={socialIcons.linkedin}
                                />
                            )}
                            {props.socials?.twitter && props.socials.twitter.length > 6 && (
                                <Social
                                    link={props.socials.twitter}
                                    logo={socialIcons.twitter}
                                />
                            )}
                            {props.socials?.website && props.socials.website.length > 6 && (
                                <Social
                                    link={props.socials.website}
                                    logo={
                                        props.socials.website.toLowerCase().includes("instagram.com")
                                            ? <FaInstagram />
                                            : socialIcons.website
                                    }
                                />
                            )}
                            {props.socials?.github && props.socials.github.length > 6 && (
                                <Social
                                    link={props.socials.github}
                                    logo={socialIcons.github}
                                />
                            )}
                        </>
                    ) : (
                        <div className="h-6" />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Member;
