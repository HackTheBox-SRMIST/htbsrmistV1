import React from "react";

interface RolesProps {
    name?: string;
    role: string;
}

const Roles = (props: RolesProps) => {
    return (
        <div className="flex items-center justify-center gap-2 sm:gap-4 my-2 sm:my-3.5 w-full max-w-4xl mx-auto px-2 sm:px-4">
            <div className="h-[1px] bg-gradient-to-r from-transparent via-htb-green/40 to-htb-green flex-1 max-w-[25px] sm:max-w-[120px] md:max-w-[180px]" />
            <h2 className="text-base sm:text-2xl md:text-3xl font-extrabold tracking-wider uppercase flex flex-wrap items-center justify-center gap-1.5 sm:gap-2.5 text-center">
                <span className="text-htb-green/50 font-mono text-xs sm:text-lg md:text-xl font-bold">#</span>
                <span className="text-htb-green drop-shadow-[0_0_12px_rgba(159,239,0,0.35)]">
                    {props.name}
                </span>
                <span className="text-htb-green font-extrabold text-base sm:text-2xl md:text-3xl">
                    [<span className="text-white font-extrabold tracking-wide drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]">{props.role}</span>]
                </span>
            </h2>
            <div className="h-[1px] bg-gradient-to-l from-transparent via-htb-green/40 to-htb-green flex-1 max-w-[25px] sm:max-w-[120px] md:max-w-[180px]" />
        </div>
    );
};

export default Roles;
