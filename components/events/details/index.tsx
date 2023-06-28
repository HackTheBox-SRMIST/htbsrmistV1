import React from "react";
import { Input } from "@nextui-org/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { GiCrossMark } from "react-icons/gi";
import Select from "react-select";
import { useRouter } from "next/router";
import LocationLogo from "../../../utils/icons/LocationLogo";
import EntryFees from "../../../utils/icons/EntryFees";
import DateLogo from "../../../utils/icons/DateLogo";
import Modal from "./Modal";

const Details = ({ event }: any) => {
    const router = useRouter();
    const eventId = router.query.eventId as string;

    const [visibleReg, setVisibleReg] = React.useState(false);
    const [checked, setChecked] = React.useState("");
    const [visible, setVisible] = React.useState(false);
    const [email, setEmail] = React.useState("");
    const [certificate, setCertificate] = React.useState(null);
    const [type, setType] = React.useState("Please Select...");

    const options = [
        { value: "participants", label: "Participant" },
        { value: "volunteers", label: "Volunteer" },
        { value: "organizers", label: "Organizer" }
    ];

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

    const handler = () => {
        setVisible(!visible);
        if (typeof window != "undefined" && window.document) {
            document.body.style.overflow = "hidden";
        }
        window.scrollTo({
            top: 0
        });
    };

    const handlerReg = () => setVisibleReg(true);

    const closeHandlerReg = () => {
        setVisibleReg(false);
    };

    const closeHandler = () => {
        setVisible(false);
        setCertificate(null);
        setEmail("");
        setType("Please Select...");
        document.body.style.overflow = "unset";
    };

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

    const changeType = (e: any) => {
        setType(e.value);
    };

    return (
        <div className="flex-col px-4 lg:mx-20 mx-auto lg:px-10 items-center md:pr-0 font-mono">
            <div className="md:h-screen flex flex-col md:flex-row items-center justify-center md:gap-14 lg:gap-24">
                <div className="w-full md:w-1/2">
                    <div className="mb-4 text-center md:text-left">
                        <h1 className="text-white text-3xl underline underline-offset-8 decoration-double sm:no-underline justify-self-auto ml-6 lg:ml-0 md:mt-[350px] lg:mt-0 sm:text-5xl  font-semibold ">
                            {event?.event_name}
                        </h1>

                        <p className="text-white sm:text-xl mt-6 text-justify md:ml-10 lg:ml-0 md:text-left text-sm ">
                            {event?.event_description}. <br />
                            <br />
                        </p>
                    </div>
                    <div>
                        <div className="rounded-3xl sm:ml-0 sm:px-0 bg-node-black ">
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
                                                price.push(<p>Free of Cost</p>);
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
                                        visibleReg={visibleReg}
                                        closeHandlerReg={closeHandlerReg}
                                        submitHandler={submitHandler}
                                        checked={checked}
                                        setChecked={setChecked}
                                    />
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
                                                    Please enter your registered
                                                    E-Mail
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
                                                        setEmail(
                                                            event.target.value
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
                                                            className=" w-1/2  bg-htb-green hover:bg-htb-green/50 py-1 rounded-l-[20px] font-normal  p-8 text-xl max-md:text-sm"
                                                            disabled={
                                                                type ===
                                                                "Please Select..."
                                                                    ? true
                                                                    : false
                                                            }
                                                        >
                                                            Get your Certificate
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
    );
};

export default Details;
