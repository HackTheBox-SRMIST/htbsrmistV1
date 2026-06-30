import Image from "next/image";
import { FaGithub, FaInstagram, FaLink, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import Social from "./social";

const socialIcons = {
    github: <FaGithub />,
    linkedin: <FaLinkedin />,
    twitter: <FaXTwitter />,
    website: <FaLink />
};

const Member = (props: any) => {
    return (
        <div className="text-white flex flex-col items-center py-8 mt-3 transition duration-300 px-0 w-auto rounded-3xl relative group">
            <img
                src={props.image}
                className="rounded-full border-2 border-solid border-htb-green/50 p-1 w-36 h-36 bg-cover bg-center object-cover brightness-125 transition duration-300 group-hover:shadow-[0_0_2px_#8bef00,inset_0_0_2px_#8bef00,0_0_5px_#8bef00,0_0_15px_#8bef00]"
            />

            <span className="text-2xl pt-5 text-htb-green font-semibold">
                {props.name}
            </span>
            <span className="text-xl text-htb-green">{props.domain}</span>
            {props.servedSince && (
                <span className="text-sm px-3 py-1 bg-transparent text-zinc-300 border border-zinc-300/40 rounded-full mt-2 font-mono font-semibold shadow-[0_0_8px_#8bef00/25]">
                    {props.servedSince}
                </span>
            )}
            <span className="text-center break-words w-64">
                {props.caption}
            </span>
            <span className="flex pt-5 gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {(props.socials.linkedin)?(props.socials.linkedin.length >6) ? (
                    <Social
                        link={props.socials.linkedin}
                        logo={socialIcons.linkedin}
                    />
                ) : (
                    ""
                ):""}
                {(props.socials.twitter) ?(props.socials.twitter.length>6)? (
                    <Social
                        link={props.socials.twitter}
                        logo={socialIcons.twitter}
                    />
                ) : (
                    ""
                ):""}
                {(props.socials.website) ?(props.socials.website.length>6)? (
                    <Social
                        link={props.socials.website}
                        logo={props.socials.website.toLowerCase().includes("instagram.com") ? <FaInstagram /> : socialIcons.website}
                    />
                ) : (
                    ""
                ):""}
                {(props.socials.github )?(props.socials.github.length >6) ? (
                    <Social
                        link={props.socials.github}
                        logo={socialIcons.github}
                    />
                ) : (
                    ""
                ):""}
            </span>
        </div>
    );
};

export default Member;

