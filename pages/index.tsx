import type { NextPage } from "next";
import Head from "next/head";
import Nav from "../components/navbar";
import MeetupLogo from "../utils/icons/Meetup";
import DiscordLogo from "../utils/icons/Discord";
import Footer from "../components/footer";
import Posts from "../components/Posts";
const Index: NextPage = () => {
    const posts = [""];
    return (
        <div className="bg-hackerfooter bg-no-repeat bg-bottom text-white ml-8 md:ml-20">
            <p className="md:text-7xl ml-1.5 text-4xl my-2">
                <strong>HACK</strong>THE<strong>BOX</strong>
            </p>
            <p className="font-bold md:text-xl ml-1.5">
                <strong>
                    Meetup: Chennai, IN <br />
                    Supported by: SRMIST
                </strong>
            </p>
            <p className="ml-1.5 mb-2 mt-3 pr-8 text-justify">
                HackTheBox SRMIST focuses on training the next-gen of
                cyber-warriors transforming the cyber space in SRMIST and
                beyond.
            </p>
            <button className="text-[#141D2B] bg-[#A4B1CD] px-8 inline-flex mt-6 rounded-md hover:bg-htb-green opacity-70 hover:opacity-100">
                <MeetupLogo />
                <p className="my-1 mx-2 font-bold">MEETUP FORM</p>
            </button>
            <p className="text-justify pr-8 md:pr-40 mt-6">
                Anyone who is interested in cybersecurity and penetration
                testing should join this group. The purpose of the meetup is to
                meet other infosec enthusiasts, discuss, exchange knowledge
                regarding cybersecurity, hack machines from Hack The Box
                dedicated to this gathering, and enjoy.
            </p>
            <a
                href="https://discord.gg/vpWEV7bhms"
                target="_blank"
                rel="noopener noreferrer"
            >
                <button className="text-[#141D2B] bg-[#A4B1CD] px-5 inline-flex mt-8 rounded-md hover:bg-htb-green opacity-70 hover:opacity-100">
                    <div className="mt-1">
                        <DiscordLogo />
                    </div>
                    <p className="my-1 font-bold px-3">DISCORD SERVER</p>
                </button>
            </a>
            <p className="mt-6">Open for all</p>
            <p className="font-bold mt-6 mb-4 text-lg">
                <strong>POSTS</strong>
            </p>

            <Posts />
        </div>
    );
};

export default Index;
