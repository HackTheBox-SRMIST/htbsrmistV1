import type { NextPage } from "next";
import Head from "next/head";
import Nav from "../components/navbar";
import MeetupLogo from "../utils/icons/Meetup";
import DiscordLogo from "../utils/icons/Discord";
import Footer from "../components/footer";
import Posts from "../components/Posts";
import Image from "next/image";
import heroBanner from "../public/HACKTHEBOX.png";
import heroImage from "../public/heroImage.png";
import homeArrow from "../public/homeArrow.png";

const Index: NextPage = () => {
    const posts = [""];
    return (
        <div className="text-white md:w-11/12 w-full mx-auto font-[share-tech]">
            {/* <div className="border-t border-[#9FEF00] md:w-4/12 w-10/12 m-auto"></div> */}

            <div className="flex w-4/5 m-auto">
                <div className="md:mt-32">
                    <p className=" my-2">
                        <Image src={heroBanner} alt="HACKTHEBOX"></Image>
                    </p>
                    <p className="font-bold md:text-4xl text-xl text-htb-green">
                        <p>Meetup: Chennai, IN</p>
                        <p>Supported by: SRMIST</p>
                    </p>
                </div>
                <div className="ml-64 md:block hidden">
                    <Image src={heroImage} alt="HACKTHEBOX"></Image>
                </div>
            </div>
            <div className="mx-auto w-4/5 md:hidden">
                <Image src={heroImage} alt="HACKTHEBOX"></Image>
            </div>
            <div className="md:flex w-4/5 m-auto justify-start">
                <div className=" text-2xl">
                    <p className="md:w-5/12 md:m-0 mt-4">
                        HackTheBox SRMIST focuses on training the next-gen of
                        cyber-warriors transforming the cyber space in SRMIST
                        and beyond.
                    </p>
                </div>
                <div className="mt-8 -ml-[50%] rotate-[-7deg] md:block hidden">
                    <Image src={homeArrow} alt="HACKTHEBOX"></Image>
                </div>
                <div className="flex justify-center">
                    {" "}
                    <a
                        href="https://www.meetup.com/chennai-in/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <button className="text-[#141D2B] bg-[#9FEF00] px-5 inline-flex mt-8 rounded-md hover:bg-htb-green opacity-70 hover:opacity-100">
                            <div>
                                <MeetupLogo />
                            </div>
                            <p className="my-1.5 font-bold px-3">MEETUP FORM</p>
                        </button>
                    </a>
                </div>
            </div>

            <div className="border-t border-[#9FEF00] md:w-4/12 w-10/12 m-auto my-20"></div>
            <div className="flex w-4/5 mx-auto">
                <p className="text-justify pr-0 md:pr-40 mt-6 text-2xl">
                    <strong className="text-[#9FEF00] text-3xl">Hello! </strong>
                    There Cyber Geeks!! Interested in{" "}
                    <span className="text-[#9FEF00]">cybersecurity</span> and
                    <span className="text-[#9FEF00]">
                        {" "}
                        Penetration testing?{" "}
                    </span>
                    What are you waiting for? Click on the{" "}
                    <span className="text-[#9FEF00]">MEETUP FORM</span> and join
                    Hack the Box community meet-up . The primary goal of this
                    meet-up is to bring together information security
                    aficionados to debate and share their expertise about
                    cybersecurity, hack machines from Hack The Box dedicated to
                    this forum and whoop the cyber fever up!
                </p>
            </div>

            <div className="mt-24">
                <div className="text-[#A5CE39] md:text-2xl text-xs flex justify-center">
                    <strong>JOIN OUR DISCORD SERVER FOR MORE UPDATES</strong>
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
                <div className="border-t border-[#9FEF00] md:w-4/12 w-10/12 m-auto my-20"></div>
            </div>
            {/* <p className="mt-6 text-lg">Open for all</p>
            <p className="font-bold mt-6 mb-4 text-lg uppercase">Posts</p>

            <Posts /> */}
        </div>
    );
};

export default Index;
