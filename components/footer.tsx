import Logo from "../utils/icons/htblogo";
import Link from "next/link";
import { useRouter } from "next/router";

const Footer = () => {
    return (
        <footer className="text-center lg:text-left bg-hacker-grey mx-2 mb-6 lg:mt-6 rounded-md opacity-70 relative bottom-0 ">
            <div className="py-2 text-center md:text-left">
                <div className="grid grid-1 md:grid-cols-2 lg:grid-cols-8 gap-8">
                    <div className="mx-auto mt-2 col-start-1 hidden lg:block">
                        <Logo/>
                    </div>
                    <div className="lg:col-span-3">
                        <h6 className="uppercase font-semibold mt-6 lg:mt-12 flex items-center justify-center md:justify-center text-center mx-3 lg:mx-0 ">
                            Transforming the cyberspace in SRMIST and beyond.
                        </h6>
                    </div>
                    <div className="lg:col-span-2">
                        <h6 className="uppercase font-semibold mb-4 lg:mt-4 justify-center ">
                            Explore
                        </h6>
                        <div className="flex flex-row lg:flex-row gap-3 lg:gap-6 mx-16 ml-20 lg:mx-0">

                        <p className="mb-2">
                            <a href="#!" className="text-gray-600">Home</a>
                        </p>
                        <p className="mb-2">
                            <a href="#!" className="text-gray-600">Team</a>
                        </p>
                        <p className="mb-2">
                            <a href="#!" className="text-gray-600">Event</a>
                        </p>
                        <p>
                            <a href="#!" className="text-gray-600">Contact Us</a>
                        </p>
                        </div>
                    </div>
                    
                    <div className="lg:col-span-2">
                        <h6 className="uppercase font-semibold mb-4 flex justify-center md:justify-start lg:mx-4 lg:mt-4">
                            Contact
                        </h6>
                        <p className="flex items-center justify-center md:justify-start mb-1">
                            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="home"
                                className="w-4 mr-4" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                                <path fill="currentColor"
                                    d="M280.37 148.26L96 300.11V464a16 16 0 0 0 16 16l112.06-.29a16 16 0 0 0 15.92-16V368a16 16 0 0 1 16-16h64a16 16 0 0 1 16 16v95.64a16 16 0 0 0 16 16.05L464 480a16 16 0 0 0 16-16V300L295.67 148.26a12.19 12.19 0 0 0-15.3 0zM571.6 251.47L488 182.56V44.05a12 12 0 0 0-12-12h-56a12 12 0 0 0-12 12v72.61L318.47 43a48 48 0 0 0-61 0L4.34 251.47a12 12 0 0 0-1.6 16.9l25.5 31A12 12 0 0 0 45.15 301l235.22-193.74a12.19 12.19 0 0 1 15.3 0L530.9 301a12 12 0 0 0 16.9-1.6l25.5-31a12 12 0 0 0-1.7-16.93z">
                                </path>
                            </svg>
                            SRM Kattankulathur, Chengalpattu 603203, IN
                        </p>
                        <p className="flex items-center justify-center md:justify-start mb-1">
                            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="envelope"
                                className="w-4 mr-4" role="img" xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 512 512">
                                <path fill="currentColor"
                                    d="M502.3 190.8c3.9-3.1 9.7-.2 9.7 4.7V400c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V195.6c0-5 5.7-7.8 9.7-4.7 22.4 17.4 52.1 39.5 154.1 113.6 21.1 15.4 56.7 47.8 92.2 47.6 35.7.3 72-32.8 92.3-47.6 102-74.1 131.6-96.3 154-113.7zM256 320c23.2.4 56.6-29.2 73.4-41.4 132.7-96.3 142.8-104.7 173.4-128.7 5.8-4.5 9.2-11.5 9.2-18.9v-19c0-26.5-21.5-48-48-48H48C21.5 64 0 85.5 0 112v19c0 7.4 3.4 14.3 9.2 18.9 30.6 23.9 40.7 32.4 173.4 128.7 16.8 12.2 50.2 41.8 73.4 41.4z">
                                </path>
                            </svg>
                            community@htbsrmist.tech
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;