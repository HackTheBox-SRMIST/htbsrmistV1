import Head from "next/head";
import Nav from "../components/navbar";
import Footer from "../components/footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const ContactUs = () => {
    const submitHandler = async (event: React.ChangeEvent<any>) => {
        event.preventDefault();
        const body = JSON.stringify({
            name: event.target.name.value,
            email: event.target.email.value,
            contactNo: event.target.number.value,
            question: event.target.message.value,
            countryCode: event.target.countryCode.value
        });
        try {
            const res = await fetch("http://localhost:3000/api/v1/contactus", {
                body: JSON.stringify({
                    name: event.target.name.value,
                    email: event.target.email.value,
                    contactNo: event.target.number.value,
                    question: event.target.message.value,
                    countryCode: event.target.countryCode.value
                }),
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
        console.log(body);
    };
    return (
        <div>
            <Head>
                <title>Contact Us | HTBSRMIST</title>
                <link rel="icon" href="/favicon.svg" />
            </Head>
            <Nav />
            <ToastContainer />
            <body className="md:w-5/12 lg:w-4/12 text-center mx-auto flex flex-col space-y-6 p-4 md:p-0 md:mb-12">
                <h1 className="md:text-7xl ml-1.5 text-5xl my-2 text-white font-bold">
                    Contact Us
                </h1>
                <p className="text-white text-lg">
                    Hey, wanna have some chit chat with us. Feel free to reach
                    out. New ideas, event collaborations, feedbacks, want to
                    offer Bagel (so sweet of you) anything. We up for it. ;)
                    (wink wink).
                </p>
                <form
                    onSubmit={submitHandler}
                    className="flex-col gap-y-8 flex"
                >
                    <div className="">
                        <input
                            id="name"
                            name="name"
                            type="text"
                            autoComplete="name"
                            required
                            placeholder="Name"
                            className="w-full p-4 bg-[#C4C4C4] required:border-red-500 "
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
                            className="w-full p-4 bg-[#C4C4C4] "
                        />
                    </div>
                    <div className="flex flex-row">
                        <input
                            id="countryCode"
                            name="countryCode"
                            autoComplete="countryCode"
                            placeholder="+91"
                            className="flex-shrink md:w-16 w-12 pl-2"
                        />
                        <input
                            id="number"
                            name="number"
                            type="text"
                            autoComplete="phone"
                            placeholder="Contact Number (Not Required)"
                            className="w-full p-4 bg-[#C4C4C4] "
                        />
                    </div>
                    <div className="">
                        <textarea
                            id="message"
                            name="message"
                            autoComplete="message"
                            required
                            placeholder="Message"
                            className="w-full p-4 bg-[#C4C4C4] message"
                            rows={10}
                        ></textarea>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-htb-green py-2 font-normal text-lg"
                    >
                        SEND MESSAGE
                    </button>
                </form>
            </body>
            <Footer />
        </div>
    );
};

export default ContactUs;
