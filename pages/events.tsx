import Head from "next/head";
import Nav from "../components/navbar";
import Footer from "../components/footer";
import DateLogo from "../utils/icons/DateLogo";
import EntryFees from "../utils/icons/EntryFees";
import LocationLogo from "../utils/icons/LocationLogo";

const Events = () => {
    return (
        <section className="lg:flex-row flex-col flex lg:mx-20 mx-auto lg:gap-4 items-center justify-between pr-8 md:pr-0">
            <div className="ml-8 lg:w-5/12 md:w-10/12">
                <h1 className="lg:text-6xl text-5xl text-white font-bold uppercase">
                    Zero Day
                </h1>
                <p className="text-white mt-2 text-justify lg:text-lg">
                    Anyone who is interested in cybersecurity and penetration
                    testing should join this group. The purpose of the meetup is
                    to meet other infosec enthusiasts, discuss, exchange
                    knowledge regarding cybersecurity, hack machines from Hack
                    The Box dedicated to this gathering, and enjoy.
                </p>

                <div className="grid grid-cols-3 divide-x bg-hacker-grey py-4 rounded-md space-x-1 md:space-x-3 divide-solid lg:mx-0 pl-2 my-8">
                    <div className="flex justify-evenly md:flex-row flex-col space-y-2">
                        <span className="w-8">
                            <LocationLogo />
                        </span>
                        <div>
                            <h4 className="text-black font-bold text-sm uppercase ">
                                Location
                            </h4>
                            <p className="whitespace-normal">SRMIST, Chennai</p>
                        </div>
                    </div>

                    <div className="flex justify-evenly md:flex-row flex-col pl-2">
                        <span className="w-8">
                            <EntryFees />
                        </span>
                        <div>
                            <h4 className="text-black font-bold text-sm uppercase">
                                Price
                            </h4>
                            <p>Free of Cost</p>
                        </div>
                    </div>

                    <div className="flex justify-evenly md:flex-row flex-col pl-2 ">
                        <span className="w-8">
                            <DateLogo />
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
                    className=""
                >
                    <button className="bg-htb-green w-full  py-3 font-semibold rounded-md inline-block mt-4">
                        REGISTER
                    </button>
                </a>
            </div>

            <figure className="ml-8 mt-12 mb-8 md:w-7/12 lg:w-5/12">
                <img
                    src="/EventPoster.jpg"
                    alt="HackTheBox Meetup: Chennai, IN - Revealed Post"
                    className="w-full m-auto md:pr-0"
                />
            </figure>
        </section>
    );
};

export default Events;
