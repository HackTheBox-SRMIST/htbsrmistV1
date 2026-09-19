import type {
    NextPage,
    GetServerSidePropsContext,
    GetServerSidePropsResult
} from "next";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import Image from "next/image";

// Dynamically split heavy modals so @nextui-org and react-select are not loaded on initial page view
const CertificateModal = dynamic(
    () => import("../../components/events/CertificateModal"),
    { ssr: false }
);

const EventRegistrationModal = dynamic(
    () => import("../../components/events/EventRegistrationModal"),
    { ssr: false }
);

interface EventProps {
    event_name: string;
    event_description: string;
    poster_url: string;
    speakers_details: [
        {
            name: string;
            designation: string;
            details: string;
            image: string;
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
    prerequisites: string[];
    cost: number;
    gallery: string[];
    registration_url: string;
    database: string;
    slug: string;
    certificate: {
        [key: string]: string | undefined;
    };
}

interface EventsPageProps {
    events: EventProps[];
}

const url_root =
    process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : "http://localhost:3000";

const Event: NextPage<EventsPageProps> = ({ events }) => {
    const router = useRouter();
    const eventId = router.query.eventId as string;
    const event = events.find((event) => event.event_name === eventId);
    const slug = event?.slug;
    const registrationUrl = event?.registration_url?.trim();
    const hasExternalRegistration = Boolean(registrationUrl);
    const isRegistrationActive = Boolean(event?.is_active);

    const [visible, setVisible] = useState(false);
    const [visibleReg, setVisibleReg] = useState(false);

    const handler = () => {
        setVisible(true);
        if (typeof window !== "undefined" && window.document) {
            document.body.style.overflow = "hidden";
        }
        window.scrollTo({ top: 0 });
    };

    const closeHandler = () => {
        setVisible(false);
        if (typeof window !== "undefined" && window.document) {
            document.body.style.overflow = "unset";
        }
    };

    const handlerReg = () => setVisibleReg(true);
    const closeHandlerReg = () => setVisibleReg(false);

    const options = event?.certificate
        ? Object.entries(event.certificate)
              .filter(([_, url]) => url && url.trim() !== "")
              .map(([key]) => ({
                  value: key,
                  label: key
                      .split("-")
                      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                      .join(" ")
              }))
        : [];

    return (
        <>
            <div className="suMain py-10">
                <div className="mx-auto w-[90%] max-w-7xl font-share-tech px-6">
                    <div className=" rounded-2xl flex flex-col md:flex-row">
                        <div className="md:w-1/2 w-full flex items-center justify-center p-4">
                            <div className="border-[2px] border-htb-green rounded-2xl p-2">
                                <img
                                    src={event?.poster_url}
                                    alt="Event Poster"
                                    className="max-w-full max-h-[450px] object-contain"
                                />
                            </div>
                        </div>
                        <div className="md:w-1/2 w-full md:mr-16 text-white flex flex-col items-center justify-center p-6 space-y-5">
                            <h1 className="text-htb-green font-bold text-4xl md:text-5xl text-center">
                                {event?.event_name}
                            </h1>
                            <div className="loc bg-[#141D2B] text-white flex flex-row items-center space-x-4 p-4 w-full md:w-96 rounded-xl">
                                <div className="lgo flex items-center justify-center">
                                    <img
                                        src="/locationLogo.svg"
                                        alt="Location"
                                        className="h-6 w-6 md:h-8 md:w-8"
                                    />
                                </div>
                                <div className="txt w-full">
                                    <p className="text-xl md:text-2xl font-semibold break-words">
                                        {event?.venue}
                                    </p>
                                </div>
                            </div>

                            <div className="des bg-[#141D2B] text-white space-x-4 flex flex-row justify-start pl-5 pt-1 w-full md:w-96 h-[54px] rounded-xl">
                                <div className="lgo mt-1">
                                    <img src="/desLogo.svg" alt="Cost" />
                                </div>
                                <div className="txt">
                                    <p className="ml-4 text-white text-xl md:text-2xl mt-[6px] font-semibold">
                                        {event?.cost === 0
                                            ? "Free of Cost"
                                            : `${event?.cost}/-`}
                                    </p>
                                </div>
                            </div>
                            <div className="date bg-[#141D2B] text-white space-x-4 flex flex-row justify-start pl-5 pt-1 w-full md:w-96 h-[54px] rounded-xl">
                                <div className="lgo mt-1">
                                    <img src="/dateLogo.svg" alt="Date" />
                                </div>
                                <div className="txt">
                                    <p className="ml-4 text-white text-xl md:text-2xl mt-[6px] font-semibold">
                                        {event?.event_date?.toString()}
                                    </p>
                                </div>
                            </div>
                            {hasExternalRegistration ? (
                                <a
                                    href={registrationUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`bg-htb-green w-full md:w-80 text-node-black font-bold text-center py-3 text-2xl rounded-2xl ${
                                        !isRegistrationActive
                                            ? "pointer-events-none opacity-60"
                                            : ""
                                    }`}
                                >
                                    Register Now
                                </a>
                            ) : (
                                <button
                                    className={`bg-htb-green w-full md:w-80 text-node-black font-bold text-center py-3 text-2xl rounded-2xl ${
                                        !isRegistrationActive ? "opacity-60" : ""
                                    }`}
                                    disabled={!isRegistrationActive}
                                    onClick={handlerReg}
                                >
                                    Register Now
                                </button>
                            )}

                            <button
                                className="bg-htb-green w-full md:w-80 text-node-black font-bold text-center py-3 text-2xl rounded-2xl"
                                onClick={handler}
                                disabled={event?.is_active}
                            >
                                Get Certificate
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="eventText text-white px-4 sm:px-8 md:px-16 lg:px-64 text-2xl sm:text-3xl md:text-4xl font-medium font-share-tech">
                {event?.event_description}
            </div>

            <div className="speaker mt-10 font-share-tech text-center">
                <p className="text-htb-green text-3xl md:text-6xl font-bold">
                    Know Our Guest
                </p>
                <div
                    className={`spkr mt-8 px-4 md:px-16 lg:px-32 grid gap-6 ${
                        (event?.speakers_details?.length ?? 0) <= 2
                            ? "grid-cols-1 sm:grid-cols-2 justify-center"
                            : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                    }`}
                >
                    {event?.speakers_details?.map((guest, index) => (
                        <div
                            key={index}
                            className={`flex flex-col items-center bg-[#141D2B] hover:bg-[#1f2c42] rounded-xl border-2 border-htb-green p-6 shadow-lg w-full max-w-xs mx-auto ${
                                !guest.image ? "justify-center h-full" : ""
                            }`}
                        >
                            {guest.image && (
                                <div className="w-full h-48 rounded-xl overflow-hidden flex items-center justify-center">
                                    <Image
                                        src={guest.image}
                                        alt={guest.name}
                                        width={250}
                                        height={250}
                                        className="object-cover rounded-xl"
                                    />
                                </div>
                            )}
                            <div className="speakerInfo text-center mt-4">
                                <p className="text-lg md:text-xl font-bold text-htb-green">
                                    {guest.name}
                                </p>
                                <p className="text-sm md:text-base text-white px-4">
                                    {guest.designation}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="prereq font-share-tech mb-10">
                <p className="text-htb-green text-3xl sm:text-4xl md:text-5xl font-bold text-center my-6">
                    Pre-Requisites
                </p>
                <div className="text-white px-4 sm:px-8 md:px-16 lg:px-64 text-xl sm:text-2xl md:text-3xl font-medium">
                    <ul className="list-disc list-inside">
                        {event?.prerequisites?.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* GALLERY SECTION */}
            {(event?.gallery?.length ?? 0) > 0 && (
                <div className="gallery-section font-share-tech mb-20">
                    <p className="text-htb-green text-4xl md:text-5xl font-bold text-center mb-10">
                        Event Gallery
                    </p>
                    <div className="px-6 md:px-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {event?.gallery?.map((img, i) => (
                            <div
                                key={i}
                                className="relative group overflow-hidden rounded-xl border-2 border-htb-green/50 hover:border-htb-green transition-all duration-300 bg-[#141D2B]"
                            >
                                <img
                                    src={img}
                                    alt={`Event Gallery ${i + 1}`}
                                    className="w-full h-64 object-cover filter grayscale-[40%] group-hover:grayscale-0 transition-all duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1a] via-transparent to-transparent opacity-70" />
                                <div className="absolute bottom-3 left-4 font-mono text-htb-green text-[10px] tracking-tighter opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    [FILE_REF: HTB_IMG_{i + 1}.PNG]
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Dynamically imported modals (loaded only on demand) */}
            <EventRegistrationModal
                isOpen={visibleReg}
                onClose={closeHandlerReg}
                eventName={event?.event_name}
            />

            <CertificateModal
                isOpen={visible}
                onClose={closeHandler}
                slug={slug}
                options={options}
            />
        </>
    );
};

export async function getServerSideProps(
    context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<EventsPageProps>> {
    try {
        context.res.setHeader(
            "Cache-Control",
            "public, s-maxage=60, stale-while-revalidate=300"
        );
        const res = await fetch(`${url_root}/api/v1/events`);
        const { data: events } = await res.json();
        return { props: { events } };
    } catch (error) {
        console.log(error);
        return { notFound: true };
    }
}

export default Event;