import type { NextPage, GetServerSidePropsResult } from "next";
// import axios, { isCancel, AxiosError } from "axios";
import Member from "../components/teams/member";
import Roles from "../components/teams/roles";
import { useState } from "react";
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";
import fs from "fs";
import path from "path";

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

const hierarchy = [
    { role: "Admins", name: "Root" },
];

const Team: NextPage<TeamPageProps> = ({ members }) => {
    const [activeDomain, changeDomain] = useState<
        "Development" | "Creatives" | "Corporate" | "Security"
    >("Development");

    const [activeFilter, setActiveFilter] = useState<"Current" | "2022" | "2021">("Current");

    const [sortedMembers, setSortedMembers] = useState<MemberProps[]>(members);

    const Creatives = sortedMembers.filter(
        (el) => el.domain === "Creatives" && el.position !== "Root"
    );
    
    const Development = sortedMembers.filter(
        (el) => el.domain === "Development" && el.position !== "Root"
    );
    
    const Corporate = sortedMembers.filter(
        (el) => el.domain === "Corporate" && el.position !== "Root"
    );
    
    const Security = sortedMembers.filter(
        (el) => el.domain === "Cyber Security" && el.position !== "Root"
    );
    
    const crew = {
        Creatives,
        Development,
        Corporate,
        Security,
    };
    

    var filterBinaries = function (element: any) {
        return element.position === "Binary"
    }

    var filterSudoers = function (element: any) {
        return element.position === "Sudoer" || element.position === "Leads"
    }

    var filterStickyBits = function (element: any) {
        return element.position === "Associates" || element.position === "Sticky Bit"
    }

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

    const sortMembersByYear = (year: number) => {
        const filteredAndSorted = members
            .filter((member) => member.joined === year)
            .sort((a, b) => a.name.localeCompare(b.name));
        setSortedMembers(filteredAndSorted);
    };

    const sortCurrentMembers = () => {
        const filteredAndSorted = members
            .filter((member) => member.isCurrent)
            .sort((a, b) => a.name.localeCompare(b.name));
        setSortedMembers(filteredAndSorted);
    };

    /*mongodb+srv://dev:BauDVfvjLpSM6Dad@cluster0.vemef.mongodb.net/?retryWrites=true&w=majority*/

    // Combine Faculty Convenor and Co-Organizers into "Founders"
    const founders = members.filter(
        (mem) => mem.position === "Mainframe" || mem.position === "Kernel"
    );

    return (
        <section className="w-full min-h-fit bg-none flex flex-col justify-center items-center">
            <div className="group relative w-full max-w-lg h-auto flex items-center justify-center text-center font-bold py-60 text-7xl text-htb-green bg-transparent rounded-3xl cursor-pointer border-2 border-solid border-htb-green/50">
                {/* Text displayed normally */}
                <div className="opacity-100 group-hover:opacity-0 transition-opacity duration-300">
                    Our Team
                </div>

                {/* Hover text displayed in place of "Our Team" */}
                <div className="absolute inset-0 flex items-center justify-center bg-transparent text-htb-green text-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    HackTheBox SRMIST is a whole new community centered on the field of cyber security. We want a centralized hub where all interested students can learn mor eabout the field of cyber security. Learners can interact with each other, exchange ideas, and enhance their capabilities. We will host hands-on workshops, training sessions and CTF (Capture The Flag) events. 
                </div>
            </div>

            {/* <img src="./team.svg" className="h-20" /> */}

            <div className="backdrop-blur-[3px] flex flex-col justify-center items-center text-center">

                {/* Founders Section */}
                <div className="py-12">
                    <Roles role="Founders" />
                    <div className="flex justify-center items-start flex-wrap gap-5">
                        {members
                            .filter((mem) => mem.position === "Mainframe" || mem.position === "Kernel")
                            .map((mem) => (
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



                {/* Admins and Other Roles */}
                {hierarchy.map((el) => {
                    const domainMembers = sortedMembers.filter((mem) => mem.position === el.name);
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
                {/* Filter Buttons */}
                <div className="flex justify-center items-center gap-5 py-5">
                    <button
                        onClick={sortCurrentMembers}
                        className={`px-4 py-2 rounded-lg ${
                            activeFilter === "Current" 
                              ? "bg-transparent text-htb-green" 
                              : "bg-black hover:text-htb-green"
                          }`}                    >
                        Current Team
                    </button>
                    <button
                        onClick={() => sortMembersByYear(2022)}
                        className={`px-4 py-2 rounded-lg ${activeFilter === "2022" ? "bg-htb-green text-black" : "bg-black text-htb-green"}`}
                    >
                        Team of 2022
                    </button>
                    <button
                        onClick={() => sortMembersByYear(2021)}
                        className={`px-4 py-2 rounded-lg ${activeFilter === "2021" ? "bg-htb-green text-black" : "bg-black text-htb-green"}`}
                    >
                        Team of 2021
                    </button>
                </div>

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
                        {
                            (crew[activeDomain].filter(filterSudoers).length !== 0) ?
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
                                :
                                <><p className="text-2xl my-9 text-[#fff] flex justify-center items-center font-bold text-center" >No Team Found</p></>
                        }
                    </div>
                    <Roles role="Associates" name="Sticky Bit" />
                    <div className="flex flex-wrap justify-center items-start">
                        {
                            (crew[activeDomain].filter(filterStickyBits).length !== 0) ?
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
                                :
                                <><p className="text-2xl my-9 text-[#fff] flex justify-center items-center font-bold text-center" >No Team Found</p></>
                        }
                    </div>
                    <Roles role="Members" name="Binary" />
                    <div className="flex flex-wrap justify-center items-start">
                        {
                            (crew[activeDomain].filter(filterBinaries).length !== 0) ?
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
                                :
                                <><p className="text-2xl my-9 text-[#fff] flex justify-center items-center font-bold text-center" >No Team Found</p></>
                        }
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
        const data = await axios.get(`${url_root}/api/v1/teams/?current=true`);
        const members: MemberProps[] = data.data.data;
        return { props: { members } };
    } catch (error) {
        console.log(error);
        return { notFound: true };
    }
}

export default Team;