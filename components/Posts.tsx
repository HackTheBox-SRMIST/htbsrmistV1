import Marquee from "react-easy-marquee";

const Posts = (gallery: any) => {
    const post = ["../../public/revealed_post.png"];

    return (
        <div className=" mb-4 lg:mb-0 w-[100%] ">
            <Marquee
                duration={10000}
                height="230px"
                background="rgba(0,0,0,0.5)"
                width="100%"
                className="rounded-3xl backdrop-blur"
            >
                {gallery.gallery.map((post: any) => (
                    <img src={post} alt="post" className="mx-2 w-4/6" />
                ))}
            </Marquee>
        </div>
    );
};

export default Posts;
