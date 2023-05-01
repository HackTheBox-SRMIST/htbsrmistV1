import Logo from "../utils/icons/htblogo";
import Link from "next/link";
import { useRouter } from "next/router";
import { FaInstagram } from "react-icons/fa";
import { RxTwitterLogo } from "react-icons/rx";
import { FaLinkedinIn } from "react-icons/fa";
import { FaDiscord } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { SiMedium } from "react-icons/si";
const Footer = () => {
    return (
        <footer className="text-center text-[#5B8E23] lg:text-left bg-[#141D2B]  mb-6 lg:mt-6 rounded-md relative bottom-0 font-poppins ">
            <div className="py-2 text-center lg:text-left">
                <div className="grid grid-1 lg:grid-cols-8 gap-4 justify-items-center lg:justify-items-stretch">
                    <div className="mx-auto mr-1 mt-4 col-start-1 hidden lg:block pt-8">
                        <Logo />
                    </div>
                    <div className="lg:col-span-3 flex flex-col justify-around">
                        <div>
                            <h6 className="uppercase font-semibold mt-6 lg:mt-4 flex items-center justify-center md:justify-center text-center mx-3 lg:mx-0 lg:ml-6 pb-4">
                                Transforming the cyberspace in SRMIST and
                                beyond.
                            </h6>
                        </div>
                        <div className="socials flex place-items-center flex-col justify-items-center items-center mb-1 ml-6">
                            <div className="text-3xl flex flex-row gap-5 sm:gap-10 pb-4">
                                <a
                                    href="https://htbsrmist.medium.com"
                                    className="bg-[#141D2B] hover:bg-htb-green hover:text-black ease-linear duration-150 rounded-full p-1"
                                >
                                    <SiMedium></SiMedium>
                                </a>
                                <a
                                    href="https://www.instagram.com/htbsrmist/"
                                    className="bg-[#141D2B] hover:bg-htb-green hover:text-black ease-linear duration-150 rounded-full p-1"
                                >
                                    <FaInstagram></FaInstagram>
                                </a>
                                <a
                                    href="https://twitter.com/htbsrmist"
                                    className="bg-[#141D2B] hover:bg-htb-green hover:text-black ease-linear duration-150 rounded-full p-1"
                                >
                                    <RxTwitterLogo></RxTwitterLogo>
                                </a>
                                <a
                                    href="https://www.linkedin.com/company/htbsrmist/"
                                    className="bg-[#141D2B] hover:bg-htb-green hover:text-black ease-linear duration-150 rounded-full p-1"
                                >
                                    <FaLinkedinIn></FaLinkedinIn>
                                </a>
                                <a
                                    href="https://github.com/HackTheBox-SRMIST"
                                    className="bg-[#141D2B] hover:bg-htb-green hover:text-black ease-linear duration-150 rounded-full p-1"
                                >
                                    <FaGithub></FaGithub>
                                </a>
                                <a
                                    href="https://discord.gg/8uT6ZnQN6N"
                                    className="bg-[#141D2B] hover:bg-htb-green hover:text-black ease-linear duration-150 rounded-full p-1"
                                >
                                    <FaDiscord></FaDiscord>
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-2 items-center  justify-center">
                        <h6 className="uppercase font-semibold mb-4 lg:mt-4  px-32 ">
                            Explore
                        </h6>

                        <div
                            className=" flex flex-row lg:flex-col justify-center gap-4 md:gap-1.5 md:justify-left
                          lg:justify-start"
                        >
                            <p className="lg:mb-1.5 lg:px-32">
                                <a
                                    href="/"
                                    className="bg-[#141D2B] text-[#5B8E23] hover:text-htb-green"
                                >
                                    Home
                                </a>
                            </p>
                            <p className="lg:mb-1.5 lg:px-32">
                                <a
                                    href="/team"
                                    className="bg-[#141D2B] text-[#5B8E23] hover:text-htb-green"
                                >
                                    Team
                                </a>
                            </p>
                            <p className="lg:mb-1.5 lg:px-32">
                                <a
                                    href="/events"
                                    className="bg-[#141D2B] text-[#5B8E23] hover:text-htb-green"
                                >
                                    Event
                                </a>
                            </p>
                            <p className="lg:px-32 lg:mb-1.5">
                                <a
                                    href="/contact-us"
                                    className="bg-[#141D2B] text-[#5B8E23] hover:text-htb-green"
                                >
                                    Contact Us
                                </a>
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col m-auto">
                        <h6 className="uppercase font-semibold mb-5 flex justify-center lg:justify-start lg:mx-4 lg:mt-4 lg:ml-0 ">
                            Contact
                        </h6>
                        <div className="flex  gap-3 items-top">
                            {/* <p className=" items-center justify-center md:justify-start mb-1 space-x-4  inline-flex "> */}
                            <span className="-mr-1 ml-2 md:ml-0 md:mr-0">
                                <svg
                                    aria-hidden="true"
                                    focusable="false"
                                    data-prefix="fas"
                                    data-icon="home"
                                    className="w-5 "
                                    role="img"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 576 512"
                                >
                                    <path
                                        fill="currentColor"
                                        d="M280.37 148.26L96 300.11V464a16 16 0 0 0 16 16l112.06-.29a16 16 0 0 0 15.92-16V368a16 16 0 0 1 16-16h64a16 16 0 0 1 16 16v95.64a16 16 0 0 0 16 16.05L464 480a16 16 0 0 0 16-16V300L295.67 148.26a12.19 12.19 0 0 0-15.3 0zM571.6 251.47L488 182.56V44.05a12 12 0 0 0-12-12h-56a12 12 0 0 0-12 12v72.61L318.47 43a48 48 0 0 0-61 0L4.34 251.47a12 12 0 0 0-1.6 16.9l25.5 31A12 12 0 0 0 45.15 301l235.22-193.74a12.19 12.19 0 0 1 15.3 0L530.9 301a12 12 0 0 0 16.9-1.6l25.5-31a12 12 0 0 0-1.7-16.93z"
                                    ></path>
                                </svg>
                            </span>
                            <p className="md:justify-start mb-1 space-x-2 inline-flex text-sm">SRM Kattankulathur , Chengalpattu, 603203, IN</p>
                            {/* </p> */}
                        </div>
                        <div className="text-left ml-2 md:ml-0 mt-3.5">
                            <p className="md:justify-start mb-1 space-x-2 inline-flex text-sm">
                                <svg
                                    aria-hidden="true"
                                    focusable="false"
                                    data-prefix="fas"
                                    data-icon="envelope"
                                    className="w-5"
                                    role="img"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 512 512"
                                >
                                    <path
                                        fill="currentColor"
                                        d="M502.3 190.8c3.9-3.1 9.7-.2 9.7 4.7V400c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V195.6c0-5 5.7-7.8 9.7-4.7 22.4 17.4 52.1 39.5 154.1 113.6 21.1 15.4 56.7 47.8 92.2 47.6 35.7.3 72-32.8 92.3-47.6 102-74.1 131.6-96.3 154-113.7zM256 320c23.2.4 56.6-29.2 73.4-41.4 132.7-96.3 142.8-104.7 173.4-128.7 5.8-4.5 9.2-11.5 9.2-18.9v-19c0-26.5-21.5-48-48-48H48C21.5 64 0 85.5 0 112v19c0 7.4 3.4 14.3 9.2 18.9 30.6 23.9 40.7 32.4 173.4 128.7 16.8 12.2 50.2 41.8 73.4 41.4z"
                                    ></path>
                                </svg>
                                <a href="mailto:community@htbsrmist.tech">
                                    community@htbsrmist.tech
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
