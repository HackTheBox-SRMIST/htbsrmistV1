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
        <div className="bg-cover bg-center bg-no-repeat min-h-screen"
        style={{ backgroundImage: "url('/cntbg.png')" }}>
            <Head>
                <title>Contact Us | HTBSRMIST</title>
                <link rel="icon" href="/favicon.svg" />
            </Head>

            <ToastContainer />
            <div className="flex justify-center items-center">
                    <h1 className="text-htb-green font-poppins text-600 font-semibold text-6xl">Contact Us</h1>
                </div>
            <section className="mx-6 md:w-9/12 lg:w-6/12 text-center md:mx-auto flex flex-col space-y-6 p-4 md:p-12 bg-[#4A658E7D] md:mb-12 backdrop-blur-3xl rounded-4xl">
                {/* <p className="text-htb-green/50 text-lg">
                    Hey, wanna have some chit chat with us. Feel free to reach
                    out. New ideas, event collaborations, feedbacks, want to
                    offer Bagel (so sweet of you) anything. We up for it. ;)
                    (wink wink).
                </p> */}
                <form
                    onSubmit={submitHandler}
                    className="flex-col gap-y-5 flex font-poppins"
                >
                    <div className="flex justify-between">
                        <input
                            id="firstName"
                            name="name"
                            type="text"
                            autoComplete="name"
                            required
                            placeholder="First Name"
                            className="w-[48%] p-3 bg-[#141D2B] required:border-red-500 text-2xl placeholder-htb-green rounded-2xl text-htb-green focus:outline-none"
                        />
                        <input
                            id="lastName"
                            name="name"
                            type="text"
                            autoComplete="name"
                            required
                            placeholder="Last Name"
                            className="w-[48%] p-4 bg-[#141D2B] required:border-red-500 text-2xl placeholder-htb-green rounded-2xl text-htb-green focus:outline-none"
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
                            className="w-full p-4 bg-[#141D2B] required:border-red-500 text-xl placeholder-htb-green rounded-2xl text-htb-green focus:outline-none"
                        />
                    </div>
                    <div className="flex flex-row">
                        <input
                            id="number"
                            name="number"
                            type="tel"
                            required
                            autoComplete="phone"
                            placeholder="Contact Number"
                            className="w-full p-4 bg-[#141D2B] required:border-red-500 text-xl placeholder-htb-green rounded-2xl text-htb-green focus:outline-none"
                        />
                    </div>

                    <div className="">
                        <textarea
                            id="message"
                            name="message"
                            autoComplete="message"
                            required
                            placeholder="Message"
                            className="w-full p-4 bg-[#141D2B] required:border-red-500 text-xl rounded-2xl placeholder-htb-green text-htb-green focus:outline-none h-[200px]"
                            rows={10}
                        ></textarea>

                    <button
                        type="submit"
                        className="w-[492px] bg-htb-green rounded-3xl py-2 mt-4 text-3xl"
                    >
                        Send
                    </button>
                    </div>
                </form>
            </section>
        </div>
    );
};

export default ContactUs;
