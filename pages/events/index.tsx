import type { GetServerSidePropsResult, NextPage } from "next";
import React from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

interface Event {
    id: string;
    name: string;
    date: string;
    isActive: boolean;
    poster_url: string; // Added missing property
}

interface EventsPageProps {
    events: Event[];
}

const Toast = (success: boolean, message: string) => {
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
    const submitHandler = async (event: React.ChangeEvent<any>) => {
        event.preventDefault(); // Prevent default before using event.target

        const str2bool = (value: string) => value.toLowerCase() === "true";

        try {
            const body = {
                usn: event.target.usn.value,
                name: event.target.name.value,
                email: event.target.email.value.toLowerCase(),
                dept: event.target.dept.value,
                isSrmite: str2bool(event.target.isSrmite.value),
                event_name: event.target.event_name.value
            };

            const response = await axios.post(`/api/v1/events/registration`, body);
            Toast(true, response.data.message);
        } catch (err: any) {
            Toast(false, err.response?.data?.message || "An error occurred");
        }
    };

    const ongoingEvents = events.filter((event) => event.isActive);
    const pastEvents = events.filter((event) => !event.isActive);

    return (
        <>
            <p className="px-12 flex justify-center">
                <img src="./allEvents.svg" className="h-20" alt="All Events" />
            </p>

            <section className="pt-8 mb-0">
                <div className="grid grid-cols-2">
                    <div>
                        <h2 className="text-center text-2xl font-bold my-4 text-htb-green">
                            Ongoing Events
                        </h2>
                        {ongoingEvents.length > 0 ? (
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 px-12 gap-8 my-8">
                                {ongoingEvents.map((event) => (
                                    <div key={event.id} className="relative group overflow-hidden">
                                        <figure className="fig h-691 w-864 flex flex-col items-center">
                                            <img
                                                src={event.poster_url}
                                                className="h-691 w-864 border-4 border-htb-green/50 object-cover rounded-2xl"
                                                alt={`HackTheBox SRMIST - ${event.name}`}
                                            />
                                        </figure>
                                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-50">
                                            <a href={`/events/${event.name}`}>
                                                <button className="bg-htb-green border-2 border-hacker-grey hover:bg-white hover:text-htb-green font-bold py-2 px-4 rounded-full transition-all duration-300 transform hover:scale-110 hover:shadow-lg">
                                                    Register Now
                                                </button>
                                            </a>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="px-12 flex justify-center">
                                <img src="./NoOngoing.png" className="h-60" alt="No Ongoing Events" />
                            </p>
                        )}
                    </div>
                    <div>
                        <h2 className="text-center text-2xl font-bold my-4 text-htb-green">
                            Past Events
                        </h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 px-12 gap-8 my-8">
                            {pastEvents.map((event) => (
                                <div key={event.id} className="relative group overflow-hidden">
                                    <figure className="fig h-691 w-864 flex flex-col items-center">
                                        <img
                                            src={event.poster_url}
                                            className="h-691 w-864 border-4 border-htb-green/50 object-cover rounded-2xl"
                                            alt={`HackTheBox SRMIST - ${event.name}`}
                                        />
                                    </figure>
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-50">
                                        <a href={`/events/${event.name}`}>
                                            <button className="bg-htb-green border-2 border-hacker-grey hover:bg-white hover:text-htb-green font-bold py-2 px-4 rounded-full transition-all duration-300 transform hover:scale-110 hover:shadow-lg">
                                                Get Info
                                            </button>
                                        </a>
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
        const response = await fetch(`${url_root}/api/v1/events`);
        const events: Event[] = await response.json();
        return { props: { events: [...events].reverse() } };
    } catch (error) {
        console.error("Error fetching events:", error);
        return { notFound: true };
    }
}

export default EventsPage;