import type { NextPage } from "next";
import Head from "next/head";
import Nav from "../components/navbar";
import MeetupLogo from "../utils/icons/Meetup";
import DiscordLogo from "../utils/icons/Discord";
import Footer from "../components/footer";
import Posts from "../components/Posts";
import Image from "next/image";
import heroBanner from "../public/HACKTHEBOX.png";
import heroDesc from "../public/heroDesc.png";
import heroImage from "../public/heroImage.png";
import homeArrow from "../public/homeArrow.png";

const Index: NextPage = () => {
    const posts = [""];
    return (
        <div className="text-white mx-56 w4/5">
            <div className="border-t border-[#9FEF00] w-4/12 m-auto"></div>
            <div className="flex">
                <div className="mt-32">
                    <p className="md:text-7xl ml-1.5 text-4xl my-2">
                        <Image src={heroBanner} alt="HACKTHEBOX"></Image>
                    </p>
                    <p className="font-bold md:text-xl ml-1.5">
                        <Image src={heroDesc} alt="Hero description"></Image>
                    </p>
                </div>
                <div className="ml-64 mt-28">
                    <Image src={heroImage} alt="HACKTHEBOX"></Image>
                </div>
            </div>
            <div className="flex">
                <div className=" text-xl font-medium">
                    <p>
                        HackTheBox SRMIST focuses on training the <br />{" "}
                        next-gen of cyber-warriors transforming <br /> the cyber
                        space in SRMIST and beyond.
                    </p>
                </div>
                <div className="mt-8 -ml-8 rotate-[-7deg]">
                    <Image src={homeArrow} alt="HACKTHEBOX"></Image>
                </div>
                <div className="mt=8">
                    <button className="text-[#141D2B] bg-htb-green px-8 inline-flex mt-6 rounded-md hover:bg-htb-green opacity-70 hover:opacity-100 ">
                        <MeetupLogo />
                        <p className="mt-2 mx-2 font-bold">MEETUP FORM</p>
                    </button>
                </div>
            </div>
            <div className="border-t border-[#9FEF00] w-4/12 m-auto my-20"></div>

            <a
                href="https://www.meetup.com/chennai-in/"
                target="_blank"
                rel="noopener noreferrer"
            ></a>
            <p className="text-justify pr-8 md:pr-40 mt-6 text-2xl">
                <strong className="text-[#9FEF00] text-3xl">Hello! </strong>
                There Cyber Geeks!! Interested in{" "}
                <span className="text-[#9FEF00]">cybersecurity</span> and
                <span className="text-[#9FEF00]"> Penetration testing? </span>
                What are you waiting for? Click on the{" "}
                <span className="text-[#9FEF00]">MEETUP FORM</span> and join
                Hack the Box community meet-up . The primary goal of this
                meet-up is to bring together information security aficionados to
                debate and share their expertise about cybersecurity, hack
                machines from Hack The Box dedicated to this forum and whoop the
                cyber fever up!
            </p>

            <div className="mt-24">
                <div className="text-[#A5CE39] text-2xl flex justify-center">
                    <strong className="">
                        JOIN OUR DISCORD SERVER FOR MORE UPDATES
                    </strong>
                </div>
                <div className="flex justify-center">
                    {" "}
                    <a
                        href="https://discord.gg/vpWEV7bhms"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <button className="text-[#141D2B] bg-[#9FEF00] px-5 inline-flex mt-8 rounded-md hover:bg-htb-green opacity-70 hover:opacity-100">
                            <div className="mt-1.5">
                                <DiscordLogo />
                            </div>
                            <p className="my-1.5 font-bold px-3">
                                DISCORD SERVER
                            </p>
                        </button>
                    </a>
                </div>
                <div className="border-t border-[#9FEF00] w-4/12 m-auto my-20"></div>
            </div>
            {/* <p className="mt-6 text-lg">Open for all</p>
            <p className="font-bold mt-6 mb-4 text-lg uppercase">Posts</p>

            <Posts /> */}
        </div>
    );
};

export default Index;
