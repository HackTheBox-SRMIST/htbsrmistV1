import { useState } from "react";
import { Modal, Input, Radio } from "@nextui-org/react";
import { useRouter } from "next/router";
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import type { NextPage, GetServerSidePropsResult } from "next";
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
    gallery: [
        "https://ik.imagekit.io/htbsrmist/Events/zero_day.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1674281897886"
    ];
    registration_url: string;
    database: string;
}
interface EventsPageProps {
    events: EventProps[];
}
const EventModal = ({ event }: any) => {
    const router = useRouter();
    const eventId = router.query.eventId as string;

    const [checked, setChecked] = useState("");

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
                event_name: event?.event_name
            };
            console.log(body);

            const response = await axios.post(
                `/api/v1/events/registration`,
                body
            );
            const result = await response.data.message;
            // console.log(result);

            // events.target.usn.value =
            Toast(true, result);
        } catch (err: any) {
            Toast(false, `${err.response.data.message}`);
        }
    };
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

    const handlerReg = () => setVisibleReg(true);
    const closeHandlerReg = () => {
        setVisibleReg(false);
    };
    const [visibleReg, setVisibleReg] = useState(false);

    return (
        <div>
            <button
                className="bg-htb-green  px-3 py-3 font-semibold rounded-md inline-block mt-6 "
                disabled={!event?.is_active}
                onClick={handlerReg}
            >
                REGISTER NOW
            </button>
            <Modal
                className="bg-htb-green"
                closeButton
                blur
                aria-labelledby="modal-title"
                open={visibleReg}
                onClose={closeHandlerReg}
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
                            // onChange={
                            //     changeUsnHandler
                            // }
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
                                <Radio value="true" color="success">
                                    SRMite
                                </Radio>
                                <Radio value="false" color="success">
                                    Non-SRMite
                                </Radio>
                            </div>
                        </Radio.Group>
                        <p className="text-center font-extra-bold">
                            Check us out on {""}
                            <a
                                href="https://www.meetup.com/chennai-in/"
                                className=" text-black text-xl hover:text-[#F74160] font-bold"
                            >
                                MEETUP
                            </a>
                        </p>
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
    );
};

export default EventModal;
