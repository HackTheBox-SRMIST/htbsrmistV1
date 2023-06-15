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

const EventPrerequisites: NextPage<EventsPageProps> = ({ events }) => {
    const router = useRouter();
    const eventId = router.query.eventId as string;
    const event = events.find((event: any) => event.event_name === eventId);
    return (
        <div className="mt-10 flex-col justify-center px-2 md:pl-10 sm:px-20">
            <div className="text-center mb-10">
                <h1 className="text-white text-3xl pl-2 sm:pl-6 sm:text-5xl  font-bold">
                    Prerequisites
                </h1>
            </div>
            <div className="p-5 rounded-3xl ml-1 sm:ml-0 w-full sm:w-auto bg-node-black border-4 border-htb-green/50 mb-10">
                <p className="text-white mt-4  break-keep text-xl">
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
export default EventPrerequisites;
