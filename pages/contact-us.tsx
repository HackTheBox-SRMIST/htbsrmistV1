import Head from "next/head";
import Nav from "../components/navbar";
import Footer from "../components/footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";

const ContactUs = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [messageText, setMessageText] = useState("");

    const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget;
        const target = form.elements as any;

        const firstName = target.firstName.value.trim();
        const lastName = target.lastName.value.trim();
        const email = target.email.value.trim();
        const number = target.number.value.trim();
        const message = target.message.value.trim();
        const countryCode = target.countryCode.value.trim() || "+91";

        if (message.length < 30) {
            toast.error("Message must be at least 30 characters long.", {
                position: "top-center",
                autoClose: 5000
            });
            return;
        }

        const sendBody = JSON.stringify({
            name: `${firstName} ${lastName}`.trim(),
            email: email,
            contactNo: number,
            question: message,
            countryCode: countryCode
        });

        setIsSubmitting(true);

        try {
            const res = await fetch(`/api/v1/contactus`, {
                body: sendBody,
                headers: {
                    "Content-Type": "application/json"
                },
                method: "POST"
            });
            const result = await res.json();

            if (result.success) {
                toast.success(result.message || "Message sent successfully!", {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true
                });
                form.reset();
                setMessageText("");
            } else {
                toast.error(result.message || "Failed to submit query.", {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true
                });
            }
        } catch (error) {
            console.error("Submission Error:", error);
            toast.error("Server connection error. Please try again later.", {
                position: "top-center",
                autoClose: 5000
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Head>
                <title>Contact Us | HTBSRMIST</title>
                <link rel="icon" href="/favicon.svg" />
            </Head>

            <div className="flex justify-center items-center my-4 md:my-6 lg:my-8">
                <img
                    src="./contact us.svg"
                    className="h-8 md:h-12 lg:h-16"
                    alt="Contact Us"
                />
            </div>

            <ToastContainer />

            <section className="mx-auto w-[90%] sm:w-[85%] md:w-9/12 lg:w-6/12 text-center flex flex-col space-y-4 md:space-y-6 p-4 sm:p-6 md:p-8 lg:p-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl md:rounded-3xl mb-8 md:mb-12 shadow-lg">
                <form
                    onSubmit={submitHandler}
                    className="flex flex-col gap-3 sm:gap-4 md:gap-5"
                >
                    <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-4">
                        <div className="w-full sm:w-1/2 relative">
                            <input
                                id="firstName"
                                name="firstName"
                                type="text"
                                autoComplete="given-name"
                                required
                                placeholder="First Name"
                                className="w-full p-3 bg-white/10 required:border-red-500 placeholder-htb-green/50 rounded-lg text-htb-green focus:outline-none focus:ring-1 focus:ring-htb-green/50"
                            />
                        </div>
                        <div className="w-full sm:w-1/2 relative">
                            <input
                                id="lastName"
                                name="lastName"
                                type="text"
                                autoComplete="family-name"
                                required
                                placeholder="Last Name"
                                className="w-full p-3 bg-white/10 required:border-red-500 placeholder-htb-green/50 rounded-lg text-htb-green focus:outline-none focus:ring-1 focus:ring-htb-green/50"
                            />
                        </div>
                    </div>

                    <div>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            placeholder="Email"
                            required
                            className="w-full p-3 bg-white/10  required:border-red-500 placeholder-htb-green/50 rounded-lg text-htb-green focus:outline-none focus:ring-1 focus:ring-htb-green/50"
                        />
                    </div>

                    <div className="flex flex-row">
                        <input
                            disabled
                            id="countryCode"
                            name="countryCode"
                            required
                            defaultValue="+91"
                            autoComplete="countryCode"
                            placeholder="+91"
                            className="flex-shrink-0 w-12 sm:w-14 md:w-16 pl-2 bg-white/10  required:border-red-500 placeholder-htb-green/50 rounded-l-lg text-htb-green focus:outline-none"
                        />
                        <input
                            id="number"
                            name="number"
                            type="tel"
                            required
                            autoComplete="phone"
                            placeholder="Contact Number"
                            className="w-full p-3 bg-white/10  required:border-red-500 placeholder-htb-green/50 rounded-r-lg text-htb-green focus:outline-none focus:ring-1 focus:ring-htb-green/50"
                        />
                    </div>

                    <div className="flex flex-col text-left">
                        <textarea
                            id="message"
                            name="message"
                            autoComplete="message"
                            required
                            minLength={30}
                            maxLength={1000}
                            value={messageText}
                            onChange={(e) => setMessageText(e.target.value)}
                            placeholder="Message (Minimum 30 characters)"
                            className="w-full p-4 bg-white/10 required:border-red-500 placeholder-htb-green/50 rounded-lg text-htb-green focus:outline-none focus:ring-htb-green/50"
                            rows={8}
                        ></textarea>
                        <div className="flex justify-between items-center text-xs text-htb-green/70 mt-1 px-1">
                            <span>
                                {messageText.length < 30
                                    ? `At least ${30 - messageText.length} more character(s) required`
                                    : "Minimum character limit met"}
                            </span>
                            <span>{messageText.length}/1000</span>
                        </div>
                    </div>

                    <div className="flex justify-center mt-2 md:mt-4">
                        <button
                            type="submit"
                            disabled={isSubmitting || messageText.trim().length < 30}
                            className="w-full sm:w-auto sm:min-w-[12rem] md:min-w-[16rem] px-4 py-2 md:py-3 bg-htb-green/50 hover:bg-htb-green disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300 font-medium text-base md:text-lg rounded-xl text-white"
                        >
                            {isSubmitting ? "SENDING..." : "SEND MESSAGE"}
                        </button>
                    </div>
                </form>
            </section>
        </div>
    );
};

export default ContactUs;

