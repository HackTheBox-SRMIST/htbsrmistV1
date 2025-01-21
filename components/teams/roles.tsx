const Roles = (props: any) => {
    return (
        <div className="w-full text-center mb-8">
            <h2 className="text-htb-green text-2xl font-bold">
                {props.name} 
                <span className="text-htb-green ml-2">
                    [{props.role}]
                </span>
            </h2>
        </div>
    );
};

export default Roles;