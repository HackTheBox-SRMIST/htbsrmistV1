import Marquee from "react-easy-marquee";

const Posts = (gallery: any) => {
    const post = ["../../public/revealed_post.png"];

    return (
        <div className=" mb-4 lg:mb-0 w-[100%] ">
            <Marquee
                duration={10000}
                height="390px"
                background="rgba(0,0,0,0.5)"
                width="100%"
                className="rounded-3xl backdrop-blur-[2px] "
            >
                {gallery.gallery.map((post: any) => {
                    console.log(post);

                    return (
                        <img
                            src={post}
                            alt="post"
                            className="rounded-xl mx-2 h-72 w-96"
                        />
                    );
                })}
            </Marquee>
        </div>
    );
};

export default Posts;
