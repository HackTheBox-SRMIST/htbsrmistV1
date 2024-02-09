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
    const handlerReg = () => setVisibleReg(true);
    const closeHandlerReg = () => {
        setVisibleReg(false);
    };
    const [visibleReg, setVisibleReg] = React.useState(false);

    const [usn, setUsn] = React.useState("");
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [phone, setPhone] = React.useState("");
    const [domain, setDomain] = useState("");
    const [linkedin, setLinkedin] = React.useState("");
    // const [htbProfile, setHtbProfile] = React.useState("");
    const [additionalLink, setAdditionalLink] = React.useState("");
    const [resume, setResume] = React.useState("");

    const submitHandler = async (events: React.ChangeEvent<any>) => {
        events.preventDefault();

        try {
            const body = {
                usn: usn,
                name: name,
                email: email.toLowerCase(),
                phone: phone,
                domain: domain,
                linkedin: linkedin,
                additionalLink: additionalLink,
                resume: resume
            };
            console.log(body);
            if (usn.length !== 15) {
                throw new Error(
                    "Registration Number should be 15 characters long."
                );
            }
            if (!email.endsWith("@srmist.edu.in")) {
                throw new Error("Email should end with @srmist.edu.in.");
            }
            if (!/^\d{10}$/.test(phone)) {
                throw new Error("Phone should be 10 digits.");
            }
            if (!/^https?:\/\/(www\.)?linkedin\.com\/.+/.test(linkedin)) {
                throw new Error("LinkedIn link is not valid.");
            }

            const response = await axios.post(`/api/v1/recruitment`, body);
            const result = await response.data.message;
            // console.log(result);

            if (response.status === 201) {
                Toast(false, result);
            } else {
                Toast(true, result);
            }
        } catch (err: any) {
            let errorMessage = "An error occurred.";

            if (err.message) {
                // Check if there's a specific error message from validation
                errorMessage = err.message;
            } else if (err.response) {
                // Check if there's a response with an error message
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
                                // disabled={!event?.is_active}
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
                                            name="name"
                                            clearable
                                            bordered
                                            fullWidth
                                            color="primary"
                                            size="lg"
                                            placeholder="Name"
                                            onChange={(e) =>
                                                setName(e.target.value)
                                            }
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
                                            onChange={(e) =>
                                                setUsn(e.target.value)
                                            }
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
                                            onChange={(e) =>
                                                setEmail(e.target.value)
                                            }
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
                                            onChange={(e) =>
                                                setPhone(e.target.value)
                                            }
                                        />
                                        <h3 className="text-lg">Domain</h3>
                                        <Radio.Group
                                            isRequired
                                            value={domain}
                                            onChange={(value) =>
                                                setDomain(value)
                                            }
                                            name="domain"
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
                                            placeholder="Additional Link (HackTheBox, Github, Behance, Figma)
"
                                            onChange={(e) =>
                                                setAdditionalLink(
                                                    e.target.value
                                                )
                                            }
                                        />
                                        <Input
                                            required
                                            type="text"
                                            name="resume"
                                            clearable
                                            bordered
                                            fullWidth
                                            color="primary"
                                            size="lg"
                                            placeholder="Resume Link"
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
