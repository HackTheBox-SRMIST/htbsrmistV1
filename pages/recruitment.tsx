import type { NextPage } from "next";
import Script from "next/script";
const Recruitment: NextPage = () => {
    return (
        <>
                <div className="flex flex-col lg:flex-row mx-auto w-[80%] text-white font-Montserrat gap-8 mb-16">
                    <div className="flex-[50%]">
                        <h1 className="text-7xl font-bold text-htb-green">
                            We're hiring!
                        </h1>
                        <p className="mt-8 max-w-lg text-2xl">
                            The same old routine on loop and a constant desire
                            to start new chapters in your life?
                            <br /> Don't know where or how to begin?
                            <br />
                            Join HackTheBox SRMIST today for a chance to
                            experience and discover something new.
                            <br /> Come join our extremely energetic and driven
                            team.
                            <br /> Apply now by clicking the Register Now
                            Button.
                            
                        </p>
                        <div className="mt-12 ">
                            <button
                                data-tf-popup="amsbrfEr"
                                data-tf-iframe-props="title=RECRUITMENT"
                                data-tf-medium="snippet"
                                className="recruitmentBtn "
                            >
                                Register Now!
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
