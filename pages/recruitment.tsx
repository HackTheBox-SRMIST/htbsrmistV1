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

    const [submitting, setSubmitting] = useState<boolean>(false);

    const [errors, setErrors] = useState<{
        usn: string;
        email: string;
        phone: string;
        domain: string;
    }>({
        usn: "",
        email: "",
        phone: "",
        domain: ""
    });

    const handlerReg = () => setVisibleReg(true);
    const closeHandlerReg = () => setVisibleReg(false);

    const validateField = (name: string, value: string): string => {
        switch (name) {
            case "usn":
                if (!value.trim()) {
                    return "Registration Number is required.";
                }
                if (value.length !== 15) {
                    return "Registration Number should be 15 characters long.";
                }
                if (!/^RA(25|26)/.test(value)) {
                    return "Registration Number should start with RA25 or RA26.";
                }
                break;
            case "email":
                if (!value.trim()) {
                    return "Email is required.";
                }
                if (!value.endsWith("@srmist.edu.in")) {
                    return "Please enter a valid SRM mail ID (@srmist.edu.in).";
                }
                break;
            case "phone":
                if (!value.trim()) {
                    return "Phone number is required.";
                }
                if (!/^\d{10}$/.test(value)) {
                    return "Phone number should be 10 digits.";
                }
                break;
            case "domain":
                if (domain1 && domain2 && domain1 === domain2) {
                    return "First and second domain preferences cannot be the same.";
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
        // Don't show toast on blur, only on submit
    };

    // Validate domain selection separately
    const validateDomains = (): string => {
        if (!domain1.trim()) {
            return "Please select your first domain preference.";
        }
        if (domain1 && domain2 && domain1 === domain2) {
            return "First and second domain preferences cannot be the same.";
        }
        return "";
    };

    const validateAllFields = (): boolean => {
        const usnError = validateField("usn", usn);
        const emailError = validateField("email", email);
        const phoneError = validateField("phone", phone);
        const domainError = validateDomains();
        
        // Check for required fields
        let nameError = "";
        let linkedinError = "";
        
        if (!name.trim()) {
            nameError = "Name is required.";
        }
        
        if (!linkedin.trim()) {
            linkedinError = "LinkedIn profile is required.";
        }

        const newErrors = {
            usn: usnError,
            email: emailError,
            phone: phoneError,
            domain: domainError
        };

        setErrors(newErrors);

        // Show specific error messages
        if (usnError) Toast(false, usnError);
        if (nameError) Toast(false, nameError);
        if (emailError) Toast(false, emailError);
        if (phoneError) Toast(false, phoneError);
        if (domainError) Toast(false, domainError);
        if (linkedinError) Toast(false, linkedinError);

        return !usnError && !nameError && !emailError && !phoneError && !domainError && !linkedinError;
    };

    const resetForm = () => {
        setUsn("");
        setName("");
        setEmail("");
        setPhone("");
        setDomain1("");
        setDomain2("");
        setLinkedin("");
        setAdditionalLink("");
        setResume("");
        setErrors({
            usn: "",
            email: "",
            phone: "",
            domain: ""
        });
    };

    const submitHandler = async (events: React.FormEvent<HTMLFormElement>) => {
        events.preventDefault();
        
        // Prevent multiple submissions
        if (submitting) return;
        
        setSubmitting(true);

        try {
            // Validate all fields before submission
            if (!validateAllFields()) {
                setSubmitting(false);
                return;
            }

            const body = {
                usn: usn.trim(),
                name: name.trim(),
                email: email.toLowerCase().trim(),
                phone: phone.trim(),
                domain1: domain1.trim(),
                domain2: domain2.trim(),
                linkedin: linkedin.trim(),
                additionalLink: additionalLink.trim(),
                resume: resume.trim()
            };

            const response = await axios.post(`/api/v1/recruitment`, body);
            const result = response.data.message;

            if (response.status === 200) {
                Toast(true, result);
                resetForm(); // Reset form on successful submission
                closeHandlerReg(); // Close modal on success
            } else {
                Toast(false, result);
            }
        } catch (err: any) {
            let errorMessage = "An error occurred while submitting the form.";

            if (err.response?.status === 201) {
                // Handle duplicate entry specifically
                errorMessage = err.response.data.message || "You have already registered for this recruitment.";
            } else if (err.response?.data?.message) {
                errorMessage = err.response.data.message;
            } else if (err.message) {
                errorMessage = err.message;
            }

            Toast(false, errorMessage);
        } finally {
            setSubmitting(false);
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
                                RECRUITMENT '26
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
                                            value={usn}
                                            clearable
                                            bordered
                                            fullWidth
                                            color="primary"
                                            size="lg"
                                            placeholder="Registration Number"
                                            onChange={(e) =>
                                                setUsn(e.target.value)
                                            }
                                            onBlur={handleBlur}
                                            status={
                                                errors.usn ? "error" : "default"
                                            }
                                        />
                                        <Input
                                            required
                                            type="text"
                                            name="name"
                                            value={name}
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
                                            type="email"
                                            name="email"
                                            value={email}
                                            clearable
                                            bordered
                                            fullWidth
                                            color="primary"
                                            size="lg"
                                            placeholder="Email"
                                            onChange={(e) =>
                                                setEmail(e.target.value)
                                            }
                                            onBlur={handleBlur}
                                            status={
                                                errors.email
                                                    ? "error"
                                                    : "default"
                                            }
                                        />
                                        <Input
                                            required
                                            type="tel"
                                            name="phone"
                                            value={phone}
                                            clearable
                                            bordered
                                            fullWidth
                                            color="primary"
                                            size="lg"
                                            placeholder="Phone Number"
                                            onChange={(e) =>
                                                setPhone(e.target.value)
                                            }
                                            onBlur={handleBlur}
                                            status={
                                                errors.phone
                                                    ? "error"
                                                    : "default"
                                            }
                                        />
                                        <h3 className="text-lg">
                                            First Domain Preference
                                        </h3>
                                        <Radio.Group
                                            isRequired
                                            value={domain1}
                                            onChange={(value) => {
                                                setDomain1(value);
                                                // Clear domain error when selection is made
                                                if (errors.domain) {
                                                    setErrors(prev => ({...prev, domain: ""}));
                                                }
                                            }}
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
                                            onChange={(value) => {
                                                setDomain2(value);
                                                // Clear domain error when selection changes
                                                if (errors.domain) {
                                                    setErrors(prev => ({...prev, domain: ""}));
                                                }
                                            }}
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
                                            value={linkedin}
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
                                        <Input
                                            type="text"
                                            name="additionalLink"
                                            value={additionalLink}
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
                                            type="text"
                                            name="resume"
                                            value={resume}
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
                                            className="bg-htb-green text-black  px-3 py-3 font-semibold rounded-md inline-block mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
                                            disabled={submitting}
                                        >
                                            {submitting
                                                ? "Submitting..."
                                                : "Submit"}
                                        </button>
                                    </form>
                                </Modal.Body>
                            </Modal>
                        </div>
                    </div>
                </div>
                <div className="">
                    <img
                        src="https://ik.imagekit.io/htbsrmist/Recruitments/Rec_25-26.png?updatedAt=1755971078244"
                        alt="Recruitments Poster"
                        className="h-[700px] max-md:h-[500px]"
                    />
                </div>
            </div>
        </>
    );
};

export default Recruitment;
