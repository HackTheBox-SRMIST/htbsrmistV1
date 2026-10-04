import type {
    NextPage,
    GetServerSidePropsContext,
    GetServerSidePropsResult
} from "next";
import React, { useState, useEffect } from "react";
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
    speakers_details: {
        name: string;
        designation: string;
        details: string;
        image?: string;
    }[];
    event_date: Date;
    is_active: boolean;
    venue: string;
    sponsors_details: {
        name: string;
        place: string;
        details: string;
        image?: string;
    }[];
    duration: number;
    prerequisites: string[] | string;
    cost: number;
    event_time?: string;
    gallery?: string[];
    registration_url?: string;
    slug: string;
    certificate: {
        [key: string]: string | undefined;
    };
}

interface EventsPageProps {
    events: EventProps[];
}

const url_root =
    process.env.BASE_URL_PREVIEW ||
    (process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : `http://localhost:${process.env.PORT || 3000}`);

const Event: NextPage<EventsPageProps> = ({ events = [] }) => {
    const router = useRouter();
    const rawEventId = (router.query.eventId as string) || "";
    const decodedEventId = (() => {
        try {
            return decodeURIComponent(rawEventId).trim().toLowerCase();
        } catch {
            return rawEventId.trim().toLowerCase();
        }
    })();

    const event = (events || []).find((item) => {
        if (!item) return false;
        const itemName = (item.event_name || "").trim().toLowerCase();
        const itemSlug = (item.slug || "").trim().toLowerCase();
        const rawLower = rawEventId.trim().toLowerCase();
        return (
            itemName === decodedEventId ||
            itemSlug === decodedEventId ||
            itemName === rawLower ||
            itemSlug === rawLower ||
            encodeURIComponent(item.event_name || "").toLowerCase() === rawLower
        );
    });

    const slug = event?.slug || event?.event_name;
    const registrationUrl = event?.registration_url?.trim();
    const hasExternalRegistration = Boolean(registrationUrl);
    const isRegistrationActive = Boolean(event?.is_active);
    const hasEventTime = Boolean(event?.event_time?.trim());

    const [visible, setVisible] = useState(false);
    const [visibleReg, setVisibleReg] = useState(false);

    // Preload modal JS bundles in background after mount so clicking them opens instantly
    useEffect(() => {
        if (typeof window !== "undefined") {
            import("../../components/events/CertificateModal");
            import("../../components/events/EventRegistrationModal");
        }
    }, []);

    const handler = () => {
        setVisible(true);
        if (typeof window !== "undefined" && window.document) {
            document.body.style.overflow = "hidden";
        }
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
              .filter(
                  ([key, url]) =>
                      key !== "_id" &&
                      Boolean(url) &&
                      typeof url === "string" &&
                      url.trim() !== ""
              )
              .map(([key]) => ({
                  value: key,
                  label: key
                      .split(/[-_]/)
                      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                      .join(" ")
              }))
        : [];

    const prerequisiteList: string[] = (() => {
        if (Array.isArray(event?.prerequisites)) {
            return (event?.prerequisites as any[]).filter(
                (item): item is string => typeof item === "string" && item.trim().length > 0
            );
        }
        if (typeof event?.prerequisites === "string" && (event?.prerequisites as string).trim().length > 0) {
            return [(event?.prerequisites as string).trim()];
        }
        return [];
    })();
    const hasPrerequisites = prerequisiteList.length > 0;

    const speakersList = Array.isArray(event?.speakers_details)
        ? (event?.speakers_details as any[]).filter(
              (guest) => guest && typeof guest === "object" && Boolean(guest.name?.trim())
          )
        : [];

    const galleryList: string[] = React.useMemo(() => {
        if (Array.isArray(event?.gallery)) {
            return (event?.gallery as any[])
                .map((url) => (typeof url === "string" ? url.trim() : ""))
                .filter((url): url is string => Boolean(url));
        }
        if (typeof event?.gallery === "string") {
            return (event?.gallery as string)
                .split(/[\s\n]+/)
                .map((url) => url.trim())
                .filter((url) => url.startsWith("http"));
        }
        return [];
    }, [event?.gallery]);

    const allPhotos: string[] = React.useMemo(() => {
        const list: string[] = [];
        if (event?.poster_url) list.push(event.poster_url.trim());
        list.push(...galleryList);
        return list;
    }, [event?.poster_url, galleryList]);

    const [currentPhotoIndex, setCurrentPhotoIndex] = useState<number>(0);
    const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
    const [visibleGalleryCount, setVisibleGalleryCount] = useState<number>(12);
    const sliderRef = React.useRef<HTMLDivElement>(null);
    const thumbnailRefs = React.useRef<(HTMLButtonElement | null)[]>([]);

    const scrollActiveThumbnailIntoView = (index: number) => {
        const container = sliderRef.current;
        const thumb = thumbnailRefs.current[index];
        if (container && thumb) {
            const thumbLeft = thumb.offsetLeft;
            const thumbWidth = thumb.offsetWidth;
            const containerWidth = container.offsetWidth;
            container.scrollTo({
                left: thumbLeft - containerWidth / 2 + thumbWidth / 2,
                behavior: "smooth"
            });
        }
    };

    const prevPhoto = (e?: React.MouseEvent | React.TouchEvent) => {
        e?.preventDefault();
        e?.stopPropagation();
        if (allPhotos.length <= 1) return;
        setCurrentPhotoIndex((prev) => {
            const nextIdx = prev > 0 ? prev - 1 : allPhotos.length - 1;
            scrollActiveThumbnailIntoView(nextIdx);
            return nextIdx;
        });
    };

    const nextPhoto = (e?: React.MouseEvent | React.TouchEvent) => {
        e?.preventDefault();
        e?.stopPropagation();
        if (allPhotos.length <= 1) return;
        setCurrentPhotoIndex((prev) => {
            const nextIdx = prev < allPhotos.length - 1 ? prev + 1 : 0;
            scrollActiveThumbnailIntoView(nextIdx);
            return nextIdx;
        });
    };

    // Auto-scroll active thumbnail inside container when currentPhotoIndex changes
    useEffect(() => {
        scrollActiveThumbnailIntoView(currentPhotoIndex);
    }, [currentPhotoIndex]);

    // Preload next and previous images in background for instant zero-delay switching
    useEffect(() => {
        if (allPhotos.length > 1 && typeof window !== "undefined") {
            const nextIdx =
                currentPhotoIndex < allPhotos.length - 1
                    ? currentPhotoIndex + 1
                    : 0;
            const prevIdx =
                currentPhotoIndex > 0
                    ? currentPhotoIndex - 1
                    : allPhotos.length - 1;
            const imgNext = new window.Image();
            imgNext.src = allPhotos[nextIdx];
            const imgPrev = new window.Image();
            imgPrev.src = allPhotos[prevIdx];
        }
    }, [currentPhotoIndex, allPhotos]);

    // Body scroll lock when photo modal is open
    useEffect(() => {
        if (isPhotoModalOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isPhotoModalOpen]);

    // Keyboard navigation (Esc to close modal, Left/Right arrow keys to flip photo anywhere on page)
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            const target = e.target as HTMLElement | null;
            if (
                target &&
                (target.tagName === "INPUT" ||
                    target.tagName === "TEXTAREA" ||
                    target.tagName === "SELECT" ||
                    target.isContentEditable)
            ) {
                return;
            }

            if (e.key === "ArrowLeft") {
                if (allPhotos.length > 1) {
                    e.preventDefault();
                    prevPhoto();
                }
            } else if (e.key === "ArrowRight") {
                if (allPhotos.length > 1) {
                    e.preventDefault();
                    nextPhoto();
                }
            } else if (e.key === "Escape") {
                setIsPhotoModalOpen(false);
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [allPhotos.length]);

    return (
        <>
            <div className="suMain py-10">
                <div className="mx-auto w-[90%] max-w-7xl font-share-tech px-6">
                    <div className=" rounded-2xl flex flex-col md:flex-row">
                        <div className="md:w-1/2 w-full flex flex-col items-center justify-center p-4">
                            {/* Frame wraps tightly around the photo dimensions */}
                            <div className="w-full max-w-[460px] flex items-center justify-center">
                                <div className="border-[2px] border-htb-green rounded-2xl p-1.5 bg-[#141D2B]/40 inline-flex items-center justify-center relative group overflow-hidden select-none max-w-full">
                                    <img
                                        src={allPhotos[currentPhotoIndex] || event?.poster_url || ""}
                                        alt="Event Showcase"
                                        className="max-w-full max-h-[440px] w-auto h-auto object-contain rounded-xl transition-all duration-300 cursor-pointer block"
                                        onClick={() => setIsPhotoModalOpen(true)}
                                    />

                                    {/* Expand Photo Button in team page exact style - appears on hover only */}
                                    <div className="absolute bottom-2.5 right-2.5 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none group-hover:pointer-events-auto">
                                        <button
                                            type="button"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setIsPhotoModalOpen(true);
                                            }}
                                            title="View expanded full photo"
                                            className="px-2.5 py-1.5 sm:px-3 sm:py-1.5 rounded-xl bg-black/80 hover:bg-htb-green active:bg-htb-green text-htb-green hover:text-black active:text-black backdrop-blur-md border border-htb-green/60 font-mono text-[11px] sm:text-xs font-bold flex items-center gap-1 sm:gap-1.5 shadow-[0_0_15px_rgba(0,0,0,0.8)] transition-all active:scale-95 cursor-pointer"
                                        >
                                            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                                                <polyline points="15 3 21 3 21 9" />
                                                <polyline points="9 21 3 21 3 15" />
                                                <line x1="21" y1="3" x2="14" y2="10" />
                                                <line x1="3" y1="21" x2="10" y2="14" />
                                            </svg>
                                            <span>Expand Photo</span>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Poster & Gallery Slider with working arrow buttons to change photo */}
                            {allPhotos.length > 1 && (
                                <div className="w-full max-w-[460px] mt-4 font-share-tech">
                                    <div className="flex items-center justify-between mb-2 px-1">
                                        <span className="text-htb-green text-sm sm:text-base font-bold tracking-wide">
                                            Event Gallery ({allPhotos.length - 1} Photos)
                                        </span>
                                        <span className="text-gray-300 text-xs sm:text-sm font-semibold">
                                            {currentPhotoIndex === 0
                                                ? "Viewing Poster"
                                                : `Photo ${currentPhotoIndex} of ${allPhotos.length - 1}`}
                                        </span>
                                    </div>

                                    <div className="relative flex items-center gap-2">
                                        <button
                                            type="button"
                                            onClick={prevPhoto}
                                            className="w-9 h-9 rounded-xl bg-[#141D2B] border-2 border-htb-green/60 hover:bg-htb-green hover:text-black text-htb-green flex items-center justify-center transition-all shrink-0 cursor-pointer active:scale-90 shadow-md"
                                            aria-label="Previous photo"
                                            title="Previous photo"
                                        >
                                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                                                <polyline points="15 18 9 12 15 6" />
                                            </svg>
                                        </button>

                                        <div
                                            ref={sliderRef}
                                            className="flex gap-2.5 overflow-x-auto py-1 scroll-smooth scrollbar-none [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden w-full"
                                        >
                                            {allPhotos.map((img, i) => (
                                                <button
                                                    key={i}
                                                    ref={(el) => {
                                                        thumbnailRefs.current[i] = el;
                                                    }}
                                                    type="button"
                                                    onClick={() => {
                                                        setCurrentPhotoIndex(i);
                                                        scrollActiveThumbnailIntoView(i);
                                                    }}
                                                    className={`relative shrink-0 w-14 h-14 rounded-xl overflow-hidden border-2 transition-all cursor-pointer bg-[#141D2B] ${
                                                        currentPhotoIndex === i
                                                            ? "border-htb-green scale-105 shadow-[0_0_10px_#9FEF00]"
                                                            : "border-white/20 opacity-60 hover:opacity-100"
                                                    }`}
                                                    title={i === 0 ? "Show Poster" : `Photo ${i}`}
                                                >
                                                    <img
                                                        src={img}
                                                        alt={i === 0 ? "Poster thumbnail" : `Photo thumbnail ${i}`}
                                                        className="w-full h-full object-cover"
                                                        loading="lazy"
                                                    />
                                                </button>
                                            ))}
                                        </div>

                                        <button
                                            type="button"
                                            onClick={nextPhoto}
                                            className="w-9 h-9 rounded-xl bg-[#141D2B] border-2 border-htb-green/60 hover:bg-htb-green hover:text-black text-htb-green flex items-center justify-center transition-all shrink-0 cursor-pointer active:scale-90 shadow-md"
                                            aria-label="Next photo"
                                            title="Next photo"
                                        >
                                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                                                <polyline points="9 18 15 12 9 6" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            )}
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
                            {hasEventTime && (
                                <div className="time bg-[#141D2B] text-white space-x-4 flex flex-row justify-start pl-5 pt-1 w-full md:w-96 h-[54px] rounded-xl">
                                    <div className="lgo mt-1">
                                        <img src="/timeLogo.svg" alt="Time" />
                                    </div>
                                    <div className="txt">
                                        <p className="ml-4 text-white text-xl md:text-2xl mt-[6px] font-semibold">
                                            {event?.event_time}
                                        </p>
                                    </div>
                                </div>
                            )}
                            {hasExternalRegistration ? (
                                <a
                                    href={registrationUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`bg-htb-green w-full md:w-80 text-node-black font-bold text-center py-3 text-2xl rounded-2xl cursor-pointer hover:bg-htb-green/80 active:scale-95 transition-all ${
                                        !isRegistrationActive
                                            ? "pointer-events-none opacity-60"
                                            : ""
                                    }`}
                                >
                                    Register Now
                                </a>
                            ) : (
                                <button
                                    className={`bg-htb-green w-full md:w-80 text-node-black font-bold text-center py-3 text-2xl rounded-2xl transition-all ${
                                        !isRegistrationActive
                                            ? "opacity-60 cursor-not-allowed"
                                            : "cursor-pointer hover:bg-htb-green/80 active:scale-95"
                                    }`}
                                    disabled={!isRegistrationActive}
                                    onClick={handlerReg}
                                >
                                    Register Now
                                </button>
                            )}

                            <button
                                className="bg-htb-green w-full md:w-80 text-node-black font-bold text-center py-3 text-2xl rounded-2xl cursor-pointer hover:bg-htb-green/80 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                onClick={handler}
                                disabled={event?.is_active}
                            >
                                Get Certificate
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="eventText text-white px-4 sm:px-8 md:px-16 lg:px-64 text-2xl sm:text-3xl md:text-4xl font-medium font-share-tech text-left whitespace-pre-line">
                {event?.event_description}
            </div>

            {speakersList.length > 0 && (
                <div className="speaker mt-10 font-share-tech text-center">
                    <p className="text-htb-green text-3xl md:text-6xl font-bold">
                        Know Our Guest
                    </p>
                    <div
                        className={`spkr mt-8 px-4 md:px-16 lg:px-32 grid gap-6 ${
                            speakersList.length <= 2
                                ? "grid-cols-1 sm:grid-cols-2 justify-center"
                                : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                        }`}
                    >
                        {speakersList.map((guest, index) => (
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
            )}

            {hasPrerequisites && (
                <div className="prereq font-share-tech mb-10">
                    <p className="text-htb-green text-3xl sm:text-4xl md:text-5xl font-bold text-center my-6">
                        Pre-Requisites
                    </p>
                    <div className="text-white px-4 sm:px-8 md:px-16 lg:px-64 text-xl sm:text-2xl md:text-3xl font-medium">
                        <ul className="list-disc list-inside">
                            {prerequisiteList.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}

            {/* GALLERY SECTION */}
            {galleryList.length > 0 && (
                <div className="gallery-section font-share-tech mb-20 px-6 md:px-20">
                    <div className="flex flex-col items-center mb-10">
                        <p className="text-htb-green text-4xl md:text-5xl font-bold text-center">
                            Event Gallery
                        </p>
                        {galleryList.length > 12 && (
                            <p className="text-gray-400 text-sm mt-2 font-mono">
                                Showing {Math.min(visibleGalleryCount, galleryList.length)} of {galleryList.length} photos
                            </p>
                        )}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                        {galleryList.slice(0, visibleGalleryCount).map((img, i) => {
                            const trimmedImg = typeof img === "string" ? img.trim() : "";
                            const photoIdx = allPhotos.indexOf(trimmedImg);
                            return (
                                <div
                                    key={i}
                                    onClick={() => {
                                        if (photoIdx !== -1) setCurrentPhotoIndex(photoIdx);
                                        setIsPhotoModalOpen(true);
                                    }}
                                    className="relative group overflow-hidden rounded-xl border-2 border-htb-green/50 hover:border-htb-green transition-all duration-300 bg-[#141D2B] cursor-pointer h-64 select-none"
                                >
                                    <img
                                        src={trimmedImg}
                                        alt={`Event Gallery ${i + 1}`}
                                        loading="lazy"
                                        decoding="async"
                                        className="w-full h-64 object-cover filter grayscale-[30%] group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1a] via-transparent to-transparent opacity-60 group-hover:opacity-20 transition-opacity" />
                                    <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none">
                                        <button
                                            type="button"
                                            className="px-2.5 py-1.5 rounded-xl bg-black/80 hover:bg-htb-green active:bg-htb-green text-htb-green hover:text-black active:text-black backdrop-blur-md border border-htb-green/60 font-mono text-[11px] font-bold flex items-center gap-1.5 shadow-[0_0_15px_rgba(0,0,0,0.8)] transition-all"
                                        >
                                            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                                                <polyline points="15 3 21 3 21 9" />
                                                <polyline points="9 21 3 21 3 15" />
                                                <line x1="21" y1="3" x2="14" y2="10" />
                                                <line x1="3" y1="21" x2="10" y2="14" />
                                            </svg>
                                            <span>Expand Photo</span>
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Load More / Show Less controls when there are many photos */}
                    {galleryList.length > 12 && (
                        <div className="flex justify-center items-center gap-4 mt-10">
                            {visibleGalleryCount < galleryList.length ? (
                                <button
                                    type="button"
                                    onClick={() =>
                                        setVisibleGalleryCount((prev) =>
                                            Math.min(prev + 12, galleryList.length)
                                        )
                                    }
                                    className="px-6 py-2.5 rounded-xl bg-[#141D2B] hover:bg-htb-green text-htb-green hover:text-black border-2 border-htb-green font-mono text-sm font-bold tracking-wide transition-all shadow-md active:scale-95 cursor-pointer flex items-center gap-2"
                                >
                                    <span>Load More Photos</span>
                                    <span className="text-xs opacity-75">
                                        (+{Math.min(12, galleryList.length - visibleGalleryCount)} remaining)
                                    </span>
                                </button>
                            ) : (
                                <button
                                    type="button"
                                    onClick={() => setVisibleGalleryCount(12)}
                                    className="px-6 py-2.5 rounded-xl bg-[#141D2B] hover:bg-htb-green text-htb-green hover:text-black border-2 border-htb-green/60 font-mono text-sm font-bold tracking-wide transition-all shadow-md active:scale-95 cursor-pointer"
                                >
                                    Show Less
                                </button>
                            )}
                        </div>
                    )}
                </div>
            )}

            {/* Expanded Photo Modal (Matches Team Page Style with Navigation Arrows) */}
            {isPhotoModalOpen && allPhotos.length > 0 && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md select-none transition-opacity duration-300"
                    onClick={() => setIsPhotoModalOpen(false)}
                >
                    <div
                        className="relative max-w-[92vw] sm:max-w-[88vw] w-fit rounded-2xl bg-[#0e1622] border-2 border-htb-green/50 shadow-[0_0_40px_rgba(159,239,0,0.25)] flex flex-col overflow-hidden mx-auto transition-all duration-300"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Modal Header */}
                        <div className="flex items-center justify-between gap-4 px-3.5 py-2.5 sm:px-5 sm:py-3 bg-black/75 border-b border-htb-green/30 min-w-[280px]">
                            <div className="flex items-center gap-2 truncate">
                                <span className="w-2.5 h-2.5 rounded-full bg-htb-green shadow-[0_0_8px_#9fef00] animate-pulse shrink-0"></span>
                                <span className="font-mono text-xs sm:text-sm font-bold text-htb-green tracking-wider truncate">
                                    {currentPhotoIndex === 0
                                        ? "Event Poster"
                                        : `Photo ${currentPhotoIndex} of ${allPhotos.length - 1}`}
                                </span>
                            </div>

                            <div className="flex items-center gap-1.5 shrink-0">
                                {allPhotos.length > 1 && (
                                    <div className="flex items-center gap-1">
                                        <button
                                            type="button"
                                            onClick={prevPhoto}
                                            title="Previous photo"
                                            className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-black/80 hover:bg-htb-green active:bg-htb-green text-zinc-300 hover:text-black border border-htb-green/40 flex items-center justify-center transition-all cursor-pointer active:scale-90"
                                        >
                                            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                                                <polyline points="15 18 9 12 15 6" />
                                            </svg>
                                        </button>
                                        <button
                                            type="button"
                                            onClick={nextPhoto}
                                            title="Next photo"
                                            className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-black/80 hover:bg-htb-green active:bg-htb-green text-zinc-300 hover:text-black border border-htb-green/40 flex items-center justify-center transition-all cursor-pointer active:scale-90"
                                        >
                                            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                                                <polyline points="9 18 15 12 9 6" />
                                            </svg>
                                        </button>
                                    </div>
                                )}

                                <button
                                    type="button"
                                    onClick={() => setIsPhotoModalOpen(false)}
                                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-black/80 hover:bg-htb-green active:bg-htb-green text-zinc-300 hover:text-black border border-htb-green/40 flex items-center justify-center transition-all cursor-pointer active:scale-95 ml-1"
                                    title="Close"
                                >
                                    <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round">
                                        <line x1="18" y1="6" x2="6" y2="18" />
                                        <line x1="6" y1="6" x2="18" y2="18" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {/* Modal Image Display - Compact fit to photo resolution */}
                        <div className="p-1 sm:p-2 flex items-center justify-center bg-black/60 overflow-hidden select-none">
                            <img
                                src={allPhotos[currentPhotoIndex] || ""}
                                alt="Event Display"
                                decoding="async"
                                className="max-h-[78vh] sm:max-h-[82vh] max-w-[90vw] sm:max-w-[85vw] w-auto h-auto object-contain rounded-xl select-none block"
                            />
                        </div>
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

// In-memory cache for ultra-fast response
let cachedEvents: EventProps[] = [];
let lastFetchTime = 0;
const CACHE_TTL_MS = 60 * 1000; // 60 seconds

export async function getServerSideProps(
    context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<EventsPageProps>> {
    try {
        context.res.setHeader(
            "Cache-Control",
            "public, s-maxage=60, stale-while-revalidate=300"
        );

        const now = Date.now();
        if (cachedEvents.length > 0 && now - lastFetchTime < CACHE_TTL_MS) {
            return { props: { events: cachedEvents } };
        }

        const protocol = context.req.headers["x-forwarded-proto"] || "http";
        const host =
            context.req.headers.host ||
            `localhost:${process.env.PORT || 3000}`;
        const targetUrl = host
            ? `${protocol}://${host}/api/v1/events`
            : `${url_root}/api/v1/events`;

        const res = await fetch(targetUrl);
        const json = await res.json();
        const eventsList = Array.isArray(json?.data) ? json.data : [];
        if (eventsList.length > 0) {
            cachedEvents = eventsList;
            lastFetchTime = now;
            return { props: { events: eventsList } };
        }
    } catch (error) {
        console.log("Fetch failed in getServerSideProps, trying direct DB:", error);
    }

    try {
        const { Events } = await import("../../utils/services/events.service");
        const eventData = await Events();
        if (Array.isArray(eventData) && eventData.length > 0) {
            const parsed = JSON.parse(JSON.stringify(eventData));
            cachedEvents = parsed;
            lastFetchTime = Date.now();
            return { props: { events: parsed } };
        }
    } catch (dbErr) {
        console.error("DB fallback failed in getServerSideProps:", dbErr);
    }

    if (cachedEvents.length > 0) {
        return { props: { events: cachedEvents } };
    }

    return { props: { events: [] } };
}

export default Event;