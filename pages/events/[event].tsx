import type { NextPage, GetServerSidePropsResult } from "next";
import Link from "next/link";
import Head from "next/head";
import Nav from "../../components/navbar";
import Footer from "../../components/footer";
import Image from "next/image";
import React from "react";

import { useRouter } from "next/router";
import LocationLogo from "../../utils/icons/LocationLogo";
import EntryFees from "../../utils/icons/EntryFees";
import DateLogo from "../../utils/icons/DateLogo";

interface EventProps {
    event_name: string;
    event_description: string;
    poster_url: string;
    speakers_details: [
        {
            name: string;
            designation: string;
            details: string;
        }
    ];
    event_date: Date;
    is_active: boolean;
    venue: string;
    sponsors_details: [
        {
            name: string;
            place: string;
            details: string;
        }
    ];
    duration: Number;
    prerequisites: string;
    cost: number;
}

interface EventsPageProps {
    events: EventProps[];
}

const Event: NextPage<EventsPageProps> = ({ events }) => {
    const router = useRouter();
    const event_id = router.query.event;
    const event = events.find((event) => event_id);
    return (
        <>
            {/* main div mt-10 sm:mt-32 lg:mt-0 w-full lg:w-11/12 flex md:items-start items-center md:mx-0 justify-center md:justify-start flex-col z-10 px-0 sm:px-5 md:px-12  mx-10 */}
            <div className="flex-col  lg:mx-20 mx-auto lg:px-10 items-center justify-between pr-8 md:pr-0 font-mono">
                {/* h-screen flex flex-col md:flex-row items-center justify-center md:gap-14 lg:gap-24 */}
                <div className="h-screen flex flex-col md:flex-row items-center justify-center md:gap-14 lg:gap-24">
                    {/* w-full md:w-1/2 */}
                    <div className="w-full md:w-1/2">
                        {/* mb-4 text-center md:text-left */}
                        <div className="mb-4 text-center md:text-left">
                            {/* text-white text-3xl sm:text-5xl  font-semibold mt-10 */}
                            <h1 className="text-white text-3xl sm:text-5xl  font-semibold ">
                                {event?.event_name}
                            </h1>
                            {/* text-white sm:text-xl mt-4 text-center md:text-left text-sm */}
                            <p className="text-white sm:text-xl mt-4 text-center md:text-left text-sm ">
                                {event?.event_description}. <br />
                                <br />
                            </p>
                        </div>
                        {/* flex items-center md:items-start justify-center md:justify-start */}
                        <div className="">
                            {/* rounded-3xl bg-node-black border-4 border-htb-green/50 */}
                            <div className="rounded-3xl bg-node-black">
                                <div className="grid grid-cols-3 divide-x bg-hacker-grey py-2 rounded-md space-x-1 md:space-x-3 divide-solid lg:mx-0">
                                    <div className="flex justify-evenly md:flex-row flex-col space-y-2">
                                        <span className="w-8">
                                            <LocationLogo />
                                        </span>
                                        <div className="text-center">
                                            <h4 className="text-black font-bold text-sm uppercase ">
                                                Location
                                            </h4>
                                            <p className="whitespace-normal">
                                                {event?.venue}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex justify-evenly md:flex-row flex-col pl-2">
                                        <span className="w-8">
                                            <EntryFees />
                                        </span>
                                        <div className="text-center">
                                            <h4 className="text-black font-bold text-sm uppercase">
                                                Price
                                            </h4>
                                            {(() => {
                                                let price = [];
                                                if (event?.cost == 0) {
                                                    price.push(
                                                        <p>Free of Cost</p>
                                                    );
                                                } else {
                                                    price.push(
                                                        <p>{event?.cost}/-</p>
                                                    );
                                                }
                                                return price;
                                            })()}
                                        </div>
                                    </div>
                                    <div className="flex justify-evenly md:flex-row flex-col pl-2 ">
                                        <span className="w-8">
                                            <DateLogo />
                                        </span>
                                        <div className="text-center">
                                            <h4 className="text-black font-bold text-sm uppercase">
                                                Date
                                            </h4>
                                            <p>{event?.event_date}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-center ">
                                    <a
                                        href="https://www.meetup.com/chennai-in/events/285616974?utm_medium=referral&utm_campaign=share-btn_savedevents_share_modal&utm_source=link"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className=""
                                    >
                                        <button className="bg-htb-green px-3 py-3 font-semibold rounded-md inline-block mt-2">
                                            REGISTER NOW
                                        </button>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* z-10 sm:w-3/4 lg:w-2/4 w-full relative lg:mx-0 mx-auto transform px-2 */}
                    <div className="lg:w-2/4 w-full  lg:mx-0 mx-auto transform px-2">
                        {/* ml-8 mt-12 mb-8 md:w-7/12 lg:w-5/12 */}
                        <figure className="ml-8 mb-8 ">
                            <img
                                src={event?.poster_url}
                                alt="HackTheBox Meetup: Chennai, IN - Revealed Post"
                                // className="w-full m-auto md:pr-0"
                            />
                        </figure>
                    </div>
                </div>
            </div>

            <div className="flex-col mx-10 px-20">
                <div className="text-center mb-10">
                    <h1 className="text-white text-3xl sm:text-5xl  font-semibold">
                        Speakers
                    </h1>
                </div>
                <div className="p-5 rounded-3xl bg-node-black border-4 border-htb-green/50 mb-10">
                    <p className="text-white mt-4 text-justify text-xl">
                        The Elite panel of guests who will inaugurate the event
                        are:-
                        <br />
                        <br />
                        {event?.speakers_details.map((speaker) => {
                            return (
                                <>
                                    <strong className="text-htb-green">
                                        {speaker.name}
                                    </strong>
                                    <strong>, {speaker.designation}</strong>
                                    <br />
                                    <br />{" "}
                                </>
                            );
                        })}
                        <br />
                    </p>
                </div>
            </div>

            <div className="mt-10 flex-col mx-10 px-20">
                <div className="text-center mb-10">
                    <h1 className="text-white text-3xl sm:text-5xl  font-semibold">
                        Prerequisites
                    </h1>
                </div>
                <div className="p-5 rounded-3xl bg-node-black border-4 border-htb-green/50 mb-10">
                    <p className="text-white mt-4 text-justify text-xl">
                        <h2 className="text-2xl font-bold">
                            Prerequisites for the Hands-on Workshop:-
                        </h2>
                        <br />
                        <ul className="list-disc list-inside">
                            {(() => {
                                let prereq_len: number = Number(
                                    event?.prerequisites.length
                                );
                                let prereq = [];
                                for (let i = 0; i < prereq_len; i++) {
                                    prereq.push(
                                        <li key={event?.prerequisites[i]}>
                                            {event?.prerequisites[i]}
                                        </li>
                                    );
                                }
                                return prereq;
                            })()}
                        </ul>
                    </p>
                </div>
            </div>
        </>
    );
};

const url_root = process.env.BASE_URL_PREVIEW;

export async function getServerSideProps(): Promise<
    GetServerSidePropsResult<EventsPageProps>
> {
    try {
        const { data: events } = await (
            await fetch(`${url_root}/api/v1/events?active=false`)
        ).json();

        return { props: { events } };
    } catch (error) {
        console.log(error);
        return { notFound: true };
    }
}

export default Event;
