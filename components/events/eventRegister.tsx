import { Modal, Input, Radio } from "@nextui-org/react";
import { useState } from "react";
import { useRouter } from "next/router";
import React from "react";
import type { NextPage, GetServerSidePropsResult } from "next";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { GiCrossMark } from "react-icons/gi";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Select from "react-select";
import EventModal from "./eventModal";

const url_root = process.env.BASE_URL_PREVIEW;
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

const EventRegister: NextPage<EventsPageProps> = ({ events }) => {
    const router = useRouter();
    const eventId = router.query.eventId as string;
    const event = events.find((event: any) => event.event_name === eventId);

    const handlerReg = () => setVisibleReg(true);
    const closeHandlerReg = () => {
        setVisibleReg(false);
    };
    const [visibleReg, setVisibleReg] = useState(false);
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
    const handler = () => {
        setVisible(!visible);
        if (typeof window != "undefined" && window.document) {
            document.body.style.overflow = "hidden";
        }
        window.scrollTo({
            top: 0
        });
    };
    const [visible, setVisible] = React.useState(false);
    const [email, setEmail] = useState("");
    const [certificate, setCertificate] = useState(null);
    const [type, setType] = useState("Please Select...");
    const closeHandler = () => {
        setVisible(false);
        setCertificate(null);
        setEmail("");
        setType("Please Select...");
        document.body.style.overflow = "unset";
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
    const fetchCertificate = async () => {
        try {
            const values = { email, type, event: eventId };
            const response = await axios.post(
                `https://api.htbsrmist.tech/api/certificate/get-certificate`,
                values
            );
            // console.log(response);
            setCertificate(response.data.certificate);
            Toast(true, "Certificate Generated Successfully");
        } catch (err: any) {
            // console.log(err);

            // console.log(err.response.data);
            Toast(false, `${err.response.data.message}`);
        }
    };

    const styles = {
        option: (provided: any, state: any) => ({
            ...provided,
            fontWeight: state.isSelected ? "bold" : "normal",
            color: "black",
            background: "#cccccc",
            fontSize: state.selectProps.myFontSize,

            "&:hover": {
                background: "#9FEF00"
            }
        }),
        control: (base: any, state: any) => ({
            ...base,
            background: "#9FEF00",
            fontWeight: state.isSelected ? "bold" : "normal",
            borderColor: state.isFocused ? "#9FEF00" : "#9FEF00",
            borderRadius: "0px 20px 20px 0px",
            height: "70px",
            width: "100%",
            boxShadow: state.isFocused ? null : null,
            "&:hover": {
                borderColor: state.isFocused ? "#000000" : "",
                borderWidth: state.isFocused ? "1.5px" : ""
            }
        })
    };
    const changeType = (e: any) => {
        setType(e.value);
    };
    const options = [
        { value: "participants", label: "Participant" },
        { value: "volunteers", label: "Volunteer" },
        { value: "organizers", label: "Organizer" }
    ];

    return (
        <div className="flex flex-col items-center justify-evenly md:flex-row ">
            <EventModal events={events} />

            <div>
                <button
                    onClick={handler}
                    disabled={event?.is_active}
                    className="bg-htb-green px-3 py-3 rounded-md font-semibold inline-block mt-6"
                >
                    Get your Certificate
                </button>

                {visible ? (
                    <div className="absolute top-0 left-0 w-screen h-screen text-white flex justify-center items-center backdrop-blur-xl">
                        <div className="w-[90%] lg:w-[500px] bg-white text-black z-50 p-7  rounded-3xl flex flex-col gap-5 relative ">
                            <ToastContainer />
                            <div
                                className="absolute top-5 right-5 w-7 hover:cursor-pointer hover:text-red-600"
                                onClick={closeHandler}
                            >
                                <GiCrossMark className="w-full h-full" />
                            </div>
                            <p className="text-xl max-md:text-base">
                                Please enter your registered E-Mail
                            </p>
                            <Input
                                type="email"
                                clearable
                                bordered
                                fullWidth
                                color="primary"
                                size="lg"
                                placeholder="Email"
                                onChange={(event: any) =>
                                    setEmail(event.target.value)
                                }
                            />

                            {certificate ? (
                                <a
                                    className="w-full bg-htb-green/50 hover:bg-htb-green py-2 font-normal rounded-full  p-8 text-xl text-center"
                                    href={certificate}
                                    download="Certificate.png"
                                >
                                    Download Now
                                </a>
                            ) : (
                                <div className="flex space-evenly justify-center">
                                    <button
                                        onClick={fetchCertificate}
                                        className=" w-1/2  bg-htb-green hover:bg-htb-green/50 py-1 rounded-l-[20px] font-normal  p-8 text-xl max-md:text-sm"
                                        disabled={
                                            type === "Please Select..."
                                                ? true
                                                : false
                                        }
                                    >
                                        Get your Certificate
                                    </button>
                                    <div className=" max-md:w-2/3 text-xl max-md:text-lg mt-0  border-l-[1px] border-l-black">
                                        <Select
                                            autoFocus
                                            hideSelectedOptions={true}
                                            isClearable={false}
                                            isSearchable={false}
                                            placeholder={type}
                                            theme={(theme) => ({
                                                ...theme,
                                                colors: {
                                                    ...theme.colors,
                                                    neutral50: "#000000" // Placeholder color
                                                }
                                            })}
                                            tabSelectsValue={false}
                                            name="preference1"
                                            className="text-black w-full rounded-full"
                                            options={options}
                                            onChange={changeType}
                                            styles={styles}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                ) : null}
            </div>
        </div>
    );
};

export default EventRegister;
