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
import Logo from "../public/logo.png";
import HowWeWork from "../components/HowWeWork";
import Life from "../components/life";
const Index: NextPage = () => {
    const posts = [""];
    return (
        <div className="text-white md:w-11/12 w-full mx-auto font-poppins">
            {/* <div className="border-t border-[#9FEF00] md:w-4/12 w-10/12 m-auto"></div> */}

            <div className="flex mt-[100px] m-auto mx-auto items-center justify-around">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="my-2 max-md:w-[350px] w-[600px]">
                            <Image src={heroBanner} alt="HACKTHEBOX"></Image>
                        </p>
                        <p className="font-bold md:text-4xl text-xl text-htb-green">
                            <p>Meetup: Chennai, IN</p>
                            <p>Supported by: SRMIST</p>
                        </p>
                        <button className="text-[#141D2B] bg-htb-green px-5 py-1 inline-flex items-center justify-center mt-8 rounded-2xl hover:bg-htb-green opacity-100 hover:opacity-70 font-dm-sans">
                            <p className="my-1.5 font-bold px-4 text-xl">Join Us</p>
                        </button>
                    </div>
                </div>
                <div className="md:block hidden w-[400px]">
                    <Image src={Logo} alt="HACKTHEBOX"></Image>
                </div>
            </div>
            <div className="mx-auto mt-16 w-4/5 md:hidden">
                <Image src={Logo} alt="HACKTHEBOX"></Image>
            </div>
            <div className="md:flex my-[100px] w-4/5 m-auto justify-start">
                <div className=" text-2xl">
                    <p className="md:w-5/12 md:m-0 mt-4 bg-htb-green px-5 py-7 inline-flex items-center justify-center rounded-2xl opacity-100 font-dm-sans text-black">
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
                        <button className="text-[#141D2B] bg-htb-green px-5 inline-flex items-center justify-center mt-8 rounded-md hover:bg-htb-green opacity-100 hover:opacity-70">
                            <div>
                                <MeetupLogo />
                            </div>
                            <p className="my-1.5 font-bold px-3">MEETUP FORM</p>
                        </button>
                    </a>
                </div>
            </div>

            <HowWeWork />
            <br/>
            <br/>
            <br/>
            <br/>
            <Life />            
        </div>
    );
};

export default Index;
