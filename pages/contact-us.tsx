import Head from "next/head";
import Nav from "../components/navbar";
import Footer from "../components/footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PhoneInputWithCountrySelect from "react-phone-number-input";
import { useState } from "react";
const base_url = process.env.BASE_URL_PREVIEW;
const ContactUs = () => {
    const [value, setValue] = useState("+91");

    const submitHandler = async (event: React.ChangeEvent<any>) => {
        event.preventDefault();
        const sendBody = JSON.stringify({
            name:
                event.target.firstName.value +
                " " +
                event.target.lastName.value,
            email: event.target.email.value,
            contactNo: event.target.number.value,
            question: event.target.message.value,
            countryCode: event.target.countryCode.value
        });
        try {
            // console.log(base_url);
            // console.log(sendBody);

            const res = await fetch(`/api/v1/contactus`, {
                body: sendBody,
                headers: {
                    "Content-Type": "application/json"
                },
                method: "POST"
            });
            const result = await res.json();
            console.log(result.success);
            if (result.success) {
                toast.success(result.message, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined
                });
            } else {
                toast.error(result.message, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined
                });
            }
        } catch (error) {
            console.log("Server Error");
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

            <section className="mx-auto w-[90%] sm:w-[85%] md:w-9/12 lg:w-6/12 text-center flex flex-col space-y-4 md:space-y-6 p-4 sm:p-6 md:p-8 lg:p-12 bg-[#4A658E] bg-opacity-60 rounded-2xl md:rounded-3xl mb-8 md:mb-12">
                <form
                    onSubmit={submitHandler}
                    className="flex flex-col gap-3 sm:gap-4 md:gap-5"
                >
                    <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-4">
                        <input
                            id="firstName"
                            name="name"
                            type="text"
                            autoComplete="name"
                            required
                            placeholder="First Name"
                            className="w-full sm:w-[48%] p-3 bg-[#0B121F] bg-opacity-90 required:border-red-500 placeholder-htb-green/50 rounded-lg text-htb-green focus:outline-none focus:ring-1 focus:ring-htb-green/50"
                        />
                        <input
                            id="lastName"
                            name="name"
                            type="text"
                            autoComplete="name"
                            required
                            placeholder="Last Name"
                            className="w-full sm:w-[48%] p-3 bg-[#0B121F] bg-opacity-90 required:border-red-500 placeholder-htb-green/50 rounded-lg text-htb-green focus:outline-none focus:ring-1 focus:ring-htb-green/50"
                        />
                    </div>

                    <div>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            placeholder="Email"
                            required
                            className="w-full p-3 bg-[#0B121F] bg-opacity-90 required:border-red-500 placeholder-htb-green/50 rounded-lg text-htb-green focus:outline-none focus:ring-1 focus:ring-htb-green/50"
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
                            className="flex-shrink-0 w-12 sm:w-14 md:w-16 pl-2 bg-[#0B121F] bg-opacity-90 required:border-red-500 placeholder-htb-green/50 rounded-l-lg text-htb-green focus:outline-none"
                        />
                        <input
                            id="number"
                            name="number"
                            type="tel"
                            required
                            autoComplete="phone"
                            placeholder="Contact Number"
                            className="w-full p-3 bg-[#0B121F] bg-opacity-90 required:border-red-500 placeholder-htb-green/50 rounded-r-lg text-htb-green focus:outline-none focus:ring-1 focus:ring-htb-green/50"
                        />
                    </div>

                    <div className="">
                        <textarea
                            id="message"
                            name="message"
                            autoComplete="message"
                            required
                            placeholder="Message"
                            className="w-full p-4 bg-[#0B121F] bg-opacity-90 required:border-red-500 placeholder-htb-green/50 rounded-lg text-htb-green focus:outline-none focus:ring-htb-green/50"
                            rows={10}
                        ></textarea>
                    </div>

                    <div className="flex justify-center mt-2 md:mt-4">
                        <button
                            type="submit"
                            className="w-full sm:w-auto sm:min-w-[12rem] md:min-w-[16rem] px-4 py-2 md:py-3 bg-htb-green/50 hover:bg-htb-green transition-colors duration-300 font-medium text-base md:text-lg rounded-xl"
                        >
                            SEND MESSAGE
                        </button>
                    </div>
                </form>
            </section>
        </div>
    );
};

export default ContactUs;
