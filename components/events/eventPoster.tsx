import { useRouter } from "next/router";
import type { NextPage, GetServerSidePropsResult } from "next";
interface EventProps {
    poster_url: string;
}

interface EventsPageProps {
    events: EventProps[];
}
const EventPoster: NextPage<EventsPageProps> = ({ events }) => {
    const router = useRouter();
    const eventId = router.query.eventId as string;
    const event = events.find((event: any) => event.event_name === eventId);
    return (
        <div className="md:mb-14 sm:ml-0 sm:mb-0 lg:w-2/4 w-full mt-16 lg:mx-0 mx-auto pl-2 md:pl-8 flex justify-center">
            <figure className="mb-32 sm:mb-0 ">
                <img
                    src={event?.poster_url}
                    alt="HackTheBox Meetup: Chennai, IN - Revealed Post"
                />
            </figure>
        </div>
    );
};
export default EventPoster;
