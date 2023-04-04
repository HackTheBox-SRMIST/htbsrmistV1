const Social = (props: any) => {
    return (
        <a
            href={props.link}
            className=" hover:bg-htb-green hover:text-black ease-linear duration-150 rounded-full p-1 text-3xl"
        >
            {props.logo}
        </a>
    );
};

export default Social;
