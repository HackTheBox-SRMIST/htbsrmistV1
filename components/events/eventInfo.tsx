import { useRouter } from "next/router";
import React from "react";
import type { NextPage, GetServerSidePropsResult } from "next";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import LocationLogo from "../../utils/icons/LocationLogo";
import DateLogo from "../../utils/icons/DateLogo";
import EntryFees from "../../utils/icons/EntryFees";
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

const EventInfo: NextPage<EventsPageProps> = ({ events }) => {
    const router = useRouter();
    const eventId = router.query.eventId as string;
    const event = events.find((event: any) => event.event_name === eventId);
    return (
        <div>
            <div className="mb-4 text-center md:text-left">
                <h1 className="text-white text-3xl underline underline-offset-8 decoration-double sm:no-underline justify-self-auto ml-6 lg:ml-0 md:mt-[350px] lg:mt-0 sm:text-5xl  font-semibold ">
                    {event?.event_name}
                </h1>

                <p className="text-white sm:text-xl mt-6 text-justify md:ml-10 lg:ml-0 md:text-left text-sm ">
                    {event?.event_description}. <br />
                    <br />
                </p>
            </div>
            <div className="grid grid-cols-3 divide-x bg-hacker-grey py-2 rounded-md space-x-1 md:space-x-3 divide-solid lg:mx-0">
                <div className="flex justify-evenly md:flex-row flex-col space-y-2 items-center">
                    <span className="w-8">
                        <LocationLogo />
                    </span>
                    <div className="text-center">
                        <h4 className="text-black font-bold text-sm uppercase ">
                            Location
                        </h4>
                        <p className="whitespace-normal">{event?.venue}</p>
                    </div>
                </div>

                <div className="flex justify-evenly md:flex-row flex-col pl-2 items-center">
                    <span className="w-8">
                        <EntryFees />
                    </span>
                    <div className="text-center">
                        <h4 className="text-black font-bold text-sm uppercase">
                            Price
                        </h4>
                        {(() => {
                            let price = [];
                            if (event?.cost == 0) {
                                price.push(<p>Free of Cost</p>);
                            } else {
                                price.push(<p>{event?.cost}/-</p>);
                            }
                            return price;
                        })()}
                    </div>
                </div>
                <div className="flex justify-evenly md:flex-row flex-col pl-2 items-center">
                    <span className="w-8">
                        <DateLogo />
                    </span>
                    <div className="text-center">
                        <h4 className="text-black font-bold text-sm uppercase">
                            Date
                        </h4>
                        <p>{event?.event_date}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default EventInfo;
