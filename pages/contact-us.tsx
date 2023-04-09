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
        <div>
            <Head>
                <title>Contact Us | HTBSRMIST</title>
                <link rel="icon" href="/favicon.svg" />
            </Head>

            <ToastContainer />
            <section className="mx-6 md:w-9/12 lg:w-6/12 text-center md:mx-auto flex flex-col space-y-6 p-4 md:p-12 border-htb-green/50 border-2 border-solid rounded-3xl md:mb-12 backdrop-blur-3xl  ">
                <div className="flex justify-center items-center">
                    <img src="./contact us.svg" className="h-8 md:h-16"></img>
                </div>

                {/* <p className="text-htb-green/50 text-lg">
                    Hey, wanna have some chit chat with us. Feel free to reach
                    out. New ideas, event collaborations, feedbacks, want to
                    offer Bagel (so sweet of you) anything. We up for it. ;)
                    (wink wink).
                </p> */}
                <form
                    onSubmit={submitHandler}
                    className="flex-col gap-y-5 flex"
                >
                    <div className="flex justify-between">
                        <input
                            id="firstName"
                            name="name"
                            type="text"
                            autoComplete="name"
                            required
                            placeholder="First Name"
                            className="w-[48%] p-3 bg-[#1e2a3e] required:border-red-500 placeholder-htb-green/50 rounded-lg text-htb-green focus:outline-none"
                        />
                        <input
                            id="lastName"
                            name="name"
                            type="text"
                            autoComplete="name"
                            required
                            placeholder="Last Name"
                            className="w-[48%] p-4 bg-[#1e2a3e] required:border-red-500 placeholder-htb-green/50 rounded-lg text-htb-green focus:outline-none"
                        />
                    </div>
                    <div className="">
                        <input
                            id="email"
                            name="email"
                            type="text"
                            autoComplete="email"
                            placeholder="Email"
                            required
                            className="w-full p-4 bg-[#1e2a3e] required:border-red-500 placeholder-htb-green/50 rounded-lg text-htb-green focus:outline-none"
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
                            className="flex-shrink md:w-16 w-12 pl-2 bg-[#2b3a56] required:border-red-500 placeholder-htb-green/50 rounded-l-lg text-htb-green focus:outline-none"
                        />
                        <input
                            id="number"
                            name="number"
                            type="tel"
                            required
                            autoComplete="phone"
                            placeholder="Contact Number"
                            className="w-full p-4 bg-[#1e2a3e] required:border-red-500 placeholder-htb-green/50 rounded-r-lg text-htb-green focus:outline-none"
                        />
                    </div>

                    <div className="">
                        <textarea
                            id="message"
                            name="message"
                            autoComplete="message"
                            required
                            placeholder="Message"
                            className="w-full p-4 bg-[#1e2a3e] required:border-red-500 placeholder-htb-green/50 rounded-lg text-htb-green focus:outline-none"
                            rows={10}
                        ></textarea>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-htb-green/50 hover:bg-htb-green py-2 font-normal text-lg"
                    >
                        SEND MESSAGE
                    </button>
                </form>
            </section>
        </div>
    );
};

export default ContactUs;
