import Head from "next/head";

const ContactUs = () => {
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

            <section className="mx-auto w-[90%] sm:w-[85%] md:w-9/12 lg:w-6/12 text-center flex flex-col items-center space-y-6 md:space-y-8 p-6 sm:p-8 md:p-10 lg:p-14 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl md:rounded-3xl mb-8 md:mb-12 shadow-lg">
                <div className="flex flex-col items-center space-y-3">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-12 w-12 md:h-16 md:w-16 text-htb-green"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.5}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                        />
                    </svg>
                    <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-htb-green font-poppins">
                        Get In Touch
                    </h2>
                </div>

                <p className="text-hacker-grey text-sm md:text-base lg:text-lg max-w-md font-poppins">
                    Have a question, suggestion, or just want to say hello?
                    Reach out to us via email and we&apos;ll get back to you as
                    soon as possible.
                </p>

                <a
                    href="mailto:community@htbchennai.in"
                    className="inline-flex items-center gap-2 px-6 py-3 md:px-8 md:py-4 bg-htb-green/20 hover:bg-htb-green/40 border border-htb-green/50 hover:border-htb-green transition-all duration-300 rounded-xl text-htb-green text-base md:text-lg lg:text-xl font-medium font-poppins group"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 md:h-6 md:w-6 group-hover:scale-110 transition-transform duration-300"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                    </svg>
                    community@htbchennai.in
                </a>

                <p className="text-hacker-grey/60 text-xs md:text-sm font-poppins">
                    We typically respond within 24–48 hours.
                </p>
            </section>
        </div>
    );
};

export default ContactUs;

