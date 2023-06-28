import React from "react";

const prerequisites = ({ event }: any) => {
    return (
        <div className="mt-10 flex-col justify-center px-2 md:pl-10 sm:px-20">
            <div className="text-center mb-10">
                <h1 className="text-white text-3xl pl-2 sm:pl-6 sm:text-5xl  font-bold">
                    Prerequisites
                </h1>
            </div>
            <div className="p-5 rounded-3xl ml-1 sm:ml-0 w-full sm:w-auto bg-node-black border-4 border-htb-green/50 mb-10">
                <p className="text-white mt-4  break-keep text-xl">
                    <h2 className="text-2xl font-bold">
                        Prerequisites for the Hands-on Workshop:-
                    </h2>
                    <br />
                    <ul className="list-disc list-inside">
                        {(() => {
                            let prereq_len: number = Number(
                                event?.prerequisites.length
                            );
                            let prereq = [];
                            for (let i = 0; i < prereq_len; i++) {
                                prereq.push(
                                    <li key={event?.prerequisites[i]}>
                                        {event?.prerequisites[i]}
                                    </li>
                                );
                            }
                            return prereq;
                        })()}
                    </ul>
                </p>
            </div>
        </div>
    );
};

export default prerequisites;
