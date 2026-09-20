import type {
    NextPage,
    GetServerSidePropsContext,
    GetServerSidePropsResult
} from "next";
import axios, { isCancel, AxiosError } from "axios";
import Member from "../components/teams/member";
import Roles from "../components/teams/roles";
import LetterGlitch from "../components/Backgrounds/LetterGlitch/LetterGlitch";
import React, { useState, useEffect, Fragment } from "react";
import fs from "fs";
import path from "path";
import { DBInstance } from "../utils/db.connect";

interface MemberProps {
    pictureUrl: string | undefined;
    name: string;
    isCurrent: boolean;
    joined: number;
    caption: string;
    position: string;
    domain: string;
    socials: {
        linkedin: string | "";
        github: string | "";
        twitter: string | "";
        website: string | "";
    };
    status: { position: string; joined: number }[];
    servedSince?: string;
}

interface TeamPageProps {
    members: MemberProps[];
}

const domainTabs: { key: "Development" | "Security" | "Corporate" | "Creatives"; label: string }[] = [
    { key: "Development", label: "Development" },
    { key: "Security", label: "CyberSecurity" },
    { key: "Corporate", label: "Corporate" },
    { key: "Creatives", label: "Creatives" }
];

const hierarchy = [{ role: "Admins", name: "Root" }];

const rankButtons: { key: "Root" | "Sudoer" | "Sticky Bit" | "Binary"; label: string; fullTitle: string }[] = [
    { key: "Root", label: "Admin", fullTitle: "Admins [Root]" },
    { key: "Sudoer", label: "Leads", fullTitle: "Leads [Sudoer]" },
    { key: "Sticky Bit", label: "Associates", fullTitle: "Associates [Sticky Bit]" },
    { key: "Binary", label: "Members", fullTitle: "Members [Binary]" }
];

const TEAM_PHOTOS = [
    {
        url: "https://ik.imagekit.io/htbsrmist/Group%20Photo/team2025-26.jpg",
        name: "team2025-26.jpg",
        label: "2025 - 2026"
    },
    {
        url: "https://ik.imagekit.io/htbsrmist/Group%20Photo/team.JPG",
        name: "team.JPG",
        label: "2023 - 2024"
    }
];

