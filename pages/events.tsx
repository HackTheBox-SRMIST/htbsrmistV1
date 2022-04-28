import Head from "next/head";
import Nav from "../components/navbar";
import Footer from "../components/footer";
import DateLogo from "../utils/icons/DateLogo";
import EntryFees from "../utils/icons/EntryFees";
import LocationLogo from "../utils/icons/LocationLogo";

const Events = () => {
    return (
        <div>
            <Head>
                <title>Events | HackTheBox SRMIST</title>
                <meta name="title" content="Events | HackTheBox SRMIST" />
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
            <div className="lg:flex-row flex-col flex lg:mx-20 lg:mt-12 mx-auto lg:gap-4">
                <div className="flex-1 lg:max-w-2xl">
                    <h1 className="lg:text-6xl text-5xl mb-4 lg:my-2 text-white lg: font-bold mx-4"><strong>LOREM IPSUM</strong></h1>
                    <p className="text-white mx-4 mb-6 lg:mb-4 text-justify lg:my-8 lg:text-lg">Anyone who is interested in cybersecurity and penetration testing
                        should join this group. The purpose of the meetup is to meet other
                        infosec enthusiasts, discuss, exchange knowledge regarding
                        cybersecurity, hack machines from Hack The Box dedicated to this
                        gathering, and enjoy.</p>
                    <div className="flex flex-row bg-hacker-grey gap-2 pl-4 mx-4 py-4 my-2 rounded-md divide-x divide-solid lg:my-8">
                        <div className="flex-shrink lg:flex-1 inline-flex items-baseline lg:justify-center">
                            <span className="mr-1 -ml-1 lg:mx-4"><LocationLogo /></span>
                            <span className="mx-1">
                                <h1 className="text-black font-bold ">LOCATION</h1>
                                <p className="text-left">SRM, Chennai</p>
                            </span>
                        </div>
                        <div className="flex-shrink inline-flex items-baseline lg:justify-left px-2 lg:mx-4">
                            <span className="pl-3 mr-2 lg:mx-6 lg:px-0"><EntryFees /></span>
                            <span className="">
                                <h1 className="text-black font-bold">FEES</h1>
                                <p className="">Free</p>
                            </span>
                        </div>
                        <div className="flex-shrink lg:flex-1 inline-flex items-baseline lg:justify-center lg:px-0 pl-2">
                            <span className="mx-2 lg:mx-4"><LocationLogo /></span>
                            <span>
                                <h1 className="text-black font-bold">DATE</h1>
                                <p className="">22nd April <span className="hidden lg:inline">, 2022</span></p>
                            </span>
                        </div>

                    </div>
                    <div className=" mt-8 mb-4 flex-1 lg:my-8 lg:mx-20">
                        <a href="https://www.google.com" target="_blank" className="mx-24">
                            <button className="bg-htb-green px-20 py-3 rounded-md ">REGISTER</button>
                        </a>
                    </div>
                </div>
                <div>
                    <img src="/revealed_post.png" alt="Revealed Post" className="eventpost mx-4 my-4 max-w-sm lg:max-w-2xl lg:ml-20 md:ml-12" />
                </div>

            </div>
            <Footer />
        </div>
    )
}

export default Events;