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
        <div className="text-white flex flex-col items-center py-10 px-3 lg:px-10 w-auto lg:w-1/3 ">
            <img
                src="https://i.ndtvimg.com/i/2017-03/rowan-atkinson_640x480_71490079191.jpg"
                // src={props.image}
                className="rounded-full border-2 border-solid border-htb-green/50  p-1 w-52 h-52 hover:w-64 hover:h-64 ease-in-out duration-300"
            />
            <span className="text-3xl pt-5 text-htb-green font-semibold">
                {props.name}
            </span>
            <span className="text-xl text-htb-green">{props.domain}</span>
            <span className="text-center break-all w-80">{props.caption}</span>
            <span className="flex pt-5 gap-3">
                {props.socials.linkedin ? (
                    <Social
                        link={props.socials.linkedin}
                        logo={socialIcons.linkedin}
                    />
                ) : (
                    ""
                )}
                {props.socials.twitter ? (
                    <Social
                        link={props.socials.twitter}
                        logo={socialIcons.twitter}
                    />
                ) : (
                    ""
                )}
                {props.socials.website ? (
                    <Social
                        link={props.socials.website}
                        logo={socialIcons.website}
                    />
                ) : (
                    ""
                )}
                {props.socials.github ? (
                    <Social
                        link={props.socials.github}
                        logo={socialIcons.github}
                    />
                ) : (
                    ""
                )}
            </span>
        </div>
    );
};

export default Member;
