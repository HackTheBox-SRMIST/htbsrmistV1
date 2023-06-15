import type { NextPage, GetServerSidePropsResult } from "next";
import React from "react";
import EventPoster from "../../components/events/eventPoster";
import EventRegister from "../../components/events/eventRegister";
import EventPrerequisites from "../../components/events/eventPrerequisites";
import EventGallery from "../../components/events/eventGallery";
import { useRouter } from "next/router";
import EventSpeakers from "../../components/events/eventSpeakers";
import EventInfo from "../../components/events/eventInfo";

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

const url_root = process.env.BASE_URL_PREVIEW;

const Event: NextPage<EventsPageProps> = ({ events }) => {
    const router = useRouter();

    return (
        <>
            <div className="flex-col px-4 lg:mx-20 mx-auto lg:px-10 items-center md:pr-0 font-mono">
                <div className="md:h-screen flex flex-col md:flex-row items-center justify-center md:gap-14 lg:gap-24">
                    <div className="w-full md:w-1/2">
                        <div>
                            <div className="rounded-3xl sm:ml-0 sm:px-0 bg-node-black ">
                                <EventInfo events={events}></EventInfo>
                                <EventRegister events={events} />
                            </div>
                        </div>
                    </div>
                    <EventPoster events={events} />
                </div>
            </div>
            <EventSpeakers events={events} />
            <EventPrerequisites events={events} />
            <EventGallery events={events} />
        </>
    );
};

export async function getServerSideProps(): Promise<
    GetServerSidePropsResult<EventsPageProps>
> {
    try {
        const { data: events } = await (
            await fetch(`${url_root}/api/v1/events`)
        ).json();

        return { props: { events } };
    } catch (error) {
        console.log(error);
        return { notFound: true };
    }
}

export default Event;