const Team: NextPage<TeamPageProps> = ({ members }) => {
    const [activeDomain, changeDomain] = useState<
        "Development" | "Creatives" | "Corporate" | "Security"
    >("Development");

    const [activeRank, setActiveRank] = useState<"All" | "Root" | "Sudoer" | "Sticky Bit" | "Binary">("All");

    const [isYearDropdownOpen, setIsYearDropdownOpen] = useState(false);

    const [showFounders, setShowFounders] = useState(false);
    const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
    const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
    const [photoIndex, setPhotoIndex] = useState<number>(0);
    const [isBannerRevealed, setIsBannerRevealed] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const activeModalPhoto = TEAM_PHOTOS[photoIndex];

    const openPhotoModal = () => {
        setPhotoIndex(0); // Always default to the latest photo (team2025-26.jpg)
        setIsPhotoModalOpen(true);
    };

    const closePhotoModal = () => {
        setIsPhotoModalOpen(false);
        setPhotoIndex(0);
    };

    const prevPhotoHandler = (e?: React.MouseEvent | React.TouchEvent) => {
        e?.stopPropagation();
        setPhotoIndex((prev) => (prev > 0 ? prev - 1 : TEAM_PHOTOS.length - 1));
    };

    const nextPhotoHandler = (e?: React.MouseEvent | React.TouchEvent) => {
        e?.stopPropagation();
        setPhotoIndex((prev) => (prev < TEAM_PHOTOS.length - 1 ? prev + 1 : 0));
    };

    useEffect(() => {
        // Pause the loop if either modal is open or desktop user is hovering over the banner
        if (isPhotoModalOpen || isInfoModalOpen || isHovered) {
            return;
        }

        // Loop: 2 seconds for 010101 binary intro, then 8 seconds for the full moving photo pan
        const duration = isBannerRevealed ? 8000 : 1000;
        const timer = setTimeout(() => {
            setIsBannerRevealed((prev) => !prev);
        }, duration);

        return () => clearTimeout(timer);
    }, [isBannerRevealed, isHovered, isPhotoModalOpen, isInfoModalOpen]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                closePhotoModal();
                setIsInfoModalOpen(false);
                setIsYearDropdownOpen(false);
            } else if (e.key === "ArrowLeft") {
                setPhotoIndex((prev) => (prev > 0 ? prev - 1 : TEAM_PHOTOS.length - 1));
            } else if (e.key === "ArrowRight") {
                setPhotoIndex((prev) => (prev < TEAM_PHOTOS.length - 1 ? prev + 1 : 0));
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    // compute available years from the full status arrays, starting from 2023
    const allYears: number[] = Array.from(
        new Set(
            members.flatMap((m) =>
                Array.isArray(m.status) ? m.status.map((s) => s.joined) : []
            )
        )
    )
        .filter((yr) => yr >= 2023)
        .sort((a, b) => b - a);

    const currentYear = new Date().getFullYear();
    const latestJoinedYearInDb = allYears.length > 0 ? allYears[0] : 0;
    const maxYear = Math.max(latestJoinedYearInDb, currentYear);

    // Dynamic yearsToShow starting from maxYear down to 2023
    const yearsToShow: number[] = [];
    for (let yr = maxYear; yr >= 2023; yr--) {
        yearsToShow.push(yr);
    }

    const [activeYear, setActiveYear] = useState<number>(maxYear);

    // derive members for the currently selected year
    const yearMembers: MemberProps[] = members
        .filter((m) => m.isCurrent !== false) // ✅ hide inactive members
        .map((m) => {
            let statusEntry = undefined;
            if (Array.isArray(m.status) && m.status.length > 0) {
                statusEntry = m.status.find(
                    (s) => Number(s.joined) === Number(activeYear)
                );
            } else if (Number(m.joined) === Number(activeYear)) {
                statusEntry = { position: m.position, joined: m.joined };
            }

            if (!statusEntry) return null;
            return {
                ...m,
                position: statusEntry.position,
                joined: statusEntry.joined
            } as MemberProps;
        })
        .filter(Boolean) as MemberProps[];

    const Creatives = yearMembers.filter(
        (el) => el.domain === "Creatives" && el.position !== "Root"
    );

    const Development = yearMembers.filter(
        (el) => el.domain === "Development" && el.position !== "Root"
    );

    const Corporate = yearMembers.filter(
        (el) => el.domain === "Corporate" && el.position !== "Root"
    );

    const Security = yearMembers.filter(
        (el) =>
            (el.domain === "Cyber Security" || el.domain === "Security") &&
            el.position !== "Root"
    );

    const crew = {
        Creatives,
        Development,
        Corporate,
        Security
    };

    var filterBinaries = function (element: any) {
        return element.position === "Binary" || element.position === "Member" || element.position === "Members";
    };

    var filterSudoers = function (element: any) {
        return element.position === "Sudoer" || element.position === "Leads" || element.position === "Lead";
    };

    var filterStickyBits = function (element: any) {
        return (
            element.position === "Associates" ||
            element.position === "Sticky Bit" ||
            element.position === "Associate"
        );
    };

    const selectYear = (year: number) => {
        setActiveYear(year);
        setActiveRank("All");
        changeDomain("Development");
    };

    const toggleRank = (rankKey: "Root" | "Sudoer" | "Sticky Bit" | "Binary") => {
        if (activeRank === rankKey) {
            // Crossing / unselecting the ranking filter -> reset rank to "All" and force domain back to "Development"
            setActiveRank("All");
            changeDomain("Development");
        } else {
            // Selecting or switching ranking -> keep the currently selected domain as it is
            setActiveRank(rankKey);
        }
    };

    const facultyConvenors = members
        .filter(
            (mem) => mem.position === "Mainframe" && mem.domain === "Faculty Convenor"
        )
        .map((mem) => {
            let years: number[] = [];
            if (Array.isArray(mem.status) && mem.status.length > 0) {
                years = Array.from(new Set(mem.status.map(s => s.joined))).sort((a, b) => a - b);
            } else if (mem.joined) {
                years = [mem.joined];
            }

            const minYear = years.length > 0 ? years[0] : 0;
            const maxYear = years.length > 0 ? years[years.length - 1] : 0;

            return {
                ...mem,
                caption: "",
                minYear,
                maxYear
            };
        })
        .sort((a, b) => b.maxYear - a.maxYear)
        .map((mem, idx, arr) => ({
            ...mem,
            servedSince: idx === 0
                ? `Since ${mem.minYear}`
                : `${mem.minYear} - ${arr[idx - 1].minYear - 1}`
        }));

    // Combine Faculty Convenors with original Founders
    const founders = members
        .filter((mem) => {
            return (
                (mem.joined === 2022 && mem.position === "Mainframe") ||
                (mem.position === "Kernel" && (mem.joined === 2019 || mem.joined === 2022))
            );
        })
        .sort((a, b) => {
            if (a.position === "Mainframe" && b.position !== "Mainframe") {
                return -1;
            }
            if (a.position !== "Mainframe" && b.position === "Mainframe") {
                return 1;
            }
            return 0;
        });

    const allFounders = [
        ...facultyConvenors,
        ...founders.filter(f => !facultyConvenors.some(fc => fc.name === f.name))
    ];

    const activeDomainLabel = domainTabs.find(d => d.key === activeDomain)?.label || activeDomain;

    const memberListClass = "flex flex-wrap justify-center items-stretch gap-x-2 sm:gap-x-3 lg:gap-x-3.5 gap-y-2 sm:gap-y-4 w-full mt-0.5 mb-1 sm:my-2";
    const memberItemClass = "w-[calc(50%-6px)] sm:w-[calc(33.333%-10px)] md:w-[calc(25%-10px)] lg:w-[calc(16.666%-12px)] max-w-[195px] sm:max-w-[210px] flex justify-center items-stretch shrink-0 self-stretch";

    return (
        <section className="w-full min-h-screen bg-none flex flex-col justify-start items-center px-2 sm:px-6 pb-6 sm:pb-14">
            {/* Hero Section Banner */}
            <div
                onClick={() => {
                    setIsBannerRevealed((prev) => !prev);
                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="group relative w-full max-w-7xl mx-auto overflow-hidden flex items-center justify-center text-center font-bold min-h-[105px] sm:min-h-[160px] md:min-h-[195px] py-2 sm:py-5 md:py-7 text-base sm:text-2xl md:text-3xl text-htb-green bg-transparent rounded-2xl sm:rounded-3xl border-2 border-solid border-htb-green/50 mb-2 sm:mb-4 hover:border-htb-green transition-all duration-300 shadow-[0_0_20px_rgba(159,239,0,0.12)] cursor-pointer"
            >
                {/* Moving Team Photo Background (mainly top part shown, smoothly panning left-to-right) */}
                <div
                    className={`absolute inset-0 w-full h-full overflow-hidden transition-opacity duration-700 z-10 pointer-events-none ${
                        isBannerRevealed ? "opacity-90" : "opacity-0"
                    }`}
                >
                    <img
                        src={TEAM_PHOTOS[0].url}
                        alt="HackTheBox SRMIST Team"
                        className="w-full h-full object-cover object-[center_18%] animate-team-pan select-none"
                    />
                </div>
                <div
                    className={`relative transform transition-all duration-500 z-30 text-[26px] min-[400px]:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-wide select-none ${
                        isBannerRevealed
                            ? "opacity-0 scale-110 pointer-events-none"
                            : "opacity-100"
                    }`}
                >
                    Our Team
                </div>
                <div
                    className={`absolute inset-0 w-full h-full z-20 transition-opacity duration-500 ${
                        isBannerRevealed ? "opacity-0 pointer-events-none" : "opacity-80"
                    }`}
                >
                    <LetterGlitch
                        glitchSpeed={50}
                        centerVignette={true}
                        outerVignette={false}
                        smooth={true}
                        glitchColors={[]}
                    />
                </div>

                {/* Banner Actions: About Us & Expand Photo (Only clickable when 010101 disappears and photo is revealed) */}
                <div
                    className={`absolute bottom-2 right-2 sm:bottom-3 sm:right-3 md:bottom-4 md:right-4 z-40 flex items-center gap-1.5 sm:gap-2 transition-all duration-500 ${
                        isBannerRevealed
                            ? "opacity-100 pointer-events-auto visible"
                            : "opacity-0 pointer-events-none invisible"
                    }`}
                >
                    {/* About Us Button -> Opens Info Glass Popup */}
                    <button
                        type="button"
                        disabled={!isBannerRevealed}
                        onClick={(e) => {
                            e.stopPropagation();
                            if (!isBannerRevealed) return;
                            setIsInfoModalOpen(true);
                        }}
                        onTouchEnd={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            if (!isBannerRevealed) return;
                            setIsInfoModalOpen(true);
                        }}
                        title="About HackTheBox SRMIST"
                        className={`px-2.5 py-1.5 sm:px-3.5 sm:py-1.5 rounded-xl bg-black/80 hover:bg-white active:bg-white text-zinc-300 hover:text-black active:text-black backdrop-blur-md border border-white/20 font-mono text-[11px] sm:text-xs font-medium flex items-center gap-1 sm:gap-1.5 shadow-[0_0_15px_rgba(0,0,0,0.8)] transition-all active:scale-95 z-50 touch-manipulation min-h-[30px] sm:min-h-[36px] ${
                            isBannerRevealed ? "pointer-events-auto cursor-pointer" : "pointer-events-none cursor-default"
                        }`}
                    >
                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round">
                            <line x1="12" y1="5" x2="12" y2="19" />
                            <line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                        <span>About</span>
                    </button>

                    {/* Expand Photo Button -> Opens Photo Modal */}
                    <button
                        type="button"
                        disabled={!isBannerRevealed}
                        onClick={(e) => {
                            e.stopPropagation();
                            if (!isBannerRevealed) return;
                            openPhotoModal();
                        }}
                        onTouchEnd={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            if (!isBannerRevealed) return;
                            openPhotoModal();
                        }}
                        title="View expanded full photo"
                        className={`px-2.5 py-1.5 sm:px-3.5 sm:py-1.5 rounded-xl bg-black/80 hover:bg-htb-green active:bg-htb-green text-htb-green hover:text-black active:text-black backdrop-blur-md border border-htb-green/60 font-mono text-[11px] sm:text-xs font-bold flex items-center gap-1 sm:gap-1.5 shadow-[0_0_15px_rgba(0,0,0,0.8)] transition-all active:scale-95 z-50 touch-manipulation min-h-[30px] sm:min-h-[36px] ${
                            isBannerRevealed ? "pointer-events-auto cursor-pointer" : "pointer-events-none cursor-default"
                        }`}
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

            {/* Navigation & Controls Bar */}
            <div className="relative flex flex-wrap justify-center items-center gap-2 sm:gap-3 py-1.5 sm:py-2.5 w-full max-w-7xl z-40">
                {!showFounders ? (
                    <>
                        {/* Backdrop to close dropdown when clicking outside */}
                        {isYearDropdownOpen && (
                            <div
                                className="fixed inset-0 z-40 bg-black/40 backdrop-blur-[2px]"
                                onClick={() => setIsYearDropdownOpen(false)}
                            />
                        )}
                        <div className="z-40">
                            <button
                                onClick={() => setIsYearDropdownOpen(!isYearDropdownOpen)}
                                className="relative flex items-center justify-between gap-1.5 sm:gap-2.5 bg-black/70 hover:bg-black/90 border-2 border-htb-green/50 hover:border-htb-green px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full text-htb-green font-extrabold text-xs sm:text-base focus:outline-none cursor-pointer transition-all shadow-[0_0_10px_rgba(159,239,0,0.15)]"
                            >
                                <span className="tracking-wide">Year: {activeYear}</span>
                                <svg
                                    className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-300 ${
                                        isYearDropdownOpen ? "rotate-180" : "rotate-0"
                                    }`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M19 9l-7 7-7-7"
                                    ></path>
                                </svg>
                            </button>
                        </div>

                        {/* Button to Show Founders & Convenors */}
                        <button
                            type="button"
                            onClick={() => setShowFounders(true)}
                            className="px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full border-2 border-htb-green/50 hover:border-htb-green text-htb-green font-extrabold text-xs sm:text-base bg-black/50 hover:bg-htb-green/10 transition-all cursor-pointer shadow-[0_0_10px_rgba(159,239,0,0.15)]"
                        >
                            Founders &amp; Convenors
                        </button>

                        {/* Year selection dropdown (page-centered) */}
                        {isYearDropdownOpen && (
                            <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 z-50 w-[300px] max-w-[calc(100vw-24px)] sm:w-[380px] md:w-[440px] lg:w-[520px] bg-black/95 backdrop-blur-lg border border-htb-green/50 shadow-[0_15px_30px_rgba(151,253,30,0.25)] rounded-2xl p-4 sm:p-5 transition-all duration-300">
                                <div className="text-center text-xs sm:text-sm text-white/60 mb-2.5 font-semibold uppercase tracking-widest border-b border-white/10 pb-2">
                                    Select Year
                                </div>
                                <div className="grid grid-cols-4 gap-2 sm:gap-3">
                                    {(allYears.length > 0 ? allYears : yearsToShow).map((yr) => (
                                        <button
                                            key={yr}
                                            onClick={() => {
                                                selectYear(yr);
                                                setIsYearDropdownOpen(false);
                                            }}
                                            className={`py-2 px-1 text-center rounded-xl font-medium text-sm sm:text-base transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer ${
                                                activeYear === yr
                                                    ? "bg-htb-green text-black font-bold shadow-[0_0_12px_rgba(151,253,30,0.4)]"
                                                    : "bg-[#111] hover:bg-htb-green/20 text-white/80 hover:text-htb-green border border-white/5 hover:border-htb-green/30"
                                            }`}
                                        >
                                            {yr}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </>
                ) : (
                    /* Button to Return to Current Team */
                    <button
                        type="button"
                        onClick={() => {
                            setShowFounders(false);
                            setActiveRank("All");
                            changeDomain("Development");
                        }}
                        className="px-5 sm:px-8 py-2 sm:py-2.5 rounded-full bg-htb-green text-black font-extrabold text-xs sm:text-lg shadow-[0_0_15px_rgba(159,239,0,0.4)] transition-all cursor-pointer hover:bg-[#b8ff1f]"
                    >
                        ‹ Back to Current Team
                    </button>
                )}
            </div>

            {/* Hierarchy / Rank Filter Bar (FOSS Style in HTB Cyber Theme) */}
            {!showFounders && (
                <div className="w-full max-w-7xl mx-auto my-1 sm:my-2 px-2 sm:px-3 py-1 sm:py-1.5 rounded-xl border border-htb-green/60 bg-black/40 backdrop-blur-md flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-2 shadow-[0_0_10px_rgba(159,239,0,0.10)] z-20">
                    <div className="flex items-center gap-0.5 sm:gap-1 overflow-x-auto scrollbar-none py-0.5 max-w-full">
                        <span className="text-xs sm:text-sm font-mono text-zinc-400 font-semibold uppercase tracking-tight sm:tracking-wider pr-0 sm:pr-1 select-none shrink-0">
                            Rank:
                        </span>

                        {rankButtons.map((r, idx) => {
                            const isActive = activeRank === r.key;
                            return (
                                <Fragment key={r.key}>
                                    {idx > 0 && (
                                        <span className="text-htb-green font-bold text-[13px] sm:text-sm select-none px-0 sm:px-0.5 drop-shadow-[0_0_6px_rgba(159,239,0,0.7)]">&gt;</span>
                                    )}
                                    <button
                                        type="button"
                                        onClick={() => toggleRank(r.key)}
                                        className={`px-2 sm:px-3 py-0.5 sm:py-1 rounded-lg text-[13px] sm:text-sm font-mono font-medium transition-all duration-200 cursor-pointer flex items-center gap-1 shrink-0 active:scale-95 ${
                                            isActive
                                                ? "border border-htb-green text-black bg-htb-green font-semibold shadow-sm"
                                                : "border border-white/15 text-zinc-300 bg-white/5 hover:bg-white/10 hover:text-white hover:border-white/30"
                                        }`}
                                        title={isActive ? `Filtered by ${r.fullTitle} — Click to clear` : `Filter by ${r.fullTitle}`}
                                    >
                                        <span>{r.label}</span>
                                        {isActive && (
                                            <svg className="w-3.5 h-3.5 text-black shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        )}
                                    </button>
                                </Fragment>
                            );
                        })}
                    </div>

                    {/* Right Status Indicator */}
                    <div className="text-xs font-mono text-zinc-500 hidden sm:flex items-center justify-end px-1 select-none">
                        <span>Click rank to filter</span>
                    </div>
                </div>
            )}

            {/* ─── CASE A: CURRENT TEAM VIEW (DEFAULT) ───────────────────── */}
            {!showFounders ? (
                <div className="flex flex-col justify-center items-center text-center w-full max-w-7xl mx-auto">
                    {/* Domain Switcher Buttons when rank is specifically filtered */}
                    {activeRank !== "All" && (
                        <div className="flex flex-wrap justify-center items-center gap-x-1 gap-y-1.5 sm:gap-2 py-1.5 sm:py-3.5 w-full max-w-full px-0 sm:px-1">
                            {domainTabs.map((tab) => (
                                <button
                                    key={tab.key}
                                    onClick={() => changeDomain((prev) => (prev === tab.key ? "Development" : tab.key))}
                                    className={`${tab.label.length <= 9 ? "px-1.5" : "px-2.5"} sm:px-5 py-0.5 sm:py-1.5 rounded-full font-bold text-[12.7px] min-[360px]:text-sm sm:text-sm tracking-tight sm:tracking-normal text-center leading-tight whitespace-nowrap shrink-0 transition-all duration-200 cursor-pointer ${
                                        activeDomain === tab.key
                                            ? "bg-htb-green text-black shadow-[0_0_12px_rgba(159,239,0,0.4)]"
                                            : "border border-htb-green/40 text-htb-green/90 hover:border-htb-green hover:text-htb-green hover:bg-htb-green/10"
                                    }`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Admins (Root) - filtered by activeDomain when activeRank === "Root" */}
                    {activeRank === "Root" && (
                        <div className="w-full">
                            <Roles role="Admins" name="Root" />
                            {yearMembers.filter(
                                (mem) =>
                                    mem.position === "Root" &&
                                    mem.joined === activeYear &&
                                    (activeDomain === "Security"
                                        ? mem.domain === "Cyber Security" || mem.domain === "Security"
                                        : mem.domain === activeDomain)
                            ).length !== 0 ? (
                                <div className={memberListClass}>
                                    {yearMembers
                                        .filter(
                                            (mem) =>
                                                mem.position === "Root" &&
                                                mem.joined === activeYear &&
                                                (activeDomain === "Security"
                                                    ? mem.domain === "Cyber Security" || mem.domain === "Security"
                                                    : mem.domain === activeDomain)
                                        )
                                        .map((mem) => (
                                            <div key={mem.name} className={memberItemClass}>
                                                <Member
                                                    name={mem.name}
                                                    image={mem.pictureUrl}
                                                    position={mem.position}
                                                    caption={mem.caption}
                                                    domain={mem.domain}
                                                    socials={mem.socials}
                                                />
                                            </div>
                                        ))}
                                </div>
                            ) : (
                                <p className="text-sm sm:text-base my-3 text-zinc-400 font-mono text-center">
                                    No Admins recorded for {activeDomainLabel}
                                </p>
                            )}
                        </div>
                    )}

                    {/* Admins (Root) - all domains when activeRank === "All" */}
                    {activeRank === "All" &&
                        hierarchy.map((el) => {
                            const domainMembers = yearMembers.filter(
                                (mem) =>
                                    mem.position === el.name &&
                                    mem.joined === activeYear
                            );
                            if (domainMembers.length === 0) return null;
                            return (
                                <div key={el.role} className="w-full">
                                    <Roles role={el.role} name={el.name} />
                                    <div className={memberListClass}>
                                        {domainMembers.map((mem) => (
                                            <div key={mem.name} className={memberItemClass}>
                                                <Member
                                                    name={mem.name}
                                                    image={mem.pictureUrl}
                                                    position={mem.position}
                                                    caption={mem.caption}
                                                    domain={mem.domain}
                                                    socials={mem.socials}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}

                    {/* Domain Switcher Buttons when activeRank === "All" */}
                    {activeRank === "All" && (
                        <div className="flex flex-wrap justify-center items-center gap-x-1 gap-y-1.5 sm:gap-2 pt-1 pb-1 sm:py-3.5 w-full max-w-full px-0 sm:px-1">
                            {domainTabs.map((tab) => (
                                <button
                                    key={tab.key}
                                    onClick={() => changeDomain((prev) => (prev === tab.key ? "Development" : tab.key))}
                                    className={`${tab.label.length <= 9 ? "px-1.5" : "px-2.5"} sm:px-5 py-0.5 sm:py-1.5 rounded-full font-bold text-[12.7px] min-[360px]:text-sm sm:text-sm tracking-tight sm:tracking-normal text-center leading-tight whitespace-nowrap shrink-0 transition-all duration-200 cursor-pointer ${
                                        activeDomain === tab.key
                                            ? "bg-htb-green text-black shadow-[0_0_12px_rgba(159,239,0,0.4)]"
                                            : "border border-htb-green/40 text-htb-green/90 hover:border-htb-green hover:text-htb-green hover:bg-htb-green/10"
                                    }`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Roles for Active Domain */}
                    {activeRank !== "Root" && (
                        <div className="flex flex-col justify-center items-center w-full space-y-1 sm:space-y-4">
                            {/* Leads [Sudoer] */}
                            {(activeRank === "All" || activeRank === "Sudoer") && (
                                <div className="w-full">
                                    <Roles role="Leads" name="Sudoer" />
                                    {crew[activeDomain].filter(filterSudoers).length !== 0 ? (
                                        <div className={memberListClass}>
                                            {crew[activeDomain]
                                                .filter(filterSudoers)
                                                .map((mem: MemberProps) => (
                                                    <div key={mem.name} className={memberItemClass}>
                                                        <Member
                                                            name={mem.name}
                                                            image={mem.pictureUrl}
                                                            position={mem.position}
                                                            caption={mem.caption}
                                                            domain={mem.domain}
                                                            socials={mem.socials}
                                                        />
                                                    </div>
                                                ))}
                                        </div>
                                    ) : (
                                        <p className="text-sm sm:text-base my-3 text-zinc-400 font-mono text-center">
                                            No Leads recorded for {activeDomain}
                                        </p>
                                    )}
                                </div>
                            )}

                            {/* Associates [Sticky Bit] */}
                            {(activeRank === "All" || activeRank === "Sticky Bit") && (
                                <div className="w-full">
                                    <Roles role="Associates" name="Sticky Bit" />
                                    {crew[activeDomain].filter(filterStickyBits).length !== 0 ? (
                                        <div className={memberListClass}>
                                            {crew[activeDomain]
                                                .filter(filterStickyBits)
                                                .map((mem: MemberProps) => (
                                                    <div key={mem.name} className={memberItemClass}>
                                                        <Member
                                                            name={mem.name}
                                                            image={mem.pictureUrl}
                                                            position={mem.position}
                                                            caption={mem.caption}
                                                            domain={mem.domain}
                                                            socials={mem.socials}
                                                        />
                                                    </div>
                                                ))}
                                        </div>
                                    ) : (
                                        <p className="text-sm sm:text-base my-3 text-zinc-400 font-mono text-center">
                                            No Associates recorded for {activeDomain}
                                        </p>
                                    )}
                                </div>
                            )}

                            {/* Members [Binary] */}
                            {(activeRank === "All" || activeRank === "Binary") && (
                                <div className="w-full">
                                    <Roles role="Members" name="Binary" />
                                    {crew[activeDomain].filter(filterBinaries).length !== 0 ? (
                                        <div className={memberListClass}>
                                            {crew[activeDomain]
                                                .filter(filterBinaries)
                                                .map((mem: MemberProps) => (
                                                    <div key={mem.name} className={memberItemClass}>
                                                        <Member
                                                            name={mem.name}
                                                            image={mem.pictureUrl}
                                                            position={mem.position}
                                                            caption={mem.caption}
                                                            domain={mem.domain}
                                                            socials={mem.socials}
                                                        />
                                                    </div>
                                                ))}
                                        </div>
                                    ) : (
                                        <p className="text-sm sm:text-base my-3 text-zinc-400 font-mono text-center">
                                            No Members recorded for {activeDomain}
                                        </p>
                                    )}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            ) : (
                /* ─── CASE B: FOUNDERS & CONVENORS VIEW (ONLY ON CLICK) ─────── */
                <div className="flex flex-col justify-center items-center text-center py-2 sm:py-4 w-full max-w-7xl mx-auto">
                    <Roles name="Founders &amp; Convenors" small hideHash nameColor="text-white whitespace-nowrap drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]" />
                    <div className={memberListClass}>
                        {allFounders.map((mem) => (
                            <div key={mem.name} className={memberItemClass}>
                                <Member
                                    name={mem.name}
                                    image={mem.pictureUrl}
                                    position={mem.position}
                                    caption={mem.caption}
                                    domain={mem.domain}
                                    socials={mem.socials}
                                    servedSince={mem.servedSince}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Full Team Photo Lightbox Modal with Left/Right Navigation */}
            {isPhotoModalOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-2 sm:p-4 md:p-6"
                >
                    <div
                        className="relative w-fit max-w-[96vw] sm:max-w-[92vw] max-h-[92vh] bg-[#0b111a]/95 border-2 border-htb-green/60 rounded-2xl sm:rounded-3xl shadow-[0_0_40px_rgba(159,239,0,0.3)] overflow-hidden flex flex-col cursor-default animate-in fade-in zoom-in-95 duration-200"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Top Header Bar with only exact ImageKit file name and navigation controls */}
                        <div className="flex items-center justify-between px-3 sm:px-4 py-2 sm:py-2.5 bg-black/70 border-b border-htb-green/30 shrink-0">
                            <div className="flex items-center gap-2">
                                <span className="w-2.5 h-2.5 rounded-full bg-htb-green shadow-[0_0_8px_#9fef00] animate-pulse"></span>
                                <span className="font-mono text-xs sm:text-sm font-bold text-htb-green tracking-wider">
                                    {activeModalPhoto.name}
                                </span>
                            </div>

                            <div className="flex items-center gap-1.5 sm:gap-2">
                                {/* Header Navigation Arrows beside Close Button */}
                                <div className="flex items-center gap-1">
                                    <button
                                        type="button"
                                        onClick={prevPhotoHandler}
                                        onTouchEnd={prevPhotoHandler}
                                        title="Previous photo"
                                        className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-black/80 hover:bg-htb-green active:bg-htb-green text-zinc-300 hover:text-black active:text-black border border-htb-green/40 flex items-center justify-center transition-all cursor-pointer shadow-md active:scale-90 touch-manipulation"
                                    >
                                        <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                                            <polyline points="15 18 9 12 15 6" />
                                        </svg>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={nextPhotoHandler}
                                        onTouchEnd={nextPhotoHandler}
                                        title="Next photo"
                                        className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-black/80 hover:bg-htb-green active:bg-htb-green text-zinc-300 hover:text-black active:text-black border border-htb-green/40 flex items-center justify-center transition-all cursor-pointer shadow-md active:scale-90 touch-manipulation"
                                    >
                                        <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                                            <polyline points="9 18 15 12 9 6" />
                                        </svg>
                                    </button>
                                </div>

                                <button
                                    type="button"
                                    onClick={() => closePhotoModal()}
                                    onTouchEnd={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        closePhotoModal();
                                    }}
                                    className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-black/80 hover:bg-htb-green active:bg-htb-green text-zinc-300 hover:text-black active:text-black border border-htb-green/40 flex items-center justify-center transition-all cursor-pointer shadow-md active:scale-95 ml-1 touch-manipulation"
                                    title="Close"
                                >
                                    <svg className="w-4 h-4 sm:w-4.5 sm:h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round">
                                        <line x1="18" y1="6" x2="6" y2="18" />
                                        <line x1="6" y1="6" x2="18" y2="18" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {/* Image Display */}
                        <div className="p-1.5 sm:p-2.5 flex items-center justify-center bg-black/40 overflow-hidden select-none">
                            <img
                                key={activeModalPhoto.url}
                                src={activeModalPhoto.url}
                                alt={activeModalPhoto.name}
                                className="max-h-[75vh] sm:max-h-[82vh] max-w-[92vw] sm:max-w-[88vw] w-auto h-auto object-contain rounded-xl select-none block transition-opacity duration-300"
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* Community Info Glass Modal (Pop up in glass effect like earlier) */}
            {isInfoModalOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/65 backdrop-blur-sm transition-opacity duration-300 select-none animate-fadeIn"
                    onClick={() => setIsInfoModalOpen(false)}
                >
                    <div
                        className="relative max-w-3xl lg:max-w-4xl w-[94%] sm:w-[90%] md:w-[85%] py-8 px-5 sm:py-10 sm:px-8 md:py-12 md:px-12 rounded-2xl sm:rounded-3xl bg-black/40 backdrop-blur-lg border-2 border-htb-green/50 shadow-[0_12px_40px_0_rgba(0,0,0,0.75),0_0_40px_rgba(159,239,0,0.25),inset_0_1px_1px_0_rgba(255,255,255,0.2)] flex flex-col items-center justify-center animate-in fade-in zoom-in-95 duration-200 pointer-events-auto transition-all"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close button in top-right corner with smooth touch & click */}
                        <button
                            type="button"
                            onClick={() => setIsInfoModalOpen(false)}
                            onTouchEnd={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setIsInfoModalOpen(false);
                            }}
                            title="Close"
                            className="absolute top-3 right-3 sm:top-4 sm:right-4 md:top-5 md:right-5 w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-black/75 hover:bg-htb-green active:bg-htb-green text-zinc-200 hover:text-black active:text-black border border-htb-green/50 flex items-center justify-center transition-all cursor-pointer shadow-md active:scale-90 z-50 pointer-events-auto touch-manipulation"
                        >
                            <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round">
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        </button>

                        {/* Cyber Pill Header */}
                        <div className="inline-flex items-center gap-2 sm:gap-2.5 px-4 py-1.5 sm:px-5 sm:py-2 mb-4 sm:mb-6 rounded-full bg-black/60 border border-htb-green/45 shadow-[0_0_15px_rgba(159,239,0,0.25)] select-none">
                            <span className="w-2.5 h-2.5 rounded-full bg-htb-green shadow-[0_0_10px_#9fef00] animate-pulse"></span>
                            <span className="font-mono text-xs sm:text-sm md:text-base font-bold text-htb-green tracking-wider uppercase">
                                About HackTheBox SRMIST
                            </span>
                        </div>

                        {/* Monospace Glowing Description Text - Big, clear, and spacious */}
                        <p className="text-white font-mono text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed sm:leading-loose font-semibold text-center drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] drop-shadow-[0_0_10px_rgba(0,0,0,0.9)] max-w-2xl lg:max-w-3xl px-1 sm:px-4">
                            HackTheBox SRMIST is a whole new community centered on the field of cyber security. We want a centralized hub where all interested students can learn more about the field of cyber security. Learners can interact with each other, exchange ideas, and enhance their capabilities. We will host hands-on workshops, training sessions and CTF (Capture The Flag) events.
                        </p>
                    </div>
                </div>
            )}
        </section>
    );
};

// In-memory cache for ultra-fast response
let cachedMembers: MemberProps[] = [];
let lastFetchTime = 0;
const CACHE_TTL_MS = 30 * 1000; // 30 seconds

export async function getServerSideProps(
    context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<TeamPageProps>> {
    try {
        // Edge CDN and browser cache header
        context.res.setHeader(
            "Cache-Control",
            "public, s-maxage=30, stale-while-revalidate=60"
        );

        const now = Date.now();
        if (cachedMembers.length > 0 && now - lastFetchTime < CACHE_TTL_MS) {
            return { props: { members: cachedMembers } };
        }

        // Connect to MongoDB and read the teams collection from htb database
        const dbInstance = await DBInstance.getInstance();
        const coll = await dbInstance.getCollection("teams", "htbsrmist");

        const rawMembers = await coll.find({}).sort({ index: 1 }).toArray();

        // Map DB documents to MemberProps expected by the page
        const members: MemberProps[] = rawMembers.map((m: any) => {
            let memberJoined: number = Number(m.joined) || 0;
            let memberPosition: string = m.position || "";
            let memberStatus: { position: string; joined: number }[] = [];
            if (Array.isArray(m.status) && m.status.length > 0) {
                memberStatus = m.status.map((s: any) => ({
                    position: s.position,
                    joined: Number(s.joined)
                }));
                const latestStatus = memberStatus.reduce((prev, cur) => {
                    return cur.joined > prev.joined ? cur : prev;
                }, memberStatus[0]);
                memberJoined = latestStatus.joined;
                memberPosition = latestStatus.position;
            } else if (m.status && typeof m.status === "object") {
                memberJoined = Number(m.status.joined) || 0;
                memberPosition = m.status.position || "";
                memberStatus = [
                    { position: memberPosition, joined: memberJoined }
                ];
            }

            return {
                pictureUrl: m.pictureUrl,
                name: m.name,
                isCurrent: Boolean(m.isCurrent),
                joined: memberJoined,
                caption: m.caption || "",
                position: memberPosition,
                domain: m.domain || "",
                socials: {
                    linkedin: (m.socials && m.socials.linkedin) || "",
                    github: (m.socials && m.socials.github) || "",
                    twitter: (m.socials && m.socials.twitter) || "",
                    website: (m.socials && m.socials.website) || ""
                },
                status: memberStatus
            } as MemberProps;
        });

        cachedMembers = members;
        lastFetchTime = now;

        return { props: { members } };
    } catch (error) {
        if (cachedMembers.length > 0) {
            return { props: { members: cachedMembers } };
        }
        return { notFound: true };
    }
}

export default Team;
