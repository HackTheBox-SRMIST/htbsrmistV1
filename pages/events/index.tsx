import type { NextPage, GetServerSidePropsResult } from "next";
import React,{useState} from "react";
import { Modal, Input } from "@nextui-org/react";
import Link from "next/link";
import Head from "next/head";
import Nav from "../../components/navbar";
import Footer from "../../components/footer";
import Register from "../api/v1/register";

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
    registration_url: string;
}

interface EventsPageProps {
    events: EventProps[];
}

const EventS: NextPage<EventsPageProps> = ({ events }) => {
    const [visible, setVisible] = React.useState(false);
    const handler = () => setVisible(true);

    const closeHandler = () => {
        setVisible(false);
    };
    return (
        <>
            <p className="px-12 flex justify-center">
                <img src="./allEvents.svg" className="h-20" />
            </p>

            <section>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 px-12 gap-8 my-8 justify-center">
                    {events.map((event) => (
                        <div
                            key={event.event_name}
                            className="pcontainer  hover:cursor-pointer rounded-xl transition-all  relative"
                        >
                            <figure className="fig h-691 w-864 flex flex-col md:p-0 items-center hover:blur-sm z-10">
                                <img
                                    src={event.poster_url}
                                    className="h-691 w-864 mx-auto  border-4 border-htb-green/50 object-cover"
                                    alt={`HackTheBox SRMIST - ${event.event_name}`}
                                />
                            </figure>
                            <div className="hidden hidebtn absolute z-20 top-[70%] left-[5%]  md:top-[80%] w-full md:left-[30%] ">
                                <a href={`/events/${event.event_name}`}>
                                    <button className="bg-htb-green border-2 border-hacker-grey hover:bg-white text-white hover:text-htb-green font-bold py-2 px-4 md:mr-6 rounded-full ml-[2%] md:ml-[0%]">
                                        Learn More
                                    </button>
                                </a>
                                
                                    <button
                                        className=" bg-htb-green border-2 hover:bg-white text-white hover:text-htb-green font-bold py-2 px-4 rounded-full ml-[10%] md:ml-[0%]"
                                        //disabled={!event.is_active}
                                        onClick = {handler}
                                        
                                    >
                                        Register
                                    </button>
                                    
                                    <Modal
                                            className="bg-htb-green"
                                            closeButton
                                            aria-labelledby="modal-title"
                                            open={visible}
                                            onClose={closeHandler}
                                            onChange={(event: any) =>
                                                setUsn(event.target.value)
                                            }
                                        >
                                            <Modal.Body className="bg-[#040626] h-full">
                                                <p className="text-white">
                                                    Please enter your details
                                                </p>
                                                <Input
                                                    type="text"
                                                    clearable
                                                    bordered
                                                    fullWidth
                                                    color="primary"
                                                    size="lg"
                                                    placeholder="Registration Number"
                                                />
                                                <Input
                                                    type="text"
                                                    clearable
                                                    bordered
                                                    fullWidth
                                                    color="primary"
                                                    size="lg"
                                                    placeholder="Name"
                                                />
                                                <Input
                                                    type="email"
                                                    clearable
                                                    bordered
                                                    fullWidth
                                                    color="primary"
                                                    size="lg"
                                                    placeholder="Email"
                                                />
                                                <select className = "h-12 bg-[#040626] text-white border-solid border-black">
                                                    <option value = "Non-srmite">Non SRMite</option>
                                                    <option value = "srmite">SRMite</option>
                                                </select>
                                                <Input
                                                    type="text"
                                                    clearable
                                                    bordered
                                                    fullWidth
                                                    color="primary"
                                                    size="lg"
                                                    placeholder="Department"
                                                />
                                               
                                                <button
                                                        
                                                        className="w-full bg-htb-green/70 hover:bg-htb-green py-2 font-normal rounded-full  p-8 text-xl"
                                                    >
                                                        Submit Details
                                                    </button>

                                                {/* {certificate ? (
                                                    <a
                                                        className="w-full bg-htb-green/50 hover:bg-htb-green py-2 font-normal rounded-full  p-8 text-xl text-center"
                                                        href={certificate}
                                                        download="Certificate.png"
                                                    >
                                                        Download
                                                    </a>
                                                ) : (
                                                    <button
                                                        onClick={
                                                            fetchCertificate
                                                        }
                                                        className="w-full bg-htb-green/50 hover:bg-htb-green py-2 font-normal rounded-full  p-8 text-xl"
                                                    >
                                                        Get your Certificate
                                                    </button>
                                                )} */}
                                            </Modal.Body>
                                        </Modal>
                                
                            </div>
                        </div>
                    ))}
                </div>
            </section>
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

export default EventS;
