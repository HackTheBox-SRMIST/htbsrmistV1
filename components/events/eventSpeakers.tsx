import { useRouter } from "next/router";
import React from "react";
import type { NextPage, GetServerSidePropsResult } from "next";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const url_root = process.env.BASE_URL_PREVIEW;
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
    gallery: [
        "https://ik.imagekit.io/htbsrmist/Events/zero_day.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1674281897886"
    ];
    registration_url: string;
    database: string;
}

interface EventsPageProps {
    events: EventProps[];
}
const EventSpeakers: NextPage<EventsPageProps> = ({ events }) => {
    const router = useRouter();
    const eventId = router.query.eventId as string;
    const event = events.find((event: any) => event.event_name === eventId);
    return (
        <div className=" md:mt-0 flex-col justify-center px-2 md:pl-10 sm:px-20 ">
            <div className="text-center mb-10">
                <h1 className="text-white text-3xl ml-2 sm:ml-4 sm:text-5xl  font-bold">
                    Speakers
                </h1>
            </div>
            <div className="p-5 ml-1 sm:ml-0 rounded-3xl w-full sm:w-auto bg-node-black border-4 border-htb-green/50 mb-10">
                <p className="text-white mt-2 text-justify text-xl">
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
    );
};
export default EventSpeakers;
