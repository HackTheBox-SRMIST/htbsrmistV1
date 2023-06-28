import React from "react";

const Speakers = ({ event }: any) => {
    return (
        <div className=" md:mt-0 flex-col justify-center px-2 md:pl-10 sm:px-20 ">
            <div className="text-center mb-10">
                <h1 className="text-white text-3xl ml-2 sm:ml-4 sm:text-5xl  font-bold">
                    Speakers
                </h1>
            </div>
            <div className="p-5 ml-1 sm:ml-0 rounded-3xl w-full sm:w-auto bg-node-black border-4 border-htb-green/50 mb-10">
                <p className="text-white mt-2 text-justify text-xl">
                    The Elite panel of guests who will inaugurate the event
                    are:-
                    <br />
                    <br />
                    {event?.speakers_details.map(
                        (speaker: { name: string; designation: string }) => {
                            return (
                                <>
                                    <strong className="text-htb-green">
                                        {speaker.name}
                                    </strong>
                                    <strong>, {speaker.designation}</strong>
                                    <br />
                                    <br />{" "}
                                </>
                            );
                        }
                    )}
                    <br />
                </p>
            </div>
        </div>
    );
};

export default Speakers;
