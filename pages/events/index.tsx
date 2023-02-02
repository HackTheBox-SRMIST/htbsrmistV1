import type { NextPage, GetServerSidePropsResult } from "next";
import Link from "next/link";
import Head from "next/head";
import Nav from "../../components/navbar";
import Footer from "../../components/footer";
import Image from "next/image";
import React from "react";

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
    registration_url: string;
}

interface EventsPageProps {
    events: EventProps[];
}

const EventS: NextPage<EventsPageProps> = ({ events }) => {
    return (
        <>
            <h1 className="text-4xl mx-10 lg:mx-20 md:text-6xl text-white font-bold md:ml-16 uppercase">
                All Events
            </h1>
            <section>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 px-12 gap-8 my-8 justify-center">
                    {events.map((event) => (
                        <div
                            key={event.event_name}
                            className="pcontainer hover:cursor-pointer rounded-xl transition-all"
                        >
                            <figure className="fig h-691 w-864 flex flex-col md:p-0 items-center hover:opacity-50">
                                <img
                                    src={event.poster_url}
                                    className="h-691 w-864 mx-auto  border-4 border-htb-green/50 object-cover"
                                    alt={`HackTheBox SRMIST - ${event.event_name}`}
                                />
                            </figure>
                            <div className="hidebtn lg:top-52 lg:flex-row sm:flex-col md:px-2 md:top-10 sm:top-20 sm:px-20 lg:px-5 ">
                                <a href={`/events/${event.event_name}`}>
                                    <button className="bg-htb-green border-2 border-hacker-grey hover:bg-white text-white hover:text-htb-green font-bold py-2 px-4 mx-10 rounded-full">
                                        Learn More
                                    </button>
                                </a>
                                <a
                                    href={`${event.registration_url}`}
                                    target="_blank"
                                >
                                    <button
                                        className=" bg-htb-green border-2 border-hacker-grey hover:bg-white text-white hover:text-htb-green font-bold py-2 px-4  rounded-full"
                                        disabled={!event.is_active}
                                    >
                                        Register
                                    </button>
                                    {/* edit  */}
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
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
        console.log(events);
        return { props: { events } };
    } catch (error) {
        console.log(error);
        return { notFound: true };
    }
}

export default EventS;
