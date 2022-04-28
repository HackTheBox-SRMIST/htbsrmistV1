import Marquee from "react-easy-marquee";

const Posts = () => {
    const posts = ["/revealed_post.png"];

    return (
        <div className="lg:pr-28 pr-8 mb-4 lg:mb-0 opacity-50 hover:opacity-90">
            <Marquee duration={10000} background="#A4B1CD" height="230px">

                {posts.map((post) => (
                    <img src={post} alt="post" className="post"/>
                ))}
            </Marquee>
        </div>
    ) 
}

export default Posts;