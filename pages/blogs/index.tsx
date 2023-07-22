import React from "react";
import Link from "next/link";
import Image from "next/image";
import blogs from "../../public/blogs.svg";

interface BlogData {
    img: string;
    title: string;
    description: string;
    pubDate: string;
    slug: string;
}

interface BlogsProps {
    blogs: BlogData[];
}

const Blogs: React.FC<BlogsProps> = ({ blogs }) => {
    return (
        <div className="flex flex-col min-h-screen max-w-screen font-[share-tech]">
            <div className="flex justify-center items-center">
                <img src="./blogs.svg" className="h-8 md:h-16"></img>
            </div>

            <div className="grid grid-cols-1 p-9 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-center">
                {blogs.map((blog, index) => (
                    <div
                        className="backdrop-blur-sm bg-[#141D2B]/80 rounded-lg shadow-md p-4 flex-col justify-between items-between"
                        key={index}
                    >
                        <div>
                            <img
                                src={blog.img}
                                alt="Card Image"
                                className="w-full h-48 object-cover rounded-t-lg"
                            />
                        </div>
                        <div className="p-4">
                            <h2 className="text-xl font-bold text-htb-green mb-2 text-center">
                                {blog.title}
                            </h2>
                            <span>
                                <div className="text-white/70 text-right text-sm mt-8 font-extrabold font-[share-tech]">
                                    Publish Date: {blog?.pubDate}
                                </div>
                            </span>
                        </div>

                        <div className="flex justify-end items-center px-4 py-2 backdrop-blur-md ">
                            <Link href={`/blogs/${blog.slug}`}>
                                <div className="relative object-bottom">
                                    <a className="text-[#119f3b93] underline font-bold hover:text-htb-green cursor-pointer">
                                        Read More
                                    </a>
                                </div>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export async function getServerSideProps() {
    try {
        const response = await fetch(
            "https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@htbsrmist"
        );
        const { items } = await response.json();
        const formattedBlogs: BlogData[] = items.map((item: any) => ({
            img: item.thumbnail,
            title: item.title,
            description: item.description,
            pubDate: item.pubDate.substring(0, 10),

            slug: encodeURIComponent(item.title)
        }));

        return {
            props: {
                blogs: formattedBlogs
            }
        };
    } catch (error) {
        console.error("Error fetching blogs:", error);
        return {
            props: {
                blogs: []
            }
        };
    }
}

export default Blogs;
