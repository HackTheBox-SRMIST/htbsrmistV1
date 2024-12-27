import type { NextPage, GetServerSidePropsResult } from "next";
import Member from "../components/teams/member";
import Roles from "../components/teams/roles";
import { useState } from "react";
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";
import fs from "fs";
import path from "path";

interface MemberProps {
    pictureUrl: string | undefined;
    name: string;
    caption: string;
    position: string;
    domain: string;
    socials: {
        linkedin: string | "";
        github: string | "";
        twitter: string | "";
        website: string | "";
    };
}

interface TeamPageProps {
    members: MemberProps[];
}

const domains: ("Development" | "Security" | "Corporate" | "Creatives")[] = [
    "Development",
    "Security",
    "Corporate",
    "Creatives",
];

const hierarchy = [
    { role: "Admins", name: "Root" },
];

const Team: NextPage<TeamPageProps> = ({ members }) => {
    const [activeDomain, changeDomain] = useState<
        "Development" | "Creatives" | "Corporate" | "Security"
    >("Development");

    const Creatives = members.filter((el) => el.domain === "Creatives");
    const Development = members.filter((el) => el.domain === "Development");
    const Corporate = members.filter((el) => el.domain === "Corporate");
    const Security = members.filter((el) => el.domain === "Cyber Security");

    const crew = {
        Creatives,
        Development,
        Corporate,
        Security,
    };

    var filterRoots = function (element: any) {
        return element.position === "Root";
    };

    var filterSudoers = function (element: any) {
        return element.position === "Sudoer" || element.position === "Leads";
    };

    var filterStickyBits = function (element: any) {
        return element.position === "Associates" || element.position === "Sticky Bit";
    };

    var filterBinaries = function (element: any) {
        return element.position === "Binary";
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

    return (
        <section className="w-full min-h-fit bg-none flex flex-col justify-center items-center"
        style={{backgroundColor: '#0B121f'}}>
            {/* Our Team Section */}
            <div className="group relative w-full max-w-lg h-auto flex items-center justify-center text-center font-bold py-60 text-7xl text-htb-green bg-transparent rounded-3xl cursor-pointer border-2 border-solid border-htb-green/50">
                <div className="opacity-100 group-hover:opacity-0 transition-opacity duration-300">
                    Our Team
                </div>

                <div className="absolute inset-0 flex items-center justify-center bg-transparent text-htb-green text-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    HackTheBox SRMIST is a whole new community centered on the field of cyber security. We want a centralized hub where all interested students can learn more about the field of cyber security. Learners can interact with each other, exchange ideas, and enhance their capabilities. We will host hands-on workshops, training sessions and CTF (Capture The Flag) events.
                </div>
            </div>

            {/* Founders Section */}
            <div className="backdrop-blur-[3px] flex flex-col justify-center items-center text-center">
                <Roles role="Founders" />
                <div className="flex flex-wrap justify-center items-start">
                    {members.filter((el) => el.position === "Mainframe" || el.position === "Kernel").length !== 0 ? (
                        members
                            .filter((el) => el.position === "Mainframe" || el.position === "Kernel")
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
                        <p className="text-2xl my-9 text-[#fff] flex justify-center items-center font-bold text-center">
                            No Founders Found
                        </p>
                    )}
                </div>
            </div>

            {/* Filter By Arrow Section */}
            <div className="flex justify-around items-start text-3xl text-htb-green gap-7 py-10">
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

            {/* Roots Section */}
            <Roles role="Roots" name="Root" />
            <div className="flex flex-wrap justify-center items-start">
                {crew[activeDomain].filter(filterRoots).length !== 0 ? (
                    crew[activeDomain].filter(filterRoots).map((mem: MemberProps) => {
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
                    <p className="text-2xl my-9 text-[#fff] flex justify-center items-center font-bold text-center">
                        No Team Found
                    </p>
                )}
            </div>

            {/* Leads Section */}
            <Roles role="Leads" name="Sudoer" />
            <div className="flex flex-wrap justify-center items-start">
                {crew[activeDomain].filter(filterSudoers).length !== 0 ? (
                    crew[activeDomain].filter(filterSudoers).map((mem: MemberProps) => {
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
                    <p className="text-2xl my-9 text-[#fff] flex justify-center items-center font-bold text-center">
                        No Team Found
                    </p>
                )}
            </div>

            {/* Associates Section */}
            <Roles role="Associates" name="Sticky Bit" />
            <div className="flex flex-wrap justify-center items-start">
                {crew[activeDomain].filter(filterStickyBits).length !== 0 ? (
                    crew[activeDomain].filter(filterStickyBits).map((mem: MemberProps) => {
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
                    <p className="text-2xl my-9 text-[#fff] flex justify-center items-center font-bold text-center">
                        No Team Found
                    </p>
                )}
            </div>

            {/* Members Section */}
            <Roles role="Members" name="Binary" />
            <div className="flex flex-wrap justify-center items-start">
                {crew[activeDomain].filter(filterBinaries).length !== 0 ? (
                    crew[activeDomain].filter(filterBinaries).map((mem: MemberProps) => {
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
                    <p className="text-2xl my-9 text-[#fff] flex justify-center items-center font-bold text-center">
                        No Team Found
                    </p>
                )}
            </div>
        </section>
    );
};

export async function getServerSideProps(): Promise<GetServerSidePropsResult<TeamPageProps>> {
    try {
        const filePath = path.join(process.cwd(), "public", "data", "team.json");
        const jsonData = fs.readFileSync(filePath, "utf-8");
        const members: MemberProps[] = JSON.parse(jsonData);
        return { props: { members } };
    } catch (error) {
        console.error(error);
        return { notFound: true };
    }
}

export default Team;