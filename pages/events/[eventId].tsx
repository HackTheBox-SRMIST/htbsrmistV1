import type { NextPage, GetServerSidePropsResult } from "next";
import React from "react";
import { Modal, Input } from "@nextui-org/react";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { useRouter } from "next/router";
import LocationLogo from "../../utils/icons/LocationLogo";
import EntryFees from "../../utils/icons/EntryFees";
import DateLogo from "../../utils/icons/DateLogo";

import { array } from "yup";
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
}

interface EventsPageProps {
    events: EventProps[];
}

const fetchCertificate = () => {};

const Event: NextPage<EventsPageProps> = ({ events }) => {
    const [visible, setVisible] = React.useState(false);
    const handler = () => setVisible(true);

    const closeHandler = () => {
        setVisible(false);
    };
    const router = useRouter();
    const eventId = router.query.eventId as string;
    const event = events.find((event) => event.event_name === eventId);

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
        <>
            <div className="flex-col px-4 lg:mx-20 mx-auto lg:px-10 items-center md:pr-0 font-mono">
                <div className="h-screen flex flex-col md:flex-row items-center justify-center md:gap-14 lg:gap-24">
                    <div className="w-full md:w-1/2">
                        <div className="mb-4 text-center md:text-left">
                            <h1 className="text-white text-3xl underline underline-offset-8 decoration-double sm:no-underline justify-self-auto ml-6 lg:ml-0 mt-[450px] lg:mt-0 sm:text-5xl  font-semibold ">
                                {event?.event_name}
                            </h1>
                            <p className="text-white sm:text-xl mt-6 text-justify ml-10 lg:ml-0 md:text-left text-sm ">
                                {event?.event_description}. <br />
                                <br />
                            </p>
                        </div>
                        <div className="">
                            <div className="rounded-3xl ml-10 sm:ml-0 sm:px-0 bg-node-black">
                                <div className="grid grid-cols-3 divide-x bg-hacker-grey py-2 rounded-md space-x-1 md:space-x-3 divide-solid lg:mx-0">
                                    <div className="flex justify-evenly md:flex-row flex-col space-y-2">
                                        <span className="w-8">
                                            <LocationLogo />
                                        </span>
                                        <div className="text-center">
                                            <h4 className="text-black font-bold text-sm uppercase ">
                                                Location
                                            </h4>
                                            <p className="whitespace-normal">
                                                {event?.venue}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex justify-evenly md:flex-row flex-col pl-2">
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
                                                    price.push(
                                                        <p>Free of Cost</p>
                                                    );
                                                } else {
                                                    price.push(
                                                        <p>{event?.cost}/-</p>
                                                    );
                                                }
                                                return price;
                                            })()}
                                        </div>
                                    </div>
                                    <div className="flex justify-evenly md:flex-row flex-col pl-2 ">
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
                                <div className="flex flex-col items-center justify-evenly md:flex-row ">
                                    <a
                                        href="https://www.meetup.com/chennai-in/events/285616974?utm_medium=referral&utm_campaign=share-btn_savedevents_share_modal&utm_source=link"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className=""
                                    >
                                        <button
                                            className="bg-htb-green  px-3 py-3 font-semibold rounded-md inline-block mt-6 "
                                            disabled={!event?.is_active}
                                        >
                                            REGISTER NOW
                                        </button>
                                    </a>
                                    <div>
                                        <button
                                            onClick={handler}
                                            disabled={event?.is_active}
                                            className="bg-htb-green  px-3 py-3 font-semibold rounded-md inline-block mt-6"
                                        >
                                            Get your Certificate
                                        </button>

                                        <Modal
                                            className="bg-htb-green"
                                            closeButton
                                            aria-labelledby="modal-title"
                                            open={visible}
                                            onClose={closeHandler}
                                        >
                                            <Modal.Body>
                                                <p>
                                                    Please enter your registered
                                                    E-Mail
                                                </p>
                                                <Input
                                                    clearable
                                                    bordered
                                                    fullWidth
                                                    color="primary"
                                                    size="lg"
                                                    placeholder="Email"
                                                />
                                                <button
                                                    onClick={fetchCertificate}
                                                    className="w-full bg-htb-green/50 hover:bg-htb-green py-2 font-normal rounded-full  p-8 text-xl"
                                                >
                                                    Get your Certificate
                                                </button>
                                            </Modal.Body>
                                        </Modal>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* z-10 sm:w-3/4 lg:w-2/4 w-full relative lg:mx-0 mx-auto transform px-2 */}
                    <div className="mb-14 ml-2 sm:ml-0 sm:mb-0 lg:w-2/4 w-full mt-6  lg:mx-0 mx-auto transform pl-8">
                        {/* ml-8 mt-12 mb-8 md:w-7/12 lg:w-5/12 */}
                        <figure className="mb-32 sm:mb-0 ">
                            <img
                                src={event?.poster_url}
                                alt="HackTheBox Meetup: Chennai, IN - Revealed Post"
                                // className="w-full m-auto md:pr-0"
                            />
                        </figure>
                    </div>
                </div>
            </div>
            <div className="flex justify-center"></div>
            <div className="flex-col  mt-80 sm:mt-0 ml-10 sm:px-20 ">
                <div className="text-center mb-10">
                    <h1 className="text-white text-3xl ml-2 sm:ml-4 mt-28 sm:text-5xl  font-bold">
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

            <div className="mt-10 flex-col pl-10 sm:px-20">
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

            <div className="Events_Gallery mt-4 sm:mt-0 flex-col">
                <p className="font-bold mr-8 sm:ml-32 mb-4 text-4xl uppercase text-teal-50 relative right-4 sm:right-14 ">
                    Gallery
                </p>
                <div className="mt-8 sm:mt-6 pr-16 sm:pr-0 w-full">
                    <Slider {...settings}>
                        {event?.gallery?.map((image) => (
                            <div key={image}>
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
                        ))}
                    </Slider>
                </div>
            </div>
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

        return { props: { events } };
    } catch (error) {
        console.log(error);
        return { notFound: true };
    }
}

export default Event;
