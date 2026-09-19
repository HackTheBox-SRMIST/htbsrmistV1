import type {
    NextPage,
    GetServerSidePropsContext,
    GetServerSidePropsResult
} from "next";
import Link from "next/link";
import Head from "next/head";
import { Modal, Input, Radio } from "@nextui-org/react";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { logTime } from "../../utils/error/errorConstants";
import { date } from "yup";

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
    time: number; // in minutes
    sponsors_details: [
        {
            name: string;
            place: string;
            details: string;
        }
    ];
    duration: number;
    prerequisites: string;
    cost: number;
    registration_url: string;
}

interface EventsPageProps {
    events: EventProps[];
}

const Toast = (success: any, message: any) => {
    toast[success ? "success" : "error"](message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark"
    });
};

const EventS: NextPage<EventsPageProps> = ({ events }) => {
    const submitHandler = async (event: React.ChangeEvent<any>) => {
        event.preventDefault();

        const str2bool = (value: string) => {
            if (value && typeof value === "string") {
                return value.toLowerCase() === "true";
            }
            return value;
        };

        try {
            const body = {
                usn: event.target.usn.value,
                name: event.target.name.value,
                email: event.target.email.value.toLowerCase(),
                dept: event.target.dept.value,
                isSrmite: str2bool(event.target.isSrmite.value),
                event_name: event.target.event_name.value
            };

            const response = await axios.post(
                `/api/v1/events/registration`,
                body
            );
            Toast(true, response.data.message);
        } catch (err: any) {
            Toast(false, err.response?.data?.message || "Something went wrong");
        }
    };

    const activeEvents = events.filter((event) => event.is_active);
    const pastEvents = events.filter((event) => !event.is_active);

    return (
        <>
            {/* <p className="px-12 flex justify-center">
                <img src="./allEvents.svg" className="h-20" alt="All Events" />
            </p> */}
            <section className="flex flex-col md:flex-row justify-between items-start px-4 md:px-12 gap-8">
                {/* Left Side: Ongoing Event OR No Ongoing Event */}
                <div className="w-full md:w-1/3 flex flex-col self-center md:mb-40">
                    <div className="w-full h-auto md:h-[320px] flex justify-center items-center">
                        {activeEvents.length > 0 ? (
                            <div className="w-full h-full group">
                                <div className="w-full h-full relative transition-all duration-500 ease-out">
                                    {/* Card with shadow effect - hidden on mobile */}
                                    <div className="absolute inset-0 bg-black/10 rounded-2xl blur-md transform -translate-y-2 translate-x-2 hidden md:block"></div>

                                    {/* Main Card */}
                                    <div className="relative w-full h-[350px] md:h-[450px] bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl md:rounded-2xl border border-htb-green/30 overflow-hidden shadow-md shadow-htb-green/20 transition-shadow duration-300 group-hover:shadow-htb-green/50">
                                        <div className="w-full h-full overflow-hidden">
                                            <img
                                                src={activeEvents[0].poster_url}
                                                decoding="async"
                                                className="w-full h-full object-cover object-center transition-all duration-700 group-hover:opacity-60"
                                                alt={`HackTheBox SRMIST - ${activeEvents[0].event_name}`}
                                            />

                                            {/* Top shine effect - desktop only */}
                                            <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-htb-green/20 to-transparent hidden md:block"></div>

                                            {/* Event info overlay at bottom */}
                                            <div className="absolute bottom-0 w-full bg-gradient-to-t from-black via-black/80 to-transparent p-3 md:p-6">
                                                <h3 className="text-white font-bold text-lg md:text-2xl mb-1 md:mb-2 truncate">
                                                    {activeEvents[0].event_name}
                                                </h3>
                                                <div className="flex items-center text-gray-300 text-xs md:text-sm mb-2 md:mb-4">
                                                    <span className="inline-block w-2 h-2 rounded-full bg-htb-green mr-2"></span>
                                                    Live Now
                                                </div>
                                            </div>

                                            {/* Hover overlay with action - simplified for mobile */}
                                            <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-gradient-to-b from-black/70 to-gray-900/80">
                                                <Link href={`/events/${encodeURIComponent(activeEvents[0].event_name)}`}>
                                                    <a className="relative cursor-pointer">
                                                        <button className="relative bg-htb-green hover:bg-white text-sm md:text-base font-bold py-2 md:py-3 px-6 md:px-8 rounded-full transition-all duration-300 text-black hover:text-htb-green border border-transparent hover:border-htb-green flex items-center cursor-pointer">
                                                            Register Now
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                className="h-4 w-4 md:h-5 md:w-5 ml-2"
                                                                viewBox="0 0 20 20"
                                                                fill="currentColor"
                                                            >
                                                                <path
                                                                    fillRule="evenodd"
                                                                    d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                                                                    clipRule="evenodd"
                                                                />
                                                            </svg>
                                                        </button>
                                                    </a>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="w-full h-full flex flex-col items-center justify-center border-htb-green/10 p-4 md:p-8">
                                <div className="relative">
                                    <div className="absolute inset-0 bg-htb-green/5 rounded-full blur-xl transform scale-90"></div>
                                    <img
                                        src="/eventscombo.png"
                                        className="h-40 md:h-64  w-auto relative animate-pulse duration-3000"
                                        alt="No Ongoing Events"
                                    />
                                </div>
                                <p className="text-gray-400 text-center mt-4 md:mt-8 italic font-light text-lg md:text-2xl">
                                    Check back soon for upcoming events
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Vertical Divider (Desktop) */}
                <div className="relative hidden md:block mx-6 h-[680px] flex items-center">
                    <div className="w-px bg-gradient-to-b from-emerald-400 via-htb-green to-teal-600 h-full relative mx-auto">
                        <div className="absolute inset-0 w-1 left-1/2 transform -translate-x-1/2 opacity-50 h-full bg-htb-green blur-sm"></div>
                    </div>
                </div>

                {/* Horizontal Divider (Mobile Only) */}
                <div className="w-full block md:hidden my-6">
                    <div className="relative h-px bg-gradient-to-r from-transparent via-htb-green to-transparent">
                        <div className="absolute inset-0 h-1 top-1/2 transform -translate-y-1/2 opacity-50 w-full bg-htb-green blur-sm"></div>
                    </div>
                </div>

                {/* Right Side: Past Events with Smooth Scrolling */}
                <div className="w-full md:w-3/5 flex flex-col items-center">
                    <h2 className="text-2xl md:text-4xl font-bold text-center mb-4 md:mb-6 text-htb-green">
                        Past Events
                    </h2>
                    <div className="w-full max-h-[600px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-htb-green scrollbar-track scroll-smooth transform-gpu will-change-[scroll-position]">
                        <div className="top-0 left-0 right-0 h-12 bg-gradient-to-b from-black to-transparent z-10 pointer-events-none sticky"></div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-10 pb-4">
                            {pastEvents.map((event) => (
                                <div
                                    key={event.event_name}
                                    className="relative group h-[280px] md:h-[320px] w-full max-w-[320px] mx-auto overflow-hidden rounded-xl shadow-md border-4 border-htb-green hover:shadow-htb-green/60 transition-all duration-300"
                                >
                                    <img
                                        src={event.poster_url}
                                        loading="lazy"
                                        decoding="async"
                                        className="h-full w-full object-cover object-center"
                                        alt={`HackTheBox SRMIST - ${event.event_name}`}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-50 group-hover:opacity-80 transition-opacity duration-300"></div>

                                    {/* Event Name Overlay */}
                                    <div className="absolute bottom-0 left-0 right-0 p-3 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-htb-green backdrop-blur-sm">
                                        <Link href={`/events/${encodeURIComponent(event.event_name)}`}>
                                            <a className="block cursor-pointer">
                                                <h3 className="text-lg md:text-xl font-semibold text-center">
                                                    Get Certificate
                                                </h3>
                                            </a>
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

const url_root =
    process.env.BASE_URL_PREVIEW ||
    (process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : `http://localhost:${process.env.PORT || 3000}`);

// In-memory cache for ultra-fast response
let cachedEvents: EventProps[] = [];
let lastFetchTime = 0;
const CACHE_TTL_MS = 30 * 1000; // 30 seconds

export async function getServerSideProps(
    context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<EventsPageProps>> {
    try {
        // Edge CDN and browser cache header
        context.res.setHeader(
            "Cache-Control",
            "public, s-maxage=30, stale-while-revalidate=60"
        );

        const now = Date.now();
        if (cachedEvents.length > 0 && now - lastFetchTime < CACHE_TTL_MS) {
            return { props: { events: cachedEvents } };
        }

        const res = await fetch(`${url_root}/api/v1/events`);
        const { data: events } = await res.json();
        const formattedEvents: EventProps[] = (events || []).reverse();

        cachedEvents = formattedEvents;
        lastFetchTime = now;

        return { props: { events: formattedEvents } };
    } catch (error) {
        console.log(error);
        if (cachedEvents.length > 0) {
            return { props: { events: cachedEvents } };
        }
        return { notFound: true };
    }
}

export default EventS;