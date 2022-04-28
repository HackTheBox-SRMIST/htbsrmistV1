import type { NextPage } from "next";
import Head from "next/head";
import Nav from "../components/navbar";
import Footer from "../components/footer";
import LinkedInLogo from "../utils/icons/LinkedInLogo";
import GithubLogo from "../utils/icons/GithubLogo";
import TwitterLogo from "../utils/icons/TwitterLogo";
import { useEffect } from "react";
const Team: NextPage = ({data}) => {


    const members = [{
        "name": "Supraja P",
        "description": "Faculty convenor of HTBSRMIST",
        "linkdin": "www.linkedin.com",
        "github": "www.github.com",
        "twitter": "www.twitter.com",
        "image": "https://www.cnet.com/a/img/FOblZHSSQ9sBlVbdd0qIxrLRIAI=/940x0/2021/12/13/d319cda7-1ddd-4855-ac55-9dcd9ce0f6eb/unnamed.png"
    },
    {
        "name": "Gita Alekhya Paul",
        "description": "He is an MLH Fellow Alumni, GitHub Extern and a past winner of SIH 2020 internals.",
        "linkdin": "https://www.linkedin.com/in/gitaalekhyapaul/",
        "github": "https://github.com/gitaalekhyapaul",
        "twitter": "https://twitter.com/gitaalekhyapaul",
        "image": "https://i.guim.co.uk/img/media/ef8492feb3715ed4de705727d9f513c168a8b196/37_0_1125_675/master/1125.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=d456a2af571d980d8b2985472c262b31"
    },
    {
        "name": "Vyshakh Nair",
        "description": "I am huge fan of the CyberSecurity world and decided to make it as my career goal.",
        "linkdin": "https://www.linkedin.com/in/vyshakh-nair-763127131/",
        "github": "https://github.com/VyshakhNaiR",
        "twitter": "www.twitter.com",
        "image": "https://cdnwp-s3.benzinga.com/wp-content/uploads/2022/01/31161454/Screen-Shot-2022-01-31-at-4.14.46-PM.jpg"
    },
    {
        "name": "Sudhanshu Srivastava",
        "description": "Cyber Security Enthusiast",
        "linkdin": "https://www.linkedin.com/in/sudhanshu-srivastava-3244071b8/",
        "github": "https://github.com/Codered9",
        "twitter": "www.twitter.com",
        "image": "https://images.complex.com/images/fl_lossy,q_auto,w_910,dpr_auto/urpctlwm3rt7shs5nl3o/adidas-bored-ape-yacht-club-nft-indigo-herz"
    },
    {
        "name": "Aniruddha Ghosh",
        "description": "Linux - Ethical Hacking - Computer Science and Engineering",
        "linkdin": "https://www.linkedin.com/in/aghosh0605/",
        "github": "https://github.com/aghosh0605",
        "twitter": "https://twitter.com/aghosh0605",
        "image": "https://uploads-ssl.webflow.com/5ead65b4cd1146b85071bfdf/608ff1624f685407965b0180_Bored%20Ape%200-%20Image%201.png"
    },
    {
        "name": "Anirudhha S",
        "description": "Faculty convenor of HTBSRMIST",
        "linkdin": "www.linkedin.com",
        "github": "https://github.com/Anirudh-177",
        "twitter": "www.twitter.com",
        "image": "https://lh3.googleusercontent.com/Kup86A-WYztlZh9agUVrW90CFprKzbjKU9Z0jDNbcPzy-mtF77ue68Nn6190u0XKM2vqnqs3bqtus9gLO4Il1yeI-tzBCRjE_ruRwQ=w600"
    },
    {
        "name": "Rajya Vardhan",
        "description": "Faculty convenor of HTBSRMIST",
        "linkdin": "https://www.linkedin.com/in/vardhanrajya08/",
        "github": "https://github.com/vardhanrajya08",
        "twitter": "www.twitter.com",
        "image": "https://imageio.forbes.com/specials-images/imageserve/619f0b20054410a70d025b70/Jenkins-the-valet-at-Bored-Ape-Yacht-Club/960x0.jpg?fit=bounds&format=jpg&width=960"
    },
    {
        "name": "Pragya Agarwal",
        "description": "Creatives Admin",
        "linkdin": "https://www.linkedin.com/in/pragya-agarwal-bb4019214/",
        "github": "www.github.com",
        "twitter": "www.twitter.com",
        "image": "https://img.currency.com/imgs/articles/834xx/BAYC-Adidas.jpg"
    },
    {
        "name": "Jerin Joy",
        "description": "Corporate Admin",
        "linkdin": "https://www.linkedin.com/in/jerin-joy18/",
        "github": "www.github.com",
        "twitter": "www.twitter.com",
        "image": "https://pbs.twimg.com/media/FFndFgoXIAoDdzu?format=jpg&name=large"
    },]
    return (
        <div className="">
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
            <p className="text-4xl mx-10 lg:mx-20 md:text-6xl text-htb-green text-bold md:ml-16"><strong>OUR TEAM</strong></p>
            <div className="grid md:grid-cols-3 gap-8 md:gap-20 my-6 mx-8 md:mx-28 lg:mx-48">
                {/* {members.map(member => ( */}
                {data.map(member => (

                    <div>
                        <figure className="md:flex flex-col rounded-xl lg:p-8 md:p-0 hover:bg-hacker-grey hover:bg-opacity-70 dark:bg-slate-800 ">
                            <img className="w-24 h-24 md:w-48 md:h-auto rounded-full mx-auto mt-4" src={member.image} alt="" width="384" height="512" />
                            <div className="pt-6 lg:p-8 text-center md:text-left space-y-4">
                                <figcaption className="font-medium text-center ">
                                    <div className="text-white text-xl font-bold hover:text-htb-green">
                                        <strong>{member.name}</strong>
                                    </div>
                                </figcaption>
                                <blockquote>
                                    <p className="text-lg font-medium text-white text-center lg:px-[2em]">
                                        {/* {member.description} */}
                                        {member.caption}
                                    </p>
                                </blockquote>
                                <div className="flex justify-center">
                                    <a href={member.socials.linkdin} target='_blank' className="rounded-full opacity-60 hover:opacity-100 mx-2">
                                        <LinkedInLogo />
                                    </a>
                                    <a href={member.socials.github} target='_blank' className="rounded-full opacity-60 hover:opacity-100 mx-2">

                                        <GithubLogo />
                                    </a>
                                    <a href={member.socials.twitter} target='_blank' className="rounded-full opacity-60 hover:opacity-100 mx-2">
                                        <TwitterLogo />
                                    </a>
                                </div>
                            </div>
                        </figure>
                    </div>
                ))}
            </div>
            <Footer />
        </div>
    )
}

export async function getServerSideProps() {
    const TeamMember: {
        caption: string,
        domain: string,
        index: number,
        isCurrent: boolean,
        joined: number,
        name: string,
        pictureUrl: string,
        position: string,
        socials: {
            github: string,
            linkdin: string,
            twitter: string, website: string
        }
    }[] = []
    const res = await fetch(
        `http://localhost:3000/api/v1/teams/`
    )
    const body = await res.json()
    const data = body.data
    return {props: {data}}
}

export default Team;