import type { NextPage, GetServerSidePropsResult } from "next";

import LinkedInLogo from "../utils/icons/LinkedInLogo";
import GithubLogo from "../utils/icons/GithubLogo";
import TwitterLogo from "../utils/icons/TwitterLogo";

interface MemberProps {
    pictureUrl: string | undefined;
    name: string;
    caption: string;
    socials: {
        linkedin: string | "";
        github: string | "";
        twitter: string | "";
    };
}

interface TeamPageProps {
    members: MemberProps[];
}

const Team: NextPage<TeamPageProps> = ({ members }) => {
    return (
        <section className="w-full min-h-fit bg-none">
            <h1 className="text-4xl mx-10 lg:mx-20 md:text-6xl text-white font-bold md:ml-16 uppercase">
                Our Team
            </h1>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 px-12 gap-8 my-8 justify-center">
                {members.map((member) => (
                    <div
                        key={member.name}
                        className="hover:bg-hacker-grey hover:bg-opacity-70 rounded-xl p-4 transition-all"
                    >
                        <figure className="flex flex-col md:p-0 items-center">
                            <img
                                className="w-40 h-40 rounded-full mx-auto mt-4 border-4 border-htb-green object-cover"
                                src={member.pictureUrl}
                                alt={`HackTheBox SRMIST - ${member.name}`}
                            />
                        </figure>

                        <p className="transition-all text-center text-white text-2xl font-bold hover:text-htb-green mt-4">
                            {member.name}
                        </p>

                        <p className="font-medium text-white text-center break-all mt-3 inline-flex gap-2  w-full justify-center">
                           <p className="text-htb-green font-bold text-3xl -mt-2">#</p> {member.caption}
                        </p>

                        <div className="flex justify-center space-x-8 mt-8">
                            {member.socials.linkedin && (
                                <a
                                    href={member.socials.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="rounded-full opacity-60 hover:opacity-100"
                                >
                                    <LinkedInLogo />
                                </a>
                            )}
                            {member.socials.github && (
                                <a
                                    href={member.socials.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="rounded-full opacity-60 hover:opacity-100"
                                >
                                    <GithubLogo />
                                </a>
                            )}
                            {member.socials.twitter && (
                                <a
                                    href={member.socials.twitter}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="rounded-full opacity-60 hover:opacity-100"
                                >
                                    <TwitterLogo />
                                </a>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

const url_root = process.env.BASE_URL_PREVIEW;

export async function getServerSideProps(): Promise<
    GetServerSidePropsResult<TeamPageProps>
> {
    try {
        const { data: members } = await (
            await fetch(`${url_root}/api/v1/teams/?current=true`)
        ).json();

        return { props: { members } };
    } catch (error) {
        console.log(error);
        return { notFound: true };
    }
}

export default Team;
