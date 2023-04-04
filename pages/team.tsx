import type { NextPage, GetServerSidePropsResult } from "next";
import axios, { isCancel, AxiosError } from "axios";
import Member from "../components/teams/member";
import Roles from "../components/teams/roles";
import { useState } from "react";
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";

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

const domains: ("Development" | "Creatives" | "Corporate" | "Security")[] = [
    "Development",
    "Creatives",
    "Security",
    "Corporate"
];

const hierarchy = [
    { role: "Faculty Convenor", name: "Mainframe" },
    { role: "Co-Organizers", name: "Kernel" },
    { role: "Admins", name: "Root" },
];

const Team: NextPage<TeamPageProps> = ({ members }) => {
    const [activeDomain, changeDomain] = useState<
        "Development" | "Creatives" | "Corporate" | "Security"
    >("Development");

    const Creatives = members.filter(
        (el) => el.domain === "Creatives"
    );

    const Development = members.filter(
        (el) => el.domain === "Development"
    );

    const Corporate = members.filter(
        (el) => el.domain === "Corporate"
    );

    const Security = members.filter(
        (el) => el.domain === "Cyber Security"
    );

    const crew = {
        Creatives,
        Development,
        Corporate,
        Security
    };

    var filterBinaries = function (element: any){
        return element.position === "Binary"
    }

    var filterSudoers = function (element: any){
        return element.position === "Sudoer" || element.position === "Leads"
    }

    var filterStickyBits = function (element: any){
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

    /*mongodb+srv://dev:BauDVfvjLpSM6Dad@cluster0.vemef.mongodb.net/?retryWrites=true&w=majority*/

    return (
        <section className="w-full min-h-fit bg-none flex flex-col justify-center items-center">
            <img src="./team.svg" className="h-20" />

            <div className="backdrop-blur-[3px] flex flex-col justify-center items-center text-center">
                {hierarchy.map((el) => {
                    const domainMembers = members.filter(
                        (mem) => mem.position === el.name
                    );
                    return (
                        <div key={el.role} className="py-12 w-[65%]">
                            <Roles
                                role={el.role}
                                name={el.name}
                                key={el.role}
                            />
                            <div className="flex justify-center items-center flex-wrap gap-5">
                                {domainMembers.map((mem) => {
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
                                })}
                            </div>
                        </div>
                    );
                })}


                <div className="flex justify-around items-center text-3xl text-htb-green gap-7 py-10 ">
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
                    <Roles role="Leads" name="Sudoer"  />
                    <div className="flex flex-wrap justify-center items-center">
                    {
                        (crew[activeDomain].filter(filterSudoers).length !== 0)?
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
                    <div className="flex flex-wrap justify-center items-center">
                    {
                        (crew[activeDomain].filter(filterStickyBits).length !== 0)?
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
                    <div className="flex flex-wrap justify-center items-center">
                    {
                        (crew[activeDomain].filter(filterBinaries).length !== 0)?
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
