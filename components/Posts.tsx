import Marquee from "react-easy-marquee";

const Posts = (gallery:any) => {
    const posts = ["/revealed_post.png",];

    return (
        <div className="lg:pr-28 mb-4 lg:mb-0 w-[100%] ">
            <Marquee duration={10000} height="230px" background="rgba(0,0,0,0.5)" width="100%" className="rounded-3xl backdrop-blur" >

                {gallery.gallery.map((post:any) => (
                    <img src={post} alt="post" className="post"  />
                ))}
            </Marquee>
        </div>
    ) 
}

export default Posts;