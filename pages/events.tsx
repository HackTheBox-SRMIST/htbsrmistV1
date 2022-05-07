import Head from "next/head";
import Nav from "../components/navbar";
import Footer from "../components/footer";
import DateLogo from "../utils/icons/DateLogo";
import EntryFees from "../utils/icons/EntryFees";
import LocationLogo from "../utils/icons/LocationLogo";

const Events = () => {
    return (
        <>
            <head></head>
            <section className="lg:flex-row flex-col flex lg:mx-20 mx-auto lg:gap-4 items-center justify-between pr-8 md:pr-0 font-mono">
                <div className="ml-8 lg:w-5/12 md:w-10/12 bg-node-black">
                    <h1 className="lg:text-6xl text-5xl text-white font-bold uppercase">
                        Z3r0-d4y
                    </h1>
                    <p className="text-white mt-4 text-justify text-xl ">
                        We, HackTheBox SRMIST (HTBSRMIST), are hosting our
                        inaugural event and the first meetup on the 12th of May
                        2022 at 1 pm IST. This offline event will be hosted at
                        Dr. TP Ganesan Auditorium, TP Mini Hall 1 & 2, SRM
                        Institute of Science and Technology, Kattankulathur.{" "}
                        <br />
                        <br />
                        The Elite panel of guests who will inaugurate the event
                        are:-
                        <br />
                        <br />
                        <strong className="text-htb-green ">
                            Mr. Chandran Subramanian
                        </strong>
                        , Founder, and Director of CyberFort Solution Private
                        Ltd.
                        <br />
                        <br />
                        <strong className="text-htb-green">
                            Prof. T. V. GOPAL
                        </strong>
                        , Dean, College of Engineering and Technology, SRMIST.
                        <br />
                        <br />{" "}
                        <strong className="text-htb-green">
                            Dr. Revathi Venkataraman
                        </strong>
                        , Professor & Chairperson School of Computing SRMIST.
                        <br />
                        <br />{" "}
                        <strong className="text-htb-green">
                            Dr. Annapurani Panaiyappan K.
                        </strong>
                        , Associate Professor, HoD Networking and
                        Communications.
                        <br />
                        <br /> Following the inauguration, a hands-on workshop
                        will take place in Mini Hall 1 & 2. The mentors will
                        conduct a walk through of machines provided by the
                        HackTheBox team. Students will follow along the mentors.
                        <br />
                        <br />
                        <h2 className="text-2xl font-bold">
                            Prerequisites for the Hands-on Workshop:- 
                        </h2>
                        <br/>
                        <ul className="list-disc list-inside">
                            <li>Laptop</li>
                            <li>
                                <a
                                    href="https://www.vmware.com/in/products/workstation-player/workstation-player-evaluation.html"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-htb-green hover:font-bold"
                                >
                                    VMWare
                                </a>{" "}
                                or{" "}
                                <a
                                    href="https://www.virtualbox.org/wiki/Downloads"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-htb-green hover:font-bold"
                                >
                                    Virtual Box
                                </a>
                            </li>
                            <li>
                                Preinstalled. - Security Oriented Operating
                                System(Kali Linux is recommended) installed in
                                the above mentioned Virtualization tools.
                            </li>
                        </ul>
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
                                <p className="whitespace-normal">
                                    SRMIST, Chennai
                                </p>
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
                        href="https://www.meetup.com/chennai-in/events/285616974?utm_medium=referral&utm_campaign=share-btn_savedevents_share_modal&utm_source=link"
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
        </>
    );
};

export default Events;
