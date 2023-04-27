import type { NextPage } from "next";
import Script from "next/script";
const Recruitment: NextPage = () => {
    return (
        <>
            <div className="flex md:flex-row flex-col md:justify-around w-4/5 mx-auto  md:w-full">
                <div className=" text-white font-Montserrat gap-8 mb-16">
                    <h1 className="text-6xl lg:text-7xl font-bold text-htb-green">
                        We're hiring!
                    </h1>
                    <div className="mt-8 max-w-lg text-2xl">
                        <div>
                            <p className="text-htb-green text-3xl md:text-4xl font-black">
                                RECRUITMENT '23
                            </p>
                            <p>
                                <br />
                                The same old routine on loop and a constant
                                desire to start new chapters in your life?
                                <br /> Don't know where or how to begin?
                                <br />
                                Join HackTheBox SRMIST today for a chance to
                                experience and discover something new.
                                <br /> Come join our passionate team driven by
                                black coffee and lack of sleep.
                                <br /> Register by clicking the Apply Now
                                button.
                                <br />
                                <br />
                            </p>
                            <br />
                        </div>
                        <div className="mb-2 flex justify-center md:justify-start">
                            <button
                                data-tf-popup="ONxYHH68"
                                data-tf-iframe-props="title=RECRUITMENT_23"
                                data-tf-medium="snippet"
                                className="recruitmentBtn btninactive"
                                disabled={true}
                            >
                                Apply Now!
                            </button>
                            <Script src="//embed.typeform.com/next/embed.js" />
                        </div>
                    </div>
                </div>
                <div className="">
                    <img
                        src="https://ik.imagekit.io/htbsrmist/Recruitments/Recruitments23.png?ik-sdk-version=javascript-1.4.3&updatedAt=1677477601213"
                        alt="Recruitments Poster"
                        className="h-auto w-[512px] "
                    />
                </div>
            </div>
            <div className="flex justify-start w-4/5 mx-auto text-white font-Montserrat mb-16">
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
            </div>
        </>
    );
};

export default Recruitment;
