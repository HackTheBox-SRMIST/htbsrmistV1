import Head from "next/head";
import Nav from "../components/navbar";
import Footer from "../components/footer";
import DateLogo from "../utils/icons/DateLogo";
import EntryFees from "../utils/icons/EntryFees";
import LocationLogo from "../utils/icons/LocationLogo";

const Events = () => {
    return (
        <section className="lg:flex-row flex-col flex lg:mx-20 mx-auto lg:gap-4 items-center justify-between">
            <div className="ml-8 lg:w-5/12">
                <h1 className="lg:text-6xl text-5xl text-white font-bold">
                    LOREM IPSUM
                </h1>
                <p className="text-white mt-2 text-justify lg:text-lg">
                    Anyone who is interested in cybersecurity and penetration
                    testing should join this group. The purpose of the meetup is
                    to meet other infosec enthusiasts, discuss, exchange
                    knowledge regarding cybersecurity, hack machines from Hack
                    The Box dedicated to this gathering, and enjoy.
                </p>

                <div className="grid grid-cols-3 divide-x bg-hacker-grey py-4 rounded-md space-x-3 divide-solid lg:mx-0 ml-2 my-8">
                    <div className="flex justify-evenly">
                        <span className="w-8">
                            <LocationLogo />
                        </span>
                        <div>
                            <h4 className="text-black font-bold text-sm uppercase">
                                Location
                            </h4>
                            <p>SRMIST, Chennai</p>
                        </div>
                    </div>

                    <div className="flex justify-evenly">
                        <span className="w-8">
                            <LocationLogo />
                        </span>
                        <div>
                            <h4 className="text-black font-bold text-sm uppercase">
                                Price
                            </h4>
                            <p>Free of Cost</p>
                        </div>
                    </div>

                    <div className="flex justify-evenly">
                        <span className="w-8">
                            <LocationLogo />
                        </span>
                        <div>
                            <h4 className="text-black font-bold text-sm uppercase">
                                Date
                            </h4>
                            <p>12th May 2022</p>
                        </div>
                    </div>
                </div>

                <a
                    href="https://www.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block ml-20 md:ml-64 lg:ml-0"
                >
                    <button className="bg-htb-green px-20 py-3 font-semibold rounded-md ">
                        REGISTER
                    </button>
                </a>
            </div>

            <figure className="w-full lg:w-5/12">
                <img
                    src="/revealed_post.png"
                    alt="HackTheBox Meetup: Chennai, IN - Revealed Post"
                    className="w-10/12 m-auto md:pr-0"
                />
            </figure>
        </section>
    );
};

export default Events;
