import React from "react";
import type { NextPage, GetServerSidePropsResult } from "next";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useRouter } from "next/router";

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

const EventGallery: NextPage<EventsPageProps> = ({ events }) => {
    const router = useRouter();
    const eventId = router.query.eventId as string;
    const event = events.find((event: any) => event.event_name === eventId);

    const settings = {
        className: "center",
        centerMode: true,
        infinite: true,
        centerPadding: "60px",
        slidesToShow: 3,
        speed: 500,
        responsive: [
            {
                breakpoint: 1024, // screens larger than 1024px
                settings: {
                    slidesToShow: 3,
                    centerPadding: "50px"
                }
            },
            {
                breakpoint: 768, // screens between 768px and 1024px
                settings: {
                    slidesToShow: 2,
                    centerPadding: "30px"
                }
            },
            {
                breakpoint: 480, // screens smaller than 768px
                settings: {
                    slidesToShow: 1,
                    centerPadding: "10px"
                }
            }
        ]
    };

    return (
        <div className="Events_Gallery ml-[1.5rem] md:ml-[5rem] mt-4 sm:mt-0 flex-col">
            <p className="font-bold mr-8 sm:ml-32 mb-4 text-4xl uppercase text-teal-50 relative right-4 sm:right-14 ">
                Gallery
            </p>
            <div className="mt-8 sm:mt-6 sm:pr-0 w-full">
                <Slider {...settings}>
                    {event?.gallery?.map((image: any) => (
                        <div key={image}>
                            <div className="image">
                                <img
                                    src={image}
                                    alt="Gallery"
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "contain",
                                        borderRadius: "10px",
                                        boxShadow:
                                            "0px 0px 10px rgba(0, 0, 0, 0.3)"
                                    }}
                                />
                            </div>
                        </div>
                    ))}
                </Slider>
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

export default EventGallery;
