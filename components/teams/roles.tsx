const Roles = (props: any) => {
    return (
        <div className="text-4xl text-white flex justify-center items-center">
            {props.role} ({props.name})
        </div>
    );
};

export default Roles;
