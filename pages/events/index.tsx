import type { NextPage, GetServerSidePropsResult } from "next";
import Link from "next/link";
import Head from "next/head";
import Nav from "../../components/navbar";
import Footer from "../../components/footer";
import { Modal, Input, Radio } from "@nextui-org/react";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

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
    const submitHandler = async (events: React.ChangeEvent<any>) => {
        const str2bool = (value: string) => {
            if (value && typeof value === "string") {
                if (value.toLowerCase() === "true") return true;
                if (value.toLowerCase() === "false") return false;
            }
            return value;
        };

        const isSrmite = str2bool(events.target.isSrmite.value);
        events.preventDefault();

        try {
            const body = {
                usn: events.target.usn.value,
                name: events.target.name.value,
                email: events.target.email.value.toLowerCase(),
                dept: events.target.dept.value,
                isSrmite: isSrmite,
                event_name: events.target.event_name.value
            };

            const response = await axios.post(`/api/v1/events/registration`, body);
            const result = await response.data.message;

            Toast(true, result);
        } catch (err: any) {
            Toast(false, `${err.response.data.message}`);
        }
    };

    return (
        <>
            <p className="px-12 flex justify-center">
                <img src="./allEvents.svg" className="h-20" />
            </p>

            <section>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 px-12 gap-8 my-8 justify-center">
                    {events.map((event) => {
                        return (
                            <div key={event.event_name} className="relative group">
                                <figure className="fig h-691 w-864 flex flex-col md:p-0 items-center z-10">
                                    <img
                                        src={event.poster_url}
                                        className="h-691 w-864 mx-auto border-4 border-htb-green/50 object-cover rounded-2xl"
                                        alt={`HackTheBox SRMIST - ${event.event_name}`}
                                    />
                                </figure>
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-50 z-20">
                                    <div className="flex flex-col gap-5 text-white">
                                        {/* <a href={`/events/${event.event_name}`}>
                                            <button className="bg-htb-green border-2 border-hacker-grey hover:bg-white hover:text-htb-green font-bold py-2 px-4 rounded-full">
                                                Register Now
                                            </button>
                                        </a> */}
                                    </div>
                                </div>
                                <div className="absolute bottom-0 left-0 right-0 bg-gray-900 p-4 transform translate-y-full transition-transform duration-300 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 z-20 rounded-b-2xl flex justify-center items-center">
                                    <a href={`/events/${event.event_name}`}>
                                        <button className="bg-htb-green border-2 border-hacker-grey hover:bg-white hover:text-htb-green font-bold py-2 px-4 rounded-full">
                                            Register Now
                                        </button>
                                    </a>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>
        </>
    );
};

const url_root = process.env.BASE_URL_PREVIEW;

export async function getServerSideProps(): Promise<GetServerSidePropsResult<EventsPageProps>> {
    try {
        const { data: events } = await (
            await fetch(`${url_root}/api/v1/events`)
        ).json();
        const reversedEvents = events.reverse();
        return { props: { events: reversedEvents } };
    } catch (error) {
        console.log(error);
        return { notFound: true };
    }
}

export default EventS;
