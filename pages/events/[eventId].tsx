import type { NextPage, GetServerSidePropsResult } from "next";
import React, { useState } from "react";
import { Modal, Input, Radio } from "@nextui-org/react";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useRouter } from "next/router";
import LocationLogo from "../../utils/icons/LocationLogo";
import EntryFees from "../../utils/icons/EntryFees";
import DateLogo from "../../utils/icons/DateLogo";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GiCrossMark } from "react-icons/gi";
import Image from "next/image";
// interface EventProps {
//     event_name: string;
//     event_description: string;
//     poster_url: string;
//     speakers_details: [
//         {
//             name: string;
//             designation: string;
//             details: string;
//             image: string;
//         }
//     ];
//     event_date: Date;
//     is_active: boolean;
//     venue: string;
//     sponsors_details: [
//         {
//             name: string;
//             place: string;
//             details: string;
//         }
//     ];
//     duration: Number;
//     prerequisites: string[];
//     cost: number;
//     gallery: [
//         "https://ik.imagekit.io/htbsrmist/Events/zero_day.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1674281897886"
//     ];
//     registration_url: string;
//     database: string;
//     slug: string;
// }


interface EventProps {
    event_name: string;
    event_description: string;
    poster_url: string;
    speakers_details: [
        {
            name: string;
            designation: string;
            details: string;
            image: string;
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
    prerequisites: string[];
    cost: number;
    gallery: [
        "https://ik.imagekit.io/htbsrmist/Events/zero_day.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1674281897886"
    ];
    registration_url: string;
    database: string;
    slug: string;

    // ADD THIS
    certificate: {
        [key: string]: string | undefined;
    };
}

interface EventsPageProps {
    events: EventProps[];
}

// No need
// const options = [
//     { value: "participants", label: "Participant" },
//     { value: "volunteers", label: "Volunteer" },
//     { value: "organizers", label: "Organizer" },
//     { value: "crypto", label: "Crypto" },
//     { value: "forensics", label: "Forensics" },
//     { value: "web-expl", label: "Web Exploitation" },
//     { value: "reverse-engineering", label: "Reverse Engineering" },
// ];

const styles = {
    // control: (base: any, state: any) => ({
    //     ...base,
    //     border: "1px solid black",
    //     boxShadow: "none",
    //     "&:hover": {
    //         border: "1px solid black"
    //     }
    // }),
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

const url_root =
  process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";

const Event: NextPage<EventsPageProps> = ({ events }) => {
    const router = useRouter();
    const eventId = router.query.eventId as string;
    const event = events.find((event) => event.event_name === eventId);
    // const event = events.find((event) => event.slug === eventId);
    const slug = event?.slug;
    const registrationUrl = event?.registration_url?.trim();
    const hasExternalRegistration = Boolean(registrationUrl);
    const isRegistrationActive = Boolean(event?.is_active);

    const [email, setEmail] = useState("");
    const [certificate, setCertificate] = useState(null);
    const [type, setType] = useState("Please Select...");
    const [visible, setVisible] = React.useState(false);
    const [loadingCertificate, setLoadingCertificate] = useState(false);
    const [nameError, setNameError] = React.useState(false);
    const [emailError, setEmailError] = React.useState(false);
    const [phoneError, setPhoneError] = React.useState(false);

    const [loadingSubmit, setLoadingSubmit] = useState(false);

    const handler = () => {
        setVisible(!visible);
        if (typeof window != "undefined" && window.document) {
            document.body.style.overflow = "hidden";
        }
        window.scrollTo({
            top: 0
        });
    };

    const options = event?.certificate
    ? Object.entries(event.certificate)
        .filter(([_, url]) => url && url.trim() !== "")
        .map(([key]) => ({
            value: key,
            label: key
                .split("-")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ")
        }))
    : [];

    // Old 

    // const fetchCertificate = async () => {
    //     try {
    //         const lowercaseEmail = email.toLowerCase();
    //         setLoadingCertificate(true);
    //         const values = { email: lowercaseEmail, type, event: slug };
    //         // console.log(values);
    //         const response = await axios.post(`/api/v1/certificates`, values);
    //         setCertificate(response.data.certificate);
    //         Toast(true, "Certificate Generated Successfully");
    //     } catch (err: any) {
    //         // Access the correct error response field
    //         Toast(false, `${err.response?.data?.error || "An error occurred"}`);
    //     } finally {
    //         setLoadingCertificate(false);
    //     }
    // };

    const fetchCertificate = async () => {
        if (!email) {
            Toast(false, "Please enter your registered email");
            return;
        }
        if (type === "Please Select...") {
            Toast(false, "Please select a certificate type");
            return;
        }
        try {
            const lowercaseEmail = email.toLowerCase();
            setLoadingCertificate(true);
            const values = { email: lowercaseEmail, type: type.toLowerCase(), event: slug };
            const response = await axios.post(`/api/v1/certificates`, values);
            setCertificate(response.data.certificate);
            Toast(true, "Certificate Generated Successfully");
        } catch (err: any) {
            Toast(false, `${err.response?.data?.error || "An error occurred"}`);
        } finally {
            setLoadingCertificate(false);
        }
    };

    const changeType = (e: any) => {
        setType(e.value);
    };

    const closeHandler = () => {
        setVisible(false);
        setCertificate(null);
        setEmail("");
        setType("Please Select...");
        document.body.style.overflow = "unset";
    };

    const settings = {
        className: "center",
        centerMode: true,
        infinite: true,
        centerPadding: "60px",
        slidesToShow: 3,
        speed: 500,
        responsive: [
            {
                breakpoint: 1024, // screens larger than 1024px
                settings: {
                    slidesToShow: 3,
                    centerPadding: "50px"
                }
            },
            {
                breakpoint: 768, // screens between 768px and 1024px
                settings: {
                    slidesToShow: 2,
                    centerPadding: "30px"
                }
            },
            {
                breakpoint: 480, // screens smaller than 768px
                settings: {
                    slidesToShow: 1,
                    centerPadding: "10px"
                }
            }
        ]
    };

    const handlerReg = () => setVisibleReg(true);
    const closeHandlerReg = () => {
        setVisibleReg(false);
    };
    const [visibleReg, setVisibleReg] = React.useState(false);
    const [checked, setChecked] = React.useState("");
    // const [usn, setUsn] = useState("");

    // const changeUsnHandler =async (e: any) => {
    //     if(usn.length === 15) {

    //     }
    //     setUsn(e.target.value);
    // };
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
            const name = events.target.name.value;
            if (name.length > 20) {
                Toast(false, "Name cannot exceed 20 characters");
                return;
            }
            const email = events.target.email.value;
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                Toast(false, "Invalid email");
                return;
            }
            const phone = events.target.phn.value;
            const phoneRegex = /^\d{10}$/;
            if (!phoneRegex.test(phone)) {
                Toast(false, "Invalid phone number");
                return;
            }
            const body = {
                usn: events.target.usn.value,
                phn: events.target.phn.value,
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
        } finally {
            setLoadingSubmit(false);
        }
    };

    return (
        <>
            <div className="suMain py-10">
                <div className="mx-auto w-[90%] max-w-7xl font-share-tech px-6">
                    <div className=" rounded-2xl flex flex-col md:flex-row">
                        <div className="md:w-1/2 w-full flex items-center justify-center p-4">
                            <div className="border-[2px] border-htb-green rounded-2xl p-2">
                                <img
                                    src={event?.poster_url}
                                    alt="Event Poster"
                                    className="max-w-full max-h-[450px] object-contain"
                                />
                            </div>
                        </div>
                        <div className="md:w-1/2 w-full md:mr-16 text-white flex flex-col items-center justify-center p-6 space-y-5">
                            <h1 className="text-htb-green font-bold text-4xl md:text-5xl text-center">
                                {event?.event_name}
                            </h1>
                            <div className="loc bg-[#141D2B] text-white flex flex-row items-center space-x-4 p-4 w-full md:w-96 rounded-xl">
                                <div className="lgo flex items-center justify-center">
                                    <img
                                        src="/locationLogo.svg"
                                        alt="Location Logo"
                                        className="h-6 w-6 md:h-8 md:w-8"
                                    />
                                </div>
                                <div className="txt w-full">
                                    <p className="text-xl md:text-2xl font-semibold break-words">
                                        {event?.venue}
                                    </p>
                                </div>
                            </div>

                            <div className="des bg-[#141D2B] text-white space-x-4 flex flex-row justify-start pl-5 pt-1 w-full md:w-96 h-[54px] rounded-xl">
                                <div className="lgo mt-1">
                                    <img
                                        src="/desLogo.svg"
                                        alt="Description Logo"
                                    />
                                </div>
                                <div className="txt">
                                    <p className="ml-4 text-white text-xl md:text-2xl mt-[6px] font-semibold">
                                        {event?.cost === 0
                                            ? "Free of Cost"
                                            : `${event?.cost}/-`}
                                    </p>
                                </div>
                            </div>
                            <div className="date bg-[#141D2B] text-white space-x-4 flex flex-row justify-start pl-5 pt-1 w-full md:w-96 h-[54px] rounded-xl">
                                <div className="lgo mt-1">
                                    <img src="/dateLogo.svg" alt="Date Logo" />
                                </div>
                                <div className="txt">
                                    <p className="ml-4 text-white text-xl md:text-2xl mt-[6px] font-semibold">
                                        {event?.event_date}
                                    </p>
                                </div>
                            </div>
                            {hasExternalRegistration ? (
                                <a
                                    href={registrationUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-disabled={!isRegistrationActive}
                                    className={`bg-htb-green w-full md:w-80 text-node-black font-bold text-center py-3 text-2xl rounded-2xl ${!isRegistrationActive
                                        ? "pointer-events-none opacity-60"
                                        : ""
                                        }`}
                                >
                                    Register Now
                                </a>
                            ) : (
                                <button
                                    className={`bg-htb-green w-full md:w-80 text-node-black font-bold text-center py-3 text-2xl rounded-2xl ${!isRegistrationActive
                                        ? "opacity-60"
                                        : ""
                                        }`}
                                    disabled={!isRegistrationActive}
                                    onClick={handlerReg}
                                >
                                    Register Now
                                </button>
                            )}
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
                                            name="name"
                                            clearable
                                            bordered
                                            fullWidth
                                            color="primary"
                                            size="lg"
                                            placeholder="Name"
                                            maxLength={21}
                                            // helperText="Name cannot exceed 20 characters"
                                            helperColor="error"
                                            status={
                                                nameError ? "error" : "default"
                                            }
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                if (value.length > 20) {
                                                    setNameError(true);
                                                    Toast(
                                                        false,
                                                        "Name cannot exceed 20 characters"
                                                    );
                                                } else {
                                                    setNameError(false);
                                                }
                                            }}
                                        />
                                        <Input
                                            required
                                            type="number"
                                            name="phn"
                                            clearable
                                            bordered
                                            fullWidth
                                            color="primary"
                                            size="lg"
                                            placeholder="Phone Number"
                                            helperColor="error"
                                            status={
                                                phoneError ? "error" : "default"
                                            }
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                if (value.length > 11) {
                                                    e.target.value =
                                                        value.slice(0, 11);
                                                }
                                                setPhoneError(
                                                    value.length !== 10
                                                );
                                                if (value.length === 11) {
                                                    Toast(
                                                        false,
                                                        "Phone Number cannot exceed 10 digits"
                                                    );
                                                }
                                            }}
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
                                        // onChange={
                                        //     changeUsnHandler
                                        // }
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
                                            helperColor="error"
                                            status={
                                                emailError ? "error" : "default"
                                            }
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                const emailRegex =
                                                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                                                if (!emailRegex.test(value)) {
                                                    setEmailError(true);
                                                } else {
                                                    setEmailError(false);
                                                }
                                            }}
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
                                            disabled={loadingSubmit}
                                        >
                                            {loadingSubmit
                                                ? "Submitting..."
                                                : "SUBMIT"}{" "}
                                        </button>
                                    </form>
                                </Modal.Body>
                            </Modal>

                            <button
                                className="bg-htb-green w-full md:w-80 text-node-black font-bold text-center py-3 text-2xl rounded-2xl"
                                onClick={handler}
                                disabled={event?.is_active}
                            >
                                Get Certificate
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
                                                    disabled={
                                                        loadingCertificate ||
                                                        type ===
                                                        "Please Select..."
                                                    }
                                                    className={`w-1/2 bg-htb-green hover:bg-htb-green/50 py-1 rounded-l-[20px] font-normal p-8 text-xl max-md:text-sm ${loadingCertificate
                                                        ? "opacity-50 cursor-not-allowed"
                                                        : ""
                                                        }`}
                                                >
                                                    {loadingCertificate
                                                        ? "Generating..."
                                                        : "Generate Certificate"}
                                                </button>
                                                <div className=" max-md:w-2/3 text-xl max-md:text-lg mt-0  border-l-[1px] border-l-black">
                                                    <Select
                                                        autoFocus
                                                        hideSelectedOptions={
                                                            true
                                                        }
                                                        isClearable={false}
                                                        isSearchable={false}
                                                        placeholder={type}
                                                        theme={(theme) => ({
                                                            ...theme,
                                                            colors: {
                                                                ...theme.colors,
                                                                neutral50:
                                                                    "#000000" // Placeholder color
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
                </div>
            </div>

            <div className="eventText text-white px-4 sm:px-8 md:px-16 lg:px-64 text-2xl sm:text-3xl md:text-4xl font-medium font-share-tech">
                {event?.event_description}
            </div>
            <div className="speaker mt-10 font-share-tech text-center">
                <p className="text-htb-green text-3xl md:text-6xl font-bold">
                    Know Our Guest
                </p>

                <div
                    className={`spkr mt-8 px-4 md:px-16 lg:px-32 grid gap-6 ${(event?.speakers_details?.length ?? 0) <= 2
                        ? "grid-cols-1 sm:grid-cols-2 justify-center"
                        : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                        }`}
                >
                    {event?.speakers_details?.map((guest, index) => (
                        <div
                            key={index}
                            className={`flex flex-col items-center bg-[#141D2B] hover:bg-[#1f2c42] rounded-xl border-2 border-htb-green p-6 shadow-lg w-full max-w-xs mx-auto ${!guest.image ? "justify-center h-full" : ""
                                }`}
                        >
                            {guest.image && (
                                <div className="w-full h-48 rounded-xl overflow-hidden flex items-center justify-center">
                                    <Image
                                        src={guest.image}
                                        alt={guest.name}
                                        width={250}
                                        height={250}
                                        className="object-cover rounded-xl"
                                    />
                                </div>
                            )}
                            <div className="speakerInfo text-center mt-4">
                                <p className="text-lg md:text-xl font-bold text-htb-green">
                                    {guest.name}
                                </p>
                                <p className="text-sm md:text-base text-white px-4">
                                    {guest.designation}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="prereq font-share-tech mb-10">
                <p className="text-htb-green text-3xl sm:text-4xl md:text-5xl font-bold text-center my-6">
                    Pre-Requisites
                </p>

                <div className="text-white px-4 sm:px-8 md:px-16 lg:px-64 text-xl sm:text-2xl md:text-3xl font-medium">
                    <ul className="list-disc list-inside">
                        {event?.prerequisites?.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                </div>
            </div>

            {/*

       
            <div className="flex-col px-4 lg:mx-20 mx-auto lg:px-10 items-center md:pr-0 font-mono">
                <div className="md:h-screen flex flex-col md:flex-row items-center justify-center md:gap-14 lg:gap-24">
                    <div className="w-full md:w-1/2">
                        <div className="mb-4 text-center md:text-left">
                            <h1 className="text-white text-3xl font-do-hyeon underline underline-offset-8 decoration-double sm:no-underline justify-self-auto ml-6 lg:ml-0 md:mt-[350px] lg:mt-0 sm:text-5xl  font-semibold ">
                                {event?.event_name} 
                            </h1>

                            <p className="text-white sm:text-xl mt-6 text-justify md:ml-10 lg:ml-0 md:text-left text-sm ">
                                {event?.event_description}. <br />
                                <br />
                            </p>
                        </div>
                        <div>
                            <div className="rounded-3xl sm:ml-0 sm:px-0 bg-[#181818] ">
                                <div className="grid grid-cols-3 divide-x bg-hacker-grey py-2 rounded-md space-x-1 md:space-x-3 divide-solid lg:mx-0">
                                    <div className="flex justify-evenly md:flex-row flex-col space-y-2 items-center">
                                        <span className="w-8">
                                            <LocationLogo />
                                        </span>
                                        <div className="text-center">
                                            <h4 className="text-black font-bold text-sm uppercase ">
                                                Location
                                            </h4>
                                            <p className="whitespace-normal">
                                                {event?.venue}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex justify-evenly md:flex-row flex-col pl-2 items-center">
                                        <span className="w-8">
                                            <EntryFees />
                                        </span>
                                        <div className="text-center">
                                            <h4 className="text-black font-bold text-sm uppercase">
                                                Price
                                            </h4>
                                            {(() => {
                                                let price = [];
                                                if (event?.cost == 0) {
                                                    price.push(
                                                        <p>Free of Cost</p>
                                                    );
                                                } else {
                                                    price.push(
                                                        <p>{event?.cost}/-</p>
                                                    );
                                                }
                                                return price;
                                            })()}
                                        </div>
                                    </div>
                                    <div className="flex justify-evenly md:flex-row flex-col pl-2 items-center">
                                        <span className="w-8">
                                            <DateLogo />
                                        </span>
                                        <div className="text-center">
                                            <h4 className="text-black font-bold text-sm uppercase">
                                                Date
                                            </h4>
                                            <p>{event?.event_date}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col items-center justify-evenly md:flex-row ">
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
                                                        name="name"
                                                        clearable
                                                        bordered
                                                        fullWidth
                                                        color="primary"
                                                        size="lg"
                                                        placeholder="Name"
                                                        maxLength={21}
                                                        // helperText="Name cannot exceed 20 characters"
                                                        helperColor="error"
                                                        status={nameError ? "error" : "default"}
                                                        onChange={(e) => {
                                                            const value = e.target.value;
                                                            if (value.length > 20) {
                                                                setNameError(true);
                                                                Toast(false, "Name cannot exceed 20 characters");
                                                            } else {
                                                                setNameError(false);
                                                            }
                                                        }}
                                                    />
                                                    <Input
                                                        required
                                                        type="text"
                                                        name="phn"
                                                        clearable
                                                        bordered
                                                        fullWidth
                                                        color="primary"
                                                        size="lg"
                                                        placeholder="Phone Number"
                                                        // onChange={
                                                        //     changeUsnHandler
                                                        // }
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
                                                        // onChange={
                                                        //     changeUsnHandler
                                                        // }
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
                                                        disabled={loadingSubmit}
                                                    >
                                                        {loadingSubmit
                                                            ? "Submitting..."
                                                            : "SUBMIT"}{" "}
                                                    </button>
                                                </form>
                                            </Modal.Body>
                                        </Modal>
                                    </div>
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
                                                        Please enter your
                                                        registered E-Mail
                                                    </p>
                                                    <Input
                                                        type="email"
                                                        clearable
                                                        bordered
                                                        fullWidth
                                                        color="primary"
                                                        size="lg"
                                                        placeholder="Email"
                                                        onChange={(
                                                            event: any
                                                        ) =>
                                                            setEmail(
                                                                event.target
                                                                    .value
                                                            )
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
                                                                onClick={
                                                                    fetchCertificate
                                                                }
                                                                disabled={
                                                                    loadingCertificate ||
                                                                    type ===
                                                                        "Please Select..."
                                                                }
                                                                className={`w-1/2 bg-htb-green hover:bg-htb-green/50 py-1 rounded-l-[20px] font-normal p-8 text-xl max-md:text-sm ${
                                                                    loadingCertificate
                                                                        ? "opacity-50 cursor-not-allowed"
                                                                        : ""
                                                                }`}
                                                            >
                                                                {loadingCertificate
                                                                    ? "Generating..."
                                                                    : "Generate Certificate"}
                                                            </button>
                                                            <div className=" max-md:w-2/3 text-xl max-md:text-lg mt-0  border-l-[1px] border-l-black">
                                                                <Select
                                                                    autoFocus
                                                                    hideSelectedOptions={
                                                                        true
                                                                    }
                                                                    isClearable={
                                                                        false
                                                                    }
                                                                    isSearchable={
                                                                        false
                                                                    }
                                                                    placeholder={
                                                                        type
                                                                    }
                                                                    theme={(
                                                                        theme
                                                                    ) => ({
                                                                        ...theme,
                                                                        colors: {
                                                                            ...theme.colors,
                                                                            neutral50:
                                                                                "#000000" // Placeholder color
                                                                        }
                                                                    })}
                                                                    tabSelectsValue={
                                                                        false
                                                                    }
                                                                    name="preference1"
                                                                    className="text-black w-full rounded-full"
                                                                    options={
                                                                        options
                                                                    }
                                                                    onChange={
                                                                        changeType
                                                                    }
                                                                    styles={
                                                                        styles
                                                                    }
                                                                />
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        ) : null}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                  
                    <div className="md:mb-14 sm:ml-0 sm:mb-0 lg:w-2/4 w-full mt-16 lg:mx-0 mx-auto pl-2 md:pl-8 flex justify-center">
                        
                        <figure className="mb-32 sm:mb-0 ">
                            <img
                                src={event?.poster_url}
                                alt="HackTheBox Meetup: Chennai, IN - Revealed Post"
                                
                            />
                        </figure>
                    </div>
                </div>
            </div>

            <div className=" md:mt-0 flex-col justify-center px-2 md:pl-10 sm:px-20 ">
                <div className="text-center mb-10">
                    <h1 className="text-white text-3xl ml-2 sm:ml-4 sm:text-5xl  font-bold">
                        Speakers
                    </h1>
                </div>
                <div className="p-5 ml-1 sm:ml-0 rounded-3xl w-full sm:w-auto bg-[#181818] border-4 border-htb-green/50 mb-10">
                    <p className="text-white mt-2 text-justify text-xl">
                        The Elite panel of guests who will inaugurate the event
                        are:-
                        <br />
                        <br />
                        {event?.speakers_details.map((speaker) => {
                            return (
                                <>
                                    <strong className="text-htb-green">
                                        {speaker.name}
                                    </strong>
                                    <strong>, {speaker.designation}</strong>
                                    <br />
                                    <br />{" "}
                                </>
                            );
                        })}
                        <br />
                    </p>
                </div>
            </div>

            <div className="mt-10 flex-col justify-center px-2 md:pl-10 sm:px-20">
                <div className="text-center mb-10">
                    <h1 className="text-white text-3xl pl-2 sm:pl-6 sm:text-5xl  font-bold">
                        Prerequisites
                    </h1>
                </div>
                <div className="p-5 rounded-3xl ml-1 sm:ml-0 w-full sm:w-auto bg-[#181818] border-4 border-htb-green/50 mb-10">
                    <p className="text-white mt-4  break-keep text-xl">
                        <h2 className="text-2xl font-bold">
                            Prerequisites for the Hands-on Workshop:-
                        </h2>
                        <br />
                        <ul className="list-disc list-inside">
                            {(() => {
                                let prereq_len: number = Number(
                                    event?.prerequisites.length
                                );
                                let prereq = [];
                                for (let i = 0; i < prereq_len; i++) {
                                    prereq.push(
                                        <li key={event?.prerequisites[i]}>
                                            {event?.prerequisites[i]}
                                        </li>
                                    );
                                }
                                return prereq;
                            })()}
                        </ul>
                    </p>
                </div>
            </div>

            <div className="Events_Gallery ml-[1.5rem] md:ml-[5rem] mt-4 sm:mt-0 flex-col">
                <p className="font-bold mr-8 sm:ml-32 mb-4 text-4xl uppercase text-teal-50 relative right-4 sm:right-14 ">
                    Gallery
                </p>
                <div className="mt-8 sm:mt-6 sm:pr-0 w-full">
                    <Slider {...settings}>
                        {event?.gallery?.map((image) => (
                            <div key={image}>
                                <div className="image">
                                    <img
                                        src={image}
                                        alt="Gallery"
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            objectFit: "contain",
                                            borderRadius: "10px",
                                            boxShadow:
                                                "0px 0px 10px rgba(0, 0, 0, 0.3)"
                                        }}
                                    />
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
            */}
        </>
    );
};

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

export default Event;
