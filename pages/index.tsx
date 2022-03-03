import type { NextPage } from "next";
import Head from "next/head";
import Nav from "../components/navbar";
const Index: NextPage = () => {
    return (
        <div>
            <Head>
                <title>HackTheBox SRMIST</title>
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
                <meta http-equiv="content-language" content="en" />
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
            <div className="flex flex-col justify-center items-center h-screen">
                <img
                    src="/revealed_post.png"
                    alt="Unencrypted Post - HackTheBoxSRMIST"
                    className="my-0 md:w-4/12 w-4/5"
                />
                <a
                    href="https://discord.gg/vpWEV7bhms"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-htb-green md:text-3xl text-2xl font-semibold md:px-8 px-6 py-2 rounded-full mt-16"
                >
                    JOIN US
                </a>
            </div>
        </div>
    );
};

export default Index;
