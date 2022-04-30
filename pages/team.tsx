import type { NextPage } from "next";
import Head from "next/head";
import Nav from "../components/navbar";
import Footer from "../components/footer";
import LinkedInLogo from "../utils/icons/LinkedInLogo";
import GithubLogo from "../utils/icons/GithubLogo";
import TwitterLogo from "../utils/icons/TwitterLogo";
import { ReactChild, ReactFragment, ReactPortal } from "react";
const Team: NextPage = ({ data }: any) => {
    return (
        <div className="w-full">
            <Head>
                <title>Team | HackTheBox SRMIST</title>
                <meta name="title" content="HackTheBox SRMIST" />
                <meta
                    name="description"
                    content="HackTheBox SRMIST focuses on training the next-gen of cyber-warriors transforming cyberspace in SRMIST and beyond."
                />
                <meta
                    name="keywords"
                    content="hack the box, hackthebox srmist, htbsrmist, cybersecurity, hacking, hack the box meetup, meetup, chennai, srmist"
                />
                <meta name="language" content="English" />
                <meta name="author" content="HackTheBox SRMIST" />
                <meta
                    name="copyright"
                    content="All rights reserved | HackTheBox SRMIST"
                />
                <meta httpEquiv="content-language" content="en" />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://www.htbsrmist.tech" />
                <meta property="og:title" content="HackTheBox SRMIST" />
                <meta
                    property="og:description"
                    content="HackTheBox SRMIST focuses on training the next-gen of cyber-warriors transforming cyberspace in SRMIST and beyond."
                />
                <meta property="og:image" content="/favicon.svg" />
                <meta property="twitter:card" content="summary_large_image" />\
                <meta
                    property="twitter:url"
                    content="https://www.htbsrmist.tech"
                />
                <meta property="twitter:site" content="@htbsrmist" />
                <meta
                    property="twitter:title"
                    content="HackTheBox SRMIST focuses on training the next-gen of cyber-warriors transforming cyberspace in SRMIST and beyond."
                />
                <meta
                    property="twitter:description"
                    content="HackTheBox SRMIST focuses on training the next-gen of cyber-warriors transforming cyberspace in SRMIST and beyond."
                />
                <meta property="twitter:image" content="/favicon.svg" />
                <link rel="icon" href="/favicon.svg" />
            </Head>
            <Nav />
            <p className="text-4xl mx-10 lg:mx-20 md:text-6xl text-htb-green text-bold md:ml-16">
                <strong>OUR TEAM</strong>
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3  my-6 justify-center">
                {/* {members.map(member => ( */}
                {data.map(
                    (member: {
                        pictureUrl: string | undefined;
                        name:
                            | boolean
                            | ReactChild
                            | ReactFragment
                            | ReactPortal
                            | null
                            | undefined;
                        caption:
                            | boolean
                            | ReactChild
                            | ReactFragment
                            | ReactPortal
                            | null
                            | undefined;
                        socials: {
                            linkedin: string | undefined;
                            github: string | undefined;
                            twitter: string | undefined;
                        };
                    }) => (
                        <div className="">
                            <figure className="md:flex flex-col rounded-xl md:p-0 hover:bg-hacker-grey hover:bg-opacity-70 dark:bg-slate-800 py-8 w-full md:max-w-4/5 items-center min-h-[28em] relative mr-0">
                                <img
                                    className="w-24 h-24 md:w-48 md:h-[12em] rounded-full mx-auto mt-4"
                                    src={member.pictureUrl}
                                    alt=""
                                    width="384"
                                    height="512"
                                    style={{objectFit: "cover"}}
                                />
                                <div className="pt-6 text-center space-y-4 px-8">
                                    <figcaption className="font-medium text-center ">
                                        <div className="text-white text-xl font-bold hover:text-htb-green">
                                            <strong>{member.name}</strong>
                                        </div>
                                    </figcaption>
                                    <blockquote>
                                        <p className="text-lg font-medium text-white text-center  break-all">
                                            {/* {member.description} */}
                                            {member.caption}
                                        </p>
                                    </blockquote>
                                    <div className="flex justify-center space-x-3 absolute bottom-8 left-[7.5rem] ">
                                        <a
                                            href={member.socials.linkedin}
                                            target="_blank"
                                            className="rounded-full opacity-60 hover:opacity-100"
                                        >
                                            <LinkedInLogo />
                                        </a>
                                        <a
                                            href={member.socials.github}
                                            target="_blank"
                                            className="rounded-full opacity-60 hover:opacity-100"
                                        >
                                            <GithubLogo />
                                        </a>
                                        <a
                                            href={member.socials.twitter}
                                            target="_blank"
                                            className="rounded-full opacity-60 hover:opacity-100"
                                        >
                                            <TwitterLogo />
                                        </a>
                                    </div>
                                </div>
                            </figure>
                        </div>
                    )
                )}
            </div>
            <Footer />
        </div>
    );
};

const url_root = process.env.BASE_URL_PREVIEW;
export async function getServerSideProps() {
    const TeamMember: {
        caption: string;
        domain: string;
        index: number;
        isCurrent: boolean;
        joined: number;
        name: string;
        pictureUrl: string;
        position: string;
        socials: {
            github: string;
            linkdin: string;
            twitter: string;
            website: string;
        };
    }[] = [];
    const res = await fetch(`${url_root}/api/v1/teams/?current=true`);
    const body = await res.json();
    const data = body.data;
    console.log(data);
    return { props: { data } };
}

export default Team;
