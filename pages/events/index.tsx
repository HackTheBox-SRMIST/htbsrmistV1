import type { GetServerSidePropsResult, NextPage } from "next";
import React from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import fs from "fs";
import path from "path";

interface Event {
    id: string;
    name: string;
    date: string;
    isActive: boolean;
}

interface EventsPageProps {
    events: Event[];
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

const EventsPage: NextPage<EventsPageProps> = ({ events }) => {
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

    const ongoingEvents = events.filter((event) => event.isActive);
    const pastEvents = events.filter((event) => !event.isActive);

    return (
        <>
            <p className="px-12 flex justify-center">
                <img src="./allEvents.svg" className="h-20" alt="" />
            </p>

            <section className="pt-8 mb-0">
                <div className="grid grid-rols-2 ">
                    <div>
                        <h2 className="text-center text-2xl font-bold my-4 text-htb-green">
                            Ongoing Events
                        </h2>
                        {ongoingEvents.length > 0 ? (
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 px-12 gap-8 my-8 justify-center">
                                {ongoingEvents.map((event) => (
                                    <div key={event.id} className="relative group overflow-hidden">
                                        <figure className="fig h-691 w-864 flex flex-col md:p-0 items-center z-10">
                                            <img
                                                src={event.poster_url}
                                                className="h-691 w-864 mx-auto border-4 border-htb-green/50 object-cover rounded-2xl"
                                                alt={`HackTheBox SRMIST - ${event.name}`}
                                            />
                                        </figure>
                                        <div
                                            className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-50 z-20">
                                            <div className="flex flex-col gap-5 text-white">
                                                <a href={`/events/${event.name}`}>
                                                    <button
                                                        className="bg-htb-green border-2 border-hacker-grey hover:bg-white hover:text-htb-green font-bold py-2 px-4 rounded-full">
                                                        Register Now
                                                    </button>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="px-12 flex justify-center">
                                <img src="./NoOngoing.png" className="h-60" alt="" />
                            </p>
                        )}
                    </div>
                    <div>
                        <h2 className="text-center text-2xl font-bold my-4 text-htb-green">
                            Past Events
                        </h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 px-12 gap-8 my-8 justify-center">
                            {pastEvents.map((event) => (
                                <div key={event.id} className="relative group overflow-hidden">
                                    <figure className="fig h-691 w-864 flex flex-col md:p-0 items-center z-10">
                                        <img
                                            src={event.poster_url}
                                            className="h-691 w-864 mx-auto border-4 border-htb-green/50 object-cover rounded-2xl"
                                            alt={`HackTheBox SRMIST - ${event.name}`}
                                        />
                                    </figure>
                                    <div
                                        className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-50 z-20">
                                        <div className="flex flex-col gap-5 text-white">
                                            <a href={`/events/${event.name}`}>
                                                <button
                                                    className="bg-htb-green border-2 border-hacker-grey hover:bg-white hover:text-htb-green font-bold py-2 px-4 rounded-full transition-all duration-300 ease-in-out transform hover:scale-110 hover:shadow-lg">
                                                    Get Info
                                                </button>
                                            </a>
                                        </div>
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

const url_root = process.env.BASE_URL_PREVIEW;

export async function getServerSideProps(): Promise<
    GetServerSidePropsResult<EventsPageProps>
> {
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

export default EventsPage;
