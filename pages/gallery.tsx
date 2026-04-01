import { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { DBInstance } from "../utils/db.connect";

interface GalleryImage {
    _id: string;
    url: string;
    title?: string;
    alt?: string;
}

interface GalleryProps {
    images: GalleryImage[];
    error?: string;
}

export const getServerSideProps: GetServerSideProps = async () => {
    try {
        const dbInstance = await DBInstance.getInstance();
        const collection = await dbInstance.getCollection("gallery", "htbsrmist");

        const items = await collection.find({}).sort({ _id: -1 }).toArray();
        console.log(`✅ Gallery fetched ${items.length} items`);

        const images = items
            .map((item: any) => ({
                _id: item._id.toString(),
                url: item.url || item.link || "",
                title: item.title || null,
                alt: item.alt || item.title || null,
            }))
            .filter((img: any) => img.url.trim() !== "");

        return { props: { images } };
    } catch (e: any) {
        console.error("❌ Gallery Fetch Error:", e?.message || e);
        return { props: { images: [], error: e?.message || "Unknown error" } };
    }
};

function shiftArray(arr: GalleryImage[], shiftBy: number): GalleryImage[] {
    if (arr.length === 0) return [];
    const offset = shiftBy % arr.length;
    return [...arr.slice(offset), ...arr.slice(0, offset)];
}

function buildStrip(arr: GalleryImage[], minCount = 16): GalleryImage[] {
    if (arr.length === 0) return [];
    const times = Math.ceil(minCount / arr.length);
    const base = Array.from({ length: times }, () => arr).flat();
    return [...base, ...base];
}

export default function GalleryPage({ images, error }: GalleryProps) {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const [isPaused, setIsPaused] = useState(false);
    const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    
    // Touch swipe state for mobile
    const [touchStart, setTouchStart] = useState<number | null>(null);
    const [touchEnd, setTouchEnd] = useState<number | null>(null);
    const minSwipeDistance = 50;

    // Terminal typewriter effect state
    const [displayText, setDisplayText] = useState("");
    const [isTyping, setIsTyping] = useState(false);

    const onTouchStart = (e: React.TouchEvent) => {
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientX);
    };

    const onTouchMove = (e: React.TouchEvent) => setTouchEnd(e.targetTouches[0].clientX);

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return;
        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;
        if (isLeftSwipe) handleNext();
        if (isRightSwipe) handlePrev();
    };

    const handleMouseEnter = () => {
        hoverTimeoutRef.current = setTimeout(() => {
            setIsPaused(true);
        }, 300);
    };

    const handleMouseLeave = () => {
        if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
        setIsPaused(false);
    };

    const handlePrev = (e?: React.MouseEvent) => {
        e?.stopPropagation();
        if (selectedIndex !== null) {
            setSelectedIndex((prev) => (prev !== null ? (prev - 1 + images.length) % images.length : null));
        }
    };

    const handleNext = (e?: React.MouseEvent) => {
        e?.stopPropagation();
        if (selectedIndex !== null) {
            setSelectedIndex((prev) => (prev !== null ? (prev + 1) % images.length : null));
        }
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") setSelectedIndex(null);
            if (e.key === "ArrowLeft") handlePrev();
            if (e.key === "ArrowRight") handleNext();
        };

        if (selectedIndex !== null) {
            document.body.style.overflow = "hidden";
            window.addEventListener("keydown", handleKeyDown);
            
            // Start typewriter effect when an image is selected
            const fullText = images[selectedIndex]?.title || "Untitled image";
            setDisplayText("");
            setIsTyping(true);
            let i = 0;
            const interval = setInterval(() => {
                setDisplayText(fullText.substring(0, i + 1));
                i++;
                if (i >= fullText.length) {
                    clearInterval(interval);
                    setIsTyping(false);
                }
            }, 30);
            return () => {
                clearInterval(interval);
                window.removeEventListener("keydown", handleKeyDown);
            };
        } else {
            document.body.style.overflow = "auto";
        }

        return () => {
            document.body.style.overflow = "auto";
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [selectedIndex]);

    const row1 = images;
    const row2 = shiftArray(images, Math.floor(images.length / 2));
    const row3 = [...images].reverse();
    const rows = [row1, row2, row3];
    const rowSpeeds = ["80s", "100s", "120s"];

    const selectedImage = selectedIndex !== null ? images[selectedIndex] : null;

    return (
        <>
            <Head>
                <title>Gallery – HTB SRMIST</title>
            </Head>

            <div className="bg-transparent min-h-screen font-poppins text-white flex flex-col selection:bg-[#9fef00] selection:text-black">
                <main className="flex-grow pt-2 md:pt-6 pb-12 md:pb-24 overflow-hidden flex flex-col justify-start">

                    {error && (
                        <p className="text-center text-red-400 text-sm mb-4">
                            DB Error: {error}
                        </p>
                    )}

                    <div className="flex justify-start md:justify-center items-center mb-4 md:mb-6 mt-0 px-6 md:px-0">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white flex flex-col md:flex-row items-start md:items-baseline text-left md:text-center">
                            <span>Our Journey</span>
                            <span className="flex items-baseline md:ml-4">
                                So Far
                                <span className="blinking-square ml-3 md:ml-4 inline-block w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 rounded-sm"></span>
                            </span>
                        </h1>
                    </div>

                    {images.length === 0 ? (
                        <div className="text-center text-gray-500 py-32 text-xl font-light border border-dashed border-[#333] rounded-3xl mx-auto max-w-3xl">
                            No images found in the gallery yet. Stay tuned!
                        </div>
                    ) : (
                        <div
                            className="flex flex-col gap-6 md:gap-16 gallery-wrapper"
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                        >
                            {rows.map((row, rowIndex) => {
                                const isReverse = rowIndex % 2 !== 0;
                                const strip = buildStrip(row);
                                const currentSpeed = rowSpeeds[rowIndex % rowSpeeds.length];

                                return (
                                    <div
                                        key={`row-${rowIndex}`}
                                        className={`overflow-hidden w-full mask-container ${rowIndex === 2 ? 'md:hidden' : ''}`}
                                        style={{
                                            maskImage: "linear-gradient(to right, transparent, black 120px, black calc(100% - 120px), transparent)",
                                            WebkitMaskImage: "linear-gradient(to right, transparent, black 120px, black calc(100% - 120px), transparent)"
                                        }}
                                    >
                                        <div
                                            className="flex gap-8 md:gap-10 scrolling-track"
                                            style={{
                                                width: "max-content",
                                                animation: `${isReverse ? "scroll-right" : "scroll-left"} ${currentSpeed} linear infinite`,
                                                animationPlayState: isPaused ? "paused" : "running",
                                            }}
                                        >
                                            {strip.map((image, i) => {
                                                // Find the original index in the images array
                                                const originalIndex = images.findIndex(img => img._id === image._id);
                                                
                                                return (
                                                    <div
                                                        key={`${image._id}-${rowIndex}-${i}`}
                                                        className={`flex-shrink-0 relative group rounded-2xl overflow-hidden shadow-2xl bg-[#111] border border-[#222] hover:border-[#333] hover:shadow-[0_0_20px_rgba(159,239,0,0.25)] transition-all duration-300 cursor-pointer focus:outline-none focus:ring-4 focus:ring-[#9fef00] w-[280px] h-[158px] sm:w-[380px] sm:h-[214px] md:w-[480px] md:h-[270px] lg:w-[530px] lg:h-[300px] ${i >= row.length ? 'reduce-motion-hidden' : ''}`}
                                                        tabIndex={0}
                                                        role="button"
                                                        aria-label={`View ${image.title || "image"} fullscreen`}
                                                        onClick={() => setSelectedIndex(originalIndex)}
                                                        onKeyDown={(e) => {
                                                            if (e.key === 'Enter' || e.key === ' ') {
                                                                e.preventDefault();
                                                                setSelectedIndex(originalIndex);
                                                            }
                                                        }}
                                                    >
                                                        <Image
                                                            src={image.url}
                                                            alt={image.alt || "HTB SRMIST Gallery image"}
                                                            layout="fill"
                                                            objectFit="cover"
                                                            className="transform transition-transform duration-500 ease-in-out group-hover:scale-110 group-hover:duration-[2000ms] group-hover:ease-out"
                                                            unoptimized={true}
                                                        />
                                                        {image.title && (
                                                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
                                                                <p className="text-white text-base font-semibold truncate border-l-[4px] border-[#9fef00] pl-3 bg-black/40 backdrop-blur-md rounded-r py-1.5 pr-3 w-full">
                                                                    {image.title}
                                                                </p>
                                                            </div>
                                                        )}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </main>

                {selectedImage && (
                    <div
                        className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/60 backdrop-blur-md transition-opacity"
                        onClick={() => setSelectedIndex(null)}
                        onTouchStart={onTouchStart}
                        onTouchMove={onTouchMove}
                        onTouchEnd={onTouchEnd}
                        role="dialog"
                        aria-modal="true"
                    >
                        {/* Navigation buttons - Desktop Only */}
                        <button 
                            className="absolute left-4 top-1/2 -translate-y-1/2 z-[60] p-3 text-[#9fef00] hover:bg-white/5 rounded-full transition-all hidden lg:block group"
                            onClick={handlePrev}
                            aria-label="Previous image"
                        >
                            <svg className="w-8 h-8 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <button 
                            className="absolute right-4 top-1/2 -translate-y-1/2 z-[60] p-3 text-[#9fef00] hover:bg-white/5 rounded-full transition-all hidden lg:block group"
                            onClick={handleNext}
                            aria-label="Next image"
                        >
                            <svg className="w-8 h-8 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>

                        <div
                            className="relative w-fit max-w-[98vw] md:max-w-[85vw] max-h-[95vh] flex flex-col animate-in fade-in zoom-in-95 duration-200 bg-[#0a0a0a] border border-[#333] rounded-xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)]"
                            onClick={e => e.stopPropagation()}
                        >
                            <div className="flex items-center justify-between px-3 py-2.5 bg-[#161616] border-b border-[#2a2a2a] w-full shrink-0">
                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => setSelectedIndex(null)}
                                        className="w-3.5 h-3.5 rounded-full bg-[#ff5f56] hover:bg-[#ff7b73] transition-all hover:scale-110 active:scale-90 shadow-sm hover:shadow-[0_0_10px_rgba(255,95,86,0.5)] cursor-pointer"
                                        aria-label="Close"
                                    ></button>
                                    <div className="w-3.5 h-3.5 rounded-full bg-[#ffbd2e]"></div>
                                    <div className="w-3.5 h-3.5 rounded-full bg-[#27c93f]"></div>
                                </div>

                                <div className="flex-1 text-center font-mono text-[10px] md:text-xs text-gray-400 tracking-wider truncate px-4">
                                    gallery@htbchennai: ~/{selectedImage._id.substring(0, 8)}.jpg
                                </div>

                                <div className="text-[10px] md:text-xs font-mono text-[#9fef00]/70">
                                    {selectedIndex !== null ? selectedIndex + 1 : 0}/{images.length}
                                </div>
                            </div>

                            <div className="flex flex-col flex-1 min-h-0 bg-[#050505] w-full items-center justify-center relative group/img">
                                <img
                                    src={selectedImage.url}
                                    key={selectedImage.url}
                                    alt={selectedImage.alt || "Fullscreen gallery image"}
                                    className="block w-auto h-auto max-w-full max-h-[60vh] md:max-h-[70vh] object-contain"
                                />

                                <div className="w-full text-left font-mono bg-[#0a0a0a] p-3 md:p-5 border-t border-[#222] shrink-0">
                                    <p className="text-[10px] md:text-xs text-gray-500 mb-1.5 flex items-center gap-2">
                                        <span className="text-[#9fef00]">➜</span> 
                                        <span className="text-[#3b8eea]">~</span> 
                                        <span className="hidden sm:inline">echo "{selectedImage.title || "Untitled"}"</span>
                                        <span className="sm:hidden">info --display</span>
                                    </p>
                                    <div className="flex justify-between items-center gap-3">
                                        <div className="flex-1 min-h-[1.2rem]">
                                            <p className="text-white text-xs md:text-base pl-2.5 border-l-2 border-[#9fef00] leading-tight">
                                                {displayText || " "}
                                                <span className={`terminal-cursor inline-block w-1.5 h-3.5 ml-1 bg-[#9fef00] ${isTyping ? 'opacity-100' : ''}`}></span>
                                            </p>
                                        </div>
                                        
                                        <div className="flex gap-2 shrink-0">
                                            <button 
                                                onClick={handlePrev}
                                                className="text-[10px] md:text-xs text-gray-500 hover:text-[#9fef00] font-mono border border-gray-800 hover:border-[#9fef00]/30 px-2 py-1 rounded transition-colors uppercase"
                                            >
                                                &lt; Prev
                                            </button>
                                            <button 
                                                onClick={handleNext}
                                                className="text-[10px] md:text-xs text-gray-500 hover:text-[#9fef00] font-mono border border-gray-800 hover:border-[#9fef00]/30 px-2 py-1 rounded transition-colors uppercase"
                                            >
                                                Next &gt;
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <style jsx global>{`
                    @keyframes scroll-left {
                        from { transform: translate3d(0, 0, 0); }
                        to   { transform: translate3d(-50%, 0, 0); }
                    }
                    @keyframes scroll-right {
                        from { transform: translate3d(-50%, 0, 0); }
                        to   { transform: translate3d(0, 0, 0); }
                    }

                    .scrolling-track {
                        will-change: transform;
                        transition: animation-play-state 0.3s ease;
                    }

                    .blinking-square {
                        animation: blink-htb 1.2s infinite;
                    }

                    .terminal-cursor {
                        animation: blink-cursor 1s step-end infinite;
                    }

                    @keyframes blink-htb {
                        0%, 100% { background-color: #ffffff; box-shadow: 0 0 0px transparent; }
                        50% { background-color: #9fef00; box-shadow: 0 0 8px rgba(159,239,0,0.5); }
                    }

                    @keyframes blink-cursor {
                        0%, 100% { opacity: 1; }
                        50% { opacity: 0; }
                    }

                    @media (prefers-reduced-motion: reduce) {
                        .scrolling-track {
                            animation: none !important;
                            flex-wrap: wrap !important;
                            width: 100% !important;
                            justify-content: center;
                        }
                        .mask-container {
                            mask-image: none !important;
                            -webkit-mask-image: none !important;
                            overflow: visible !important;
                        }
                        .reduce-motion-hidden {
                            display: none !important;
                        }
                    }
                `}</style>
            </div>
        </>
    );
}