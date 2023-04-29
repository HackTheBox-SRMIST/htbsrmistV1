import type { NextPage, GetServerSidePropsResult } from "next";
import Link from "next/link";
import Head from "next/head";
import Nav from "../../components/navbar";
import Footer from "../../components/footer";
import { Modal, Input, Radio } from "@nextui-org/react";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import axios from "axios";

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
const Toast = (success: any, message: any) => {
    toast[success ? "success" : "error"](message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark"
    });
};

const EventS: NextPage<EventsPageProps> = ({ events }) => {
    const submitHandler = async (events: React.ChangeEvent<any>) => {
        const str2bool = (value: string) => {
            if (value && typeof value === "string") {
                if (value.toLowerCase() === "true") return true;
                if (value.toLowerCase() === "false") return false;
            }
            return value;
        };

        const isSrmite = str2bool(events.target.isSrmite.value);
        events.preventDefault();

        try {
            const body = {
                usn: events.target.usn.value,
                name: events.target.name.value,
                email: events.target.email.value.toLowerCase(),
                dept: events.target.dept.value,
                isSrmite: isSrmite,
                event_name: events.target.event_name.value
            };
            // console.log(body);

            const response = await axios.post(
                `/api/v1/events/registration`,
                body
            );
            const result = await response.data.message;
            // console.log(result);

            Toast(true, result);
        } catch (err: any) {
            Toast(false, `${err.response.data.message}`);
        }
    };
    const [visible, setVisible] = React.useState(false);
    const [checked, setChecked] = React.useState("");

    const handler = (e: any) => {
        setVisible(true);
        console.log();
    };
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
                    {events.map((event) => {
                        return (
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
                                <div className="hidden hidebtn absolute z-20 top-[70%] left-[5%]  md:top-[80%] md:left-[30%] ">
                                    <a href={`/events/${event.event_name}`}>
                                        <button className="bg-htb-green border-2 border-hacker-grey hover:bg-white text-white hover:text-htb-green font-bold py-2 px-4 md:mr-6 rounded-full ml-[2%] md:ml-[0%]">
                                            Learn More
                                        </button>
                                    </a>
                                    <button
                                        className=" bg-htb-green border-2 hover:bg-white text-white hover:text-htb-green font-bold py-2 px-4 rounded-full ml-[10%] md:ml-[0%]"
                                        disabled={!event.is_active}
                                        onClick={handler}
                                    >
                                        Register
                                    </button>
                                    <Modal
                                        className="bg-htb-green"
                                        closeButton
                                        blur
                                        aria-labelledby="modal-title"
                                        open={visible}
                                        onClose={closeHandler}
                                    >
                                        <Modal.Body className="flex justify-center items-center font-mono">
                                            <ToastContainer />

                                            <p className="text-3xl font-bold max-md:text-2xl">
                                                Registration Form
                                            </p>
                                            <p>Please enter your Details</p>
                                            <form
                                                onSubmit={submitHandler}
                                                className=" gap-5 flex-col flex w-full"
                                            >
                                                <input
                                                    name="event_name"
                                                    value={event?.event_name}
                                                    className="hidden"
                                                />
                                                <Input
                                                    required
                                                    type="text"
                                                    name="usn"
                                                    clearable
                                                    bordered
                                                    fullWidth
                                                    color="primary"
                                                    size="lg"
                                                    placeholder="Registration Number"
                                                />
                                                <Input
                                                    required
                                                    type="text"
                                                    name="name"
                                                    clearable
                                                    bordered
                                                    fullWidth
                                                    color="primary"
                                                    size="lg"
                                                    placeholder="Name"
                                                />
                                                <Input
                                                    required
                                                    type="email"
                                                    name="email"
                                                    clearable
                                                    bordered
                                                    fullWidth
                                                    color="primary"
                                                    size="lg"
                                                    placeholder="Email"
                                                />

                                                <Input
                                                    required
                                                    type="text"
                                                    name="dept"
                                                    clearable
                                                    bordered
                                                    fullWidth
                                                    color="primary"
                                                    size="lg"
                                                    placeholder="Department"
                                                />
                                                <Radio.Group
                                                    isRequired
                                                    value={checked}
                                                    onChange={setChecked}
                                                    name="isSrmite"
                                                    orientation="horizontal"
                                                >
                                                    <div className="flex justify-around">
                                                        <Radio
                                                            value="true"
                                                            color="success"
                                                        >
                                                            SRMite
                                                        </Radio>
                                                        <Radio
                                                            value="false"
                                                            color="success"
                                                        >
                                                            Non-SRMite
                                                        </Radio>
                                                    </div>
                                                </Radio.Group>
                                                <button
                                                    type="submit"
                                                    className="w-full bg-htb-green/50 hover:bg-htb-green py-2 font-normal text-lg rounded-lg"
                                                >
                                                    SUBMIT
                                                </button>
                                            </form>
                                        </Modal.Body>
                                    </Modal>
                                </div>
                            </div>
                        );
                    })}
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
        const reversedEvents = events.reverse();
        return { props: { events: reversedEvents } };
    } catch (error) {
        console.log(error);
        return { notFound: true };
    }
}

export default EventS;
