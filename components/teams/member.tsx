import Image from "next/image";
import { FaGithub, FaLink, FaLinkedin, FaTwitter } from "react-icons/fa";
import Social from "./social";

const socialIcons = {
    github: <FaGithub />,
    linkedin: <FaLinkedin />,
    twitter: <FaTwitter />,
    website: <FaLink />
};

const Member = (props: any) => {
    return (
        <div className="text-white flex flex-col items-center py-4 px-4 w-64 group">
            <div className="relative">
                <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
                <img
                    src={props.image}
                    alt="Member Profile"
                    className="rounded-full w-24 h-24 bg-cover bg-center object-cover filter group-hover:blur-sm transition-all duration-300"
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                    <div className="flex gap-2">
                        {props.socials.linkedin?.length > 6 && (
                            <Social link={props.socials.linkedin} logo={socialIcons.linkedin} />
                        )}
                        {props.socials.github?.length > 6 && (
                            <Social link={props.socials.github} logo={socialIcons.github} />
                        )}
                        {props.socials.twitter?.length > 6 && (
                            <Social link={props.socials.twitter} logo={socialIcons.twitter} />
                        )}
                        {props.socials.website?.length > 6 && (
                            <Social link={props.socials.website} logo={socialIcons.website} />
                        )}
                    </div>
                </div>
            </div>
            <span className="text-lg font-medium mt-2">
                {props.name}
            </span>
            <span className="text-xs text-gray-500 text-center">
                {props.caption}
            </span>
        </div>
    );
};

export default Member;
