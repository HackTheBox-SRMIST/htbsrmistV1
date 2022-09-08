import type { NextPage } from "next";
import Script from "next/script";
const Recruitment: NextPage = () => {
    return (
        <>
        <div className="flex">
                    <div className="mx-auto w-[80%] text-white font-Montserrat gap-8 mb-16">
                    <h1 className="text-6xl lg:text-7xl font-bold text-htb-green">
                        We're hiring!
                    </h1>
                    <div className="mt-8 max-w-lg text-2xl">
                    <p className="text-htb-green text-4xl font-black">
                            For Freshers😉
                        </p>
                        <p>
                            Are you intrested in joining us on a Cyber Security
                            journey.
                        </p>
                        <br />
                        <div className="mb-2">
                            <button
                                data-tf-popup="p9tYsszZ"
                                data-tf-iframe-props="title=RECRUITMENT"
                                data-tf-medium="snippet"
                                className="recruitmentBtn btnactive"
                                >
                                Are you interested?
                            </button>
                            <Script src="//embed.typeform.com/next/embed.js" />
                        </div>
                    </div>
                                    </div>

        </div>
            <div className="flex flex-col lg:flex-row mx-auto w-[80%] text-white font-Montserrat gap-8 mb-16">
                <div className="flex-[50%] text-center lg:text-left">

                    
                    <p className="mt-8 max-w-lg text-2xl">
                        
                        <br />
                        <p className="text-htb-green text-4xl font-black">
                            For Second and Third Years👴
                        </p>
                        <br />
                        The same old routine on loop and a constant desire to
                        start new chapters in your life?
                        <br /> Don't know where or how to begin?
                        <br />
                        Join HackTheBox SRMIST today for a chance to experience
                        and discover something new.
                        <br /> Come join our passionate team driven by black
                        coffee and lack of sleep.
                        <br /> Register by clicking the Apply Now button.
                        <br />
                        <br />
                        <p className="text-htb-green font-bold">
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
                <div className="flex-[50%] ">
                    <img
                        src="./RecruitmentPoster.png"
                        alt="Recruitments Poster"
                        className="h-auto w-[512px] "
                    />
                </div>
            </div>
        </>
    );
};

export default Recruitment;
