import React, { useState } from "react";
import { Modal, Input, Radio } from "@nextui-org/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

interface EventRegistrationModalProps {
    isOpen: boolean;
    onClose: () => void;
    eventName?: string;
}

const EventRegistrationModal: React.FC<EventRegistrationModalProps> = ({
    isOpen,
    onClose,
    eventName
}) => {
    const [nameError, setNameError] = useState(false);
    const [phoneError, setPhoneError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [checked, setChecked] = useState("");
    const [loadingSubmit, setLoadingSubmit] = useState(false);

    const Toast = (success: boolean, message: string) => {
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

    const submitHandler = async (events: React.ChangeEvent<any>) => {
        events.preventDefault();

        const str2bool = (value: string) => {
            if (value && typeof value === "string") {
                if (value.toLowerCase() === "true") return true;
                if (value.toLowerCase() === "false") return false;
            }
            return value;
        };

        const isSrmite = str2bool(events.target.isSrmite.value);

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

            setLoadingSubmit(true);
            const body = {
                usn: events.target.usn.value,
                phn: events.target.phn.value,
                name: events.target.name.value,
                email: events.target.email.value.toLowerCase(),
                dept: events.target.dept.value,
                isSrmite: isSrmite,
                event_name: eventName
            };

            const response = await axios.post(
                `/api/v1/events/registration`,
                body
            );
            const result = await response.data.message;
            Toast(true, result);
        } catch (err: any) {
            Toast(false, `${err.response?.data?.message || "Something went wrong"}`);
        } finally {
            setLoadingSubmit(false);
        }
    };

    return (
        <Modal
            className="bg-htb-green"
            closeButton
            blur
            open={isOpen}
            onClose={onClose}
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
                        status={nameError ? "error" : "default"}
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
                        status={phoneError ? "error" : "default"}
                        onChange={(e) => {
                            const value = e.target.value;
                            if (value.length > 11)
                                e.target.value = value.slice(0, 11);
                            setPhoneError(value.length !== 10);
                            if (value.length === 11)
                                Toast(
                                    false,
                                    "Phone Number cannot exceed 10 digits"
                                );
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
                        status={emailError ? "error" : "default"}
                        onChange={(e) => {
                            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                            setEmailError(!emailRegex.test(e.target.value));
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
                            <Radio value="true" color="success">
                                SRMite
                            </Radio>
                            <Radio value="false" color="success">
                                Non-SRMite
                            </Radio>
                        </div>
                    </Radio.Group>
                    <p className="text-center font-extra-bold">
                        Check us out on{" "}
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
                        {loadingSubmit ? "Submitting..." : "SUBMIT"}
                    </button>
                </form>
            </Modal.Body>
        </Modal>
    );
};

export default EventRegistrationModal;
