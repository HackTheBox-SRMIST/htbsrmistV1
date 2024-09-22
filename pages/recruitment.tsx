import type { NextPage } from "next";
import { Modal, Input, Radio } from "@nextui-org/react";

import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import React, { useState } from "react";
import "react-toastify/dist/ReactToastify.css";

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

const Recruitment: NextPage = () => {
    const [visibleReg, setVisibleReg] = useState<boolean>(false);
    const [usn, setUsn] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const [domain1, setDomain1] = useState<string>("");
    const [domain2, setDomain2] = useState<string>("");
    const [linkedin, setLinkedin] = useState<string>("");
    const [additionalLink, setAdditionalLink] = useState<string>("");
    const [resume, setResume] = useState<string>("");

    const [errors, setErrors] = useState<{ usn: string; email: string; phone: string }>({
        usn: "",
        email: "",
        phone: "",
    });

    const handlerReg = () => setVisibleReg(true);
    const closeHandlerReg = () => setVisibleReg(false);

    const validateField = (name: string, value: string): string => {
        switch (name) {
            case "usn":
                if (value.length !== 15) {
                    return "Registration Number should be 15 characters long.";
                }
                if (!/^RA(23|24)/.test(value)) {
                    return "Registration Number should start with RA23 or RA24.";
                }
                break;
            case "email":
                if (!value.endsWith("@srmist.edu.in")) {
                    return "Please enter a valid SRM mail ID (@srmist.edu.in).";
                }
                break;
            case "phone":
                if (!/^\d{10}$/.test(value)) {
                    return "Phone number should be 10 digits.";
                }
                break;
            default:
                return "";
        }
        return "";
    };

    const handleBlur = (e: React.FocusEvent<any>) => {
        const { name, value } = e.target;
        const error = validateField(name, value);
        setErrors((prev) => ({ ...prev, [name]: error }));
        if (error) {
            Toast(false, error);
        }
    };

    const submitHandler = async (events: React.FormEvent<HTMLFormElement>) => {
        events.preventDefault();

        try {
            const usnError = validateField("usn", usn);
            const emailError = validateField("email", email);
            const phoneError = validateField("phone", phone);

            if (usnError || emailError || phoneError) {
                setErrors({
                    usn: usnError,
                    email: emailError,
                    phone: phoneError,
                });
                throw new Error("Please correct the errors before submitting.");
            }

            const body = {
                usn,
                name,
                email: email.toLowerCase(),
                phone,
                domain1,
                domain2,
                linkedin,
                additionalLink,
                resume,
            };

            const response = await axios.post(`/api/v1/recruitment`, body);
            const result = response.data.message;

            if (response.status === 201) {
                Toast(true, result);
            } else {
                Toast(false, result);
            }
        } catch (err: any) {
            let errorMessage = "An error occurred.";

            if (err.message) {
                errorMessage = err.message;
            } else if (err.response) {
                errorMessage = err.response.data.message || errorMessage;
            }

            Toast(false, errorMessage);
        }
    };

    return (
        <>
            <div className="flex md:flex-row  flex-col-reverse gap-5 md:justify-around w-4/5 mx-auto mt-8 md:w-full">
                <div className=" text-white font-poppins gap-8 mb-16">
                    <h1 className="text-4xl max-md:text-center lg:text-7xl font-bold text-htb-green">
                        We're hiring!
                    </h1>
                    <div className="mt-8 max-w-lg text-2xl">
                        <div>
                            <p className="text-htb-green max-md:text-center text2xl md:text-4xl font-black">
                                RECRUITMENT '24
                            </p>
                            <p className="">
                                <br />
                                The same old routine on loop and a constant
                                desire to start new chapters in your life?
                                <br />
                                <br /> Don't know where or how to begin?
                                <br />
                                <br />
                                Join HackTheBox SRMIST today for a chance to
                                experience and discover something new.
                                <br />
                                <br /> Come join our passionate team driven by
                                black coffee and lack of sleep.
                                <br />
                                <br /> Register by clicking the Apply Now
                                button.
                            </p>
                            <br />
                        </div>
                        <div>
                            <button
                                
                                className="bg-htb-green text-black  px-3 py-3 font-semibold rounded-md inline-block mt-6 "
                                //disabled={!event?.is_active}
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
                                <Modal.Body className="flex justify-center items-center font-poppins">
                                    <ToastContainer />

                                    <p className="text-3xl font-bold max-md:text-2xl">
                                        Recruitment Form
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
                                            onChange={(e) => setUsn(e.target.value)}
                                            onBlur={handleBlur}
                                            status={errors.usn ? "error" : "default"}
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
                                            onChange={(e) => setName(e.target.value)}
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
                                            onChange={(e) => setEmail(e.target.value)}
                                            onBlur={handleBlur}
                                            status={errors.email ? "error" : "default"}
                                        />
                                        <Input
                                            required
                                            type="tel"
                                            name="phone"
                                            clearable
                                            bordered
                                            fullWidth
                                            color="primary"
                                            size="lg"
                                            placeholder="Phone Number"
                                            onChange={(e) => setPhone(e.target.value)}
                                            onBlur={handleBlur}
                                            status={errors.phone ? "error" : "default"}
                                        />
                                        <h3 className="text-lg">
                                            First Domain Preference
                                        </h3>
                                        <Radio.Group
                                            isRequired
                                            value={domain1}
                                            onChange={(value) =>
                                                setDomain1(value)
                                            }
                                            name="domain1"
                                            orientation="horizontal"
                                        >
                                            <div className="flex-col justify-between gap-3">
                                                <div className="flex ">
                                                    <Radio
                                                        value="Cyber Security"
                                                        color="success"
                                                    >
                                                        Cyber Security
                                                    </Radio>
                                                    <Radio
                                                        value="Creatives"
                                                        color="success"
                                                    >
                                                        Creatives
                                                    </Radio>
                                                </div>
                                                <div className="flex justify-between">
                                                    <Radio
                                                        value="Development"
                                                        color="success"
                                                    >
                                                        Development
                                                    </Radio>

                                                    <Radio
                                                        value="Corporate"
                                                        color="success"
                                                    >
                                                        Corporate
                                                    </Radio>
                                                </div>
                                            </div>
                                        </Radio.Group>
                                        <h3 className="text-lg">
                                            Second Domain Preference (Optional)
                                        </h3>

                                        <Radio.Group
                                            value={domain2}
                                            onChange={(value) =>
                                                setDomain2(value)
                                            }
                                            name="domain2"
                                            orientation="horizontal"
                                        >
                                            <div className="flex-col justify-between gap-3">
                                                <div className="flex ">
                                                    <Radio
                                                        value="Cyber Security"
                                                        color="success"
                                                    >
                                                        Cyber Security
                                                    </Radio>
                                                    <Radio
                                                        value="Creatives"
                                                        color="success"
                                                    >
                                                        Creatives
                                                    </Radio>
                                                </div>
                                                <div className="flex justify-between">
                                                    <Radio
                                                        value="Development"
                                                        color="success"
                                                    >
                                                        Development
                                                    </Radio>

                                                    <Radio
                                                        value="Corporate"
                                                        color="success"
                                                    >
                                                        Corporate
                                                    </Radio>
                                                </div>
                                            </div>
                                        </Radio.Group>
                                        <Input
                                            required
                                            type="text"
                                            name="linkedin"
                                            clearable
                                            bordered
                                            fullWidth
                                            color="primary"
                                            size="lg"
                                            placeholder="LinkedIn Profile"
                                            onChange={(e) =>
                                                setLinkedin(e.target.value)
                                            }
                                        />
                                        {/* <Input
                                            required
                                            type="text"
                                            name="htbProfile"
                                            clearable
                                            bordered
                                            fullWidth
                                            color="primary"
                                            size="lg"
                                            placeholder="HackTheBox Profile"
                                            onChange={(e) =>
                                                setHtbProfile(e.target.value)
                                            }
                                        /> */}
                                        <Input
                                            // required
                                            type="text"
                                            name="additionalLink"
                                            clearable
                                            bordered
                                            fullWidth
                                            color="primary"
                                            size="lg"
                                            placeholder="Additional Link (HackTheBox, Github, Behance, Figma)"
                                            onChange={(e) =>
                                                setAdditionalLink(
                                                    e.target.value
                                                )
                                            }
                                        />
                                        <Input
                                            // required
                                            type="text"
                                            name="resume"
                                            clearable
                                            bordered
                                            fullWidth
                                            color="primary"
                                            size="lg"
                                            placeholder="Resume Link (optional)"
                                            onChange={(e) =>
                                                setResume(e.target.value)
                                            }
                                        />
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
                    </div>
                </div>
                <div className="">
                    <img
                        src="https://ik.imagekit.io/htbsrmist/Recruitments/recruitment24.png?updatedAt=1707406123071"
                        alt="Recruitments Poster"
                        className="h-auto w-[500px]"
                    />
                </div>
            </div>
            {/* <div className="flex justify-start w-4/5 mx-auto text-white font-Montserrat mb-16">
                <div className="text-center lg:text-left">
                    <p className="mt-8 max-w-lg text-2xl">
                        <br />
                        <p className="text-htb-green text-3xl md:text-4xl font-black">
                            RECRUITMENT '22
                        </p>
                        <p className="text-htb-green font-bold my-3">
                            Registrations are closed.
                        </p>
                        We will contact the applicants via emails. And will post
                        updates on our Instagram page.
                        <br />
                        Stay safe. Cyber safe ; ).
                    </p>
                    <div className="mt-12 ">
                        <button
                            data-tf-popup="amsbrfEr"
                            data-tf-iframe-props="title=RECRUITMENT"
                            data-tf-medium="snippet"
                            className="recruitmentBtn btninactive"
                            disabled={true}
                        >
                            Registrations Closed
                        </button>
                        <Script src="//embed.typeform.com/next/embed.js" />
                    </div>
                </div>
            </div> */}
        </>
    );
};

export default Recruitment;