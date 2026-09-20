const Social = (props: any) => {
    return (
        <a
            href={props.link}
            target="_blank"
            rel="noreferrer"
            className="text-zinc-400 hover:bg-htb-green hover:text-black ease-linear duration-150 rounded-full p-1 text-xl sm:text-2xl transition-all hover:scale-110 flex items-center justify-center shrink-0"
        >
            {props.logo}
        </a>
    );
};

export default Social;
