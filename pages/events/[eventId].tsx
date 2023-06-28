import type { NextPage, GetServerSidePropsResult } from "next";
import React from "react";
import { useRouter } from "next/router";
import { EventsPageProps } from "../../utils/types/event";
import EventsPage from "../../components/events";

const url_root = process.env.BASE_URL_PREVIEW;

const Event: NextPage<EventsPageProps> = ({ events }) => {
    const router = useRouter();
    const eventId = router.query.eventId as string;
    const event = events.find((event) => event.event_name === eventId);

    return (
        <>
            <EventsPage event={event} />
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
