const Roles = (props: any) => {
    return (
        <div className="text-4xl text-htb-green flex justify-center items-center font-bold text-center">
            {props.name} [{props.role}]
        </div>
    );
};

export default Roles;
