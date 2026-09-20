import React from "react";

interface RolesProps {
    name?: string;
    role?: string;
    nameColor?: string;
}

const Roles = (props: RolesProps) => {
    const nameColor = props.nameColor || "text-htb-green drop-shadow-[0_0_12px_rgba(159,239,0,0.35)]";

    return (
        <div className="flex items-center justify-center gap-1.5 sm:gap-4 mt-1 sm:mt-3 mb-0.5 sm:mb-2 w-full max-w-4xl mx-auto px-2 sm:px-4">
            <div className="h-[1px] bg-gradient-to-r from-transparent via-htb-green/40 to-htb-green flex-1 max-w-[20px] sm:max-w-[120px] md:max-w-[180px]" />
            <h2 className="text-[26px] font-extrabold tracking-wider uppercase flex flex-wrap items-center justify-center gap-1.5 sm:gap-2.5 text-center leading-tight">
                <span className="text-htb-green/50 font-mono text-base sm:text-lg font-bold">#</span>
                {props.name && (
                    <span className={nameColor}>
                        {props.name}
                    </span>
                )}
                {props.role && (
                    <span className="text-htb-green font-extrabold text-[26px]">
                        [<span className="text-white font-extrabold tracking-wide drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]">{props.role}</span>]
                    </span>
                )}
            </h2>
            <div className="h-[1px] bg-gradient-to-l from-transparent via-htb-green/40 to-htb-green flex-1 max-w-[20px] sm:max-w-[120px] md:max-w-[180px]" />
        </div>
    );
};

export default Roles;
