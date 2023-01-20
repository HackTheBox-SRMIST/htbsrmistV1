import Image from "next/image";

const Member = (props: any) => {
    return (
        <div className="text-white flex flex-col justify-center items-center py-10 px-10">
            <Image
                src="https://i.ndtvimg.com/i/2017-03/rowan-atkinson_640x480_71490079191.jpg"
                // src={props.image}
                width={200}
                height={200}
                className="rounded-full"
            />
            <span className="text-2xl">{props.name}</span>
            <span>{props.domain}</span>
            <span>{props.caption}</span>
        </div>
    );
};

export default Member;
