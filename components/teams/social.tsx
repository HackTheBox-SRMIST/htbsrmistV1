const Social = (props: any) => {
    return (
        <a
            href={props.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-htb-green transition-colors duration-200 text-lg"
        >
            {props.logo}
        </a>
    );
};

export default Social;