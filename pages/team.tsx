import type { NextPage, GetServerSidePropsResult } from "next";
import axios, { isCancel, AxiosError } from "axios";
import Member from "../components/teams/member";
import Roles from "../components/teams/roles";
import LetterGlitch from "../components/Backgrounds/LetterGlitch/LetterGlitch";
import { useState } from "react";
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";
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
}

interface TeamPageProps {
    members: MemberProps[];
}

const domains: ("Development" | "Security" | "Corporate" | "Creatives")[] = [
    "Development",
    "Security",
    "Corporate",
    "Creatives"
];

const hierarchy = [{ role: "Admins", name: "Root" }];

const Team: NextPage<TeamPageProps> = ({ members }) => {
    const [activeDomain, changeDomain] = useState<
        "Development" | "Creatives" | "Corporate" | "Security"
    >("Development");

    // compute available years from the full status arrays
    const allYears: number[] = Array.from(
        new Set(
            members.flatMap((m) =>
                Array.isArray(m.status) ? m.status.map((s) => s.joined) : []
            )
        )
    ).sort((a, b) => b - a);

    const currentYear = new Date().getFullYear();
    const maxYear =
        allYears.length > 0 ? Math.min(allYears[0], currentYear) : currentYear;
    const yearsToShow = allYears;

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
        (el) => el.domain === "Cyber Security" && el.position !== "Root"
    );

    const crew = {
        Creatives,
        Development,
        Corporate,
        Security
    };

    var filterBinaries = function (element: any) {
        return element.position === "Binary";
    };

    var filterSudoers = function (element: any) {
        return element.position === "Sudoer" || element.position === "Leads";
    };

    var filterStickyBits = function (element: any) {
        return (
            element.position === "Associates" ||
            element.position === "Sticky Bit"
        );
    };

    const prevDomainChangeHandler = () => {
        const curr = domains.indexOf(activeDomain);
        const prev: "Development" | "Creatives" | "Corporate" | "Security" =
            domains[curr === 0 ? 3 : curr - 1];
        changeDomain(prev);
    };

    const nextDomainChangeHandler = () => {
        const curr = domains.indexOf(activeDomain);
        const next = domains[curr === 3 ? 0 : curr + 1];
        changeDomain(next);
    };

    // helper to set active year (used by the year buttons)
    const selectYear = (year: number) => {
        setActiveYear(year);
    };



    // Combine Faculty Convenor and Co-Organizers into "Founders"
    // check the full status array so founders remain constant across years
    const founders = members
        .filter((mem) => {
            return (
                mem.joined === 2022 &&
                (mem.position === "Mainframe" || mem.position === "Kernel")
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

    return (
        <section className="w-full min-h-fit bg-none flex flex-col justify-center items-center">
            <div className="group relative w-full max-w-5xl mx-auto overflow-hidden flex items-center justify-center text-center font-bold py-20 sm:py-32 md:py-40 text-3xl sm:text-5xl md:text-7xl text-htb-green bg-transparent rounded-3xl cursor-pointer border-2 border-solid border-htb-green/50 mb-8 md:mb-12 hover:border-htb-green transition-colors duration-300">
                <div
                    className="absolute inset-0 w-full h-full bg-cover bg-center opacity-0 group-hover:opacity-90 transition-opacity duration-500 z-10"
                    style={{
                        backgroundImage: "url('/team.JPG')"
                    }}
                ></div>
                <div className="relative opacity-100 group-hover:opacity-0 transform group-hover:scale-110 transition-all duration-500 z-30">
                    Our Team
                </div>
                <div className="absolute inset-0 w-full h-full z-20 opacity-80 group-hover:opacity-0 transition-opacity duration-500">
                    <LetterGlitch
                        glitchSpeed={50}
                        centerVignette={true}
                        outerVignette={false}
                        smooth={true}
                        glitchColors={[]}
                    />
                </div>
                <div className="absolute inset-0 flex items-center justify-center text-htb-green text-sm sm:text-lg md:text-2xl p-8 sm:p-12 md:p-16 opacity-0 group-hover:opacity-100 transition-all duration-500 z-30">
                    <div className="max-w-3xl p-4 sm:p-6 rounded-xl bg-black/30">
                        HackTheBox SRMIST is a whole new community centered on
                        the field of cyber security. We want a centralized hub
                        where all interested students can learn more about the
                        field of cyber security. Learners can interact with each
                        other, exchange ideas, and enhance their capabilities.
                        We will host hands-on workshops, training sessions and
                        CTF (Capture The Flag) events.
                    </div>
                </div>
            </div>

            {/* Founders Section (Always Visible Above Year Buttons) */}
            <div className="flex flex-col justify-center items-center text-center py-12">
                <Roles role="Founders" />
                <div className="flex justify-center items-start flex-wrap gap-5">
                    {founders.map((mem) => (
                        <Member
                            key={mem.name}
                            name={mem.name}
                            image={mem.pictureUrl}
                            position={mem.position}
                            caption={mem.caption}
                            domain={mem.domain}
                            socials={mem.socials}
                        />
                    ))}
                </div>
            </div>

            {/* Year selection buttons BELOW Founders */}
            <div className="flex justify-center items-center py-8 w-full">
                <div className="flex flex-wrap justify-center gap-2 w-full max-w-md mx-auto px-4">
                    {yearsToShow.map((yr) => (
                        <button
                            key={yr}
                            onClick={() => selectYear(yr)}
                            className={`flex-grow py-2 md:py-3 px-4 ${
                                activeYear === yr
                                    ? "bg-htb-green"
                                    : "bg-htb-green/50 hover:bg-htb-green"
                            } transition-colors duration-300 font-medium text-sm sm:text-base md:text-lg rounded-full`}
                        >
                            {yr}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex flex-col justify-center items-center text-center">
                {/* Admins and Other Roles (use year-specific positions) */}
                {hierarchy.map((el) => {
                    const domainMembers = yearMembers.filter(
                        (mem) =>
                            mem.position === el.name &&
                            mem.joined === activeYear
                    );
                    return (
                        <div key={el.role} className="py-10">
                            <Roles role={el.role} name={el.name} />
                            <div className="flex justify-center items-start flex-wrap gap-5">
                                {domainMembers.map((mem) => (
                                    <Member
                                        key={mem.name}
                                        name={mem.name}
                                        image={mem.pictureUrl}
                                        position={mem.position}
                                        caption={mem.caption}
                                        domain={mem.domain}
                                        socials={mem.socials}
                                    />
                                ))}
                            </div>
                        </div>
                    );
                })}
                <div className="flex justify-around items-start text-3xl text-htb-green gap-7 py-10 ">
                    <button
                        onClick={prevDomainChangeHandler}
                        className="text-htb-green bg-htb-green/50 p-2 rounded-full hover:bg-htb-green"
                    >
                        <GrLinkPrevious />
                    </button>
                    <span className="">{activeDomain}</span>
                    <button
                        onClick={nextDomainChangeHandler}
                        className="bg-htb-green/50 p-2 rounded-full hover:bg-htb-green"
                    >
                        <GrLinkNext />
                    </button>
                </div>

                <div className="flex flex-col justify-center items-center flex-wrap">
                    <Roles role="Leads" name="Sudoer" />
                    <div className="flex flex-wrap justify-center items-start">
                        {crew[activeDomain].filter(filterSudoers).length !==
                        0 ? (
                            crew[activeDomain]
                                .filter(filterSudoers)
                                .map((mem: MemberProps) => {
                                    return (
                                        <Member
                                            key={mem.name}
                                            name={mem.name}
                                            image={mem.pictureUrl}
                                            position={mem.position}
                                            caption={mem.caption}
                                            domain={mem.domain}
                                            socials={mem.socials}
                                        />
                                    );
                                })
                        ) : (
                            <>
                                <p className="text-2xl my-9 text-[#fff] flex justify-center items-center font-bold text-center">
                                    No Team Found
                                </p>
                            </>
                        )}
                    </div>
                    <Roles role="Associates" name="Sticky Bit" />
                    <div className="flex flex-wrap justify-center items-start">
                        {crew[activeDomain].filter(filterStickyBits).length !==
                        0 ? (
                            crew[activeDomain]
                                .filter(filterStickyBits)
                                .map((mem: MemberProps) => {
                                    return (
                                        <Member
                                            key={mem.name}
                                            name={mem.name}
                                            image={mem.pictureUrl}
                                            position={mem.position}
                                            caption={mem.caption}
                                            domain={mem.domain}
                                            socials={mem.socials}
                                        />
                                    );
                                })
                        ) : (
                            <>
                                <p className="text-2xl my-9 text-[#fff] flex justify-center items-center font-bold text-center">
                                    No Team Found
                                </p>
                            </>
                        )}
                    </div>
                    <Roles role="Members" name="Binary" />
                    <div className="flex flex-wrap justify-center items-start">
                        {crew[activeDomain].filter(filterBinaries).length !==
                        0 ? (
                            crew[activeDomain]
                                .filter(filterBinaries)
                                .map((mem: MemberProps) => {
                                    return (
                                        <Member
                                            key={mem.name}
                                            name={mem.name}
                                            image={mem.pictureUrl}
                                            position={mem.position}
                                            caption={mem.caption}
                                            domain={mem.domain}
                                            socials={mem.socials}
                                        />
                                    );
                                })
                        ) : (
                            <>
                                <p className="text-2xl my-9 text-[#fff] flex justify-center items-center font-bold text-center">
                                    No Team Found
                                </p>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

const url_root = process.env.BASE_URL_PREVIEW;

export async function getServerSideProps(): Promise<
    GetServerSidePropsResult<TeamPageProps>
> {
    try {
        // Connect to MongoDB and read the `teams` collection from `htb` database
        const dbInstance = await DBInstance.getInstance();
        const coll = await dbInstance.getCollection("teams", "htbsrmist");

        const rawMembers = await coll.find({}).toArray();

        // Map DB documents to MemberProps expected by the page
        const members: MemberProps[] = rawMembers.map((m: any) => {
            // pick the latest status entry (highest joined year)
            let memberJoined: number = Number(m.joined) || 0;
            let memberPosition: string = m.position || "";
            let memberStatus: { position: string; joined: number }[] = [];
            if (Array.isArray(m.status) && m.status.length > 0) {
                memberStatus = m.status.map((s: any) => ({
                    position: s.position,
                    joined: Number(s.joined)
                }));
                // Find the latest status entry to set top-level joined and position
                const latestStatus = memberStatus.reduce((prev, cur) => {
                    return cur.joined > prev.joined ? cur : prev;
                }, memberStatus[0]);
                memberJoined = latestStatus.joined;
                memberPosition = latestStatus.position;
            } else if (m.status && typeof m.status === "object") {
                // If status is a single object, use it for top-level joined/position and create a status array with it
                memberJoined = Number(m.status.joined) || 0;
                memberPosition = m.status.position || "";
                memberStatus = [
                    { position: memberPosition, joined: memberJoined }
                ];
            }
            // If m.status is not present or not an array/object, memberJoined and memberPosition
            // will already be set from m.joined and m.position at the beginning.
            // memberStatus will remain empty, which is fine for founders.

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

        // production: no debug logs

        return { props: { members } };
    } catch (error) {
        return { notFound: true };
    }
}

export default Team;

