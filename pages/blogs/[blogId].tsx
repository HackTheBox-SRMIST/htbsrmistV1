import { NextPage, GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React from "react";
import { SiMedium } from "react-icons/si";

interface BlogProps {
    img: string;
    title: string;
    description: string;
    link: string;
    pubDate: string;
    slug: string;
}

interface Props {
    blogData: BlogProps[];
}

const BlogPage: NextPage<Props> = ({ blogData }) => {
    const router = useRouter();
    const blogId = router.query.blogId as string;
    // console.log(blogId);
    // console.log(blogData);
    const blog = blogData.find((blog) => blog.title === blogId);
    // console.log(blog);

    // console.log(pubDate);
    const createMarkup = (html: string) => {
        const modifiedHtml = html.replace(
            /(<img.*?>|<figure.*?>|<\/figure>|<h\d>.*?<\/h\d>)/g,
            (match) => {
                // Check if the match is a heading element
                if (match.startsWith("<h")) {
                    return `<div class="my-16"><span class="text-3xl max-md:text-xl text-center font-bold text-white">${match}</span></div>`;
                }
                return `<div class="my-16">${match}</div>`;
            }
        );

        const modifiedWithFont = modifiedHtml.replace(
            /<p.*?>(.*?)<\/p>/g,
            (match, pContent) =>
                `<p class="font-[share-tech] text-justify">${pContent}</p>`
        );

        return { __html: modifiedWithFont };
    };

    return (
        <div>
            <div>
                <div className="text-4xl max-md:text-2xl text-center justify-center font-bold text-htb-green p-6 max-w-screen font-[share-tech]">
                    <h1 className="m-0 font-bold text-center mb-12 text-6xl text-htb-green">
                        BLOGS
                    </h1>
                    <div className="flex-col">
                        <span>{blog?.title}</span>
                    </div>
                    <div className="flex justify-center">
                        {" "}
                        <a
                            href={blog?.link}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <button className="text-[#141D2B] bg-[#9FEF00] px-5 inline-flex mt-8 rounded-md hover:bg-htb-green opacity-70 hover:opacity-100 items-center">
                                <div>
                                    <SiMedium />
                                </div>
                                <p className="my-1.5 text-sm px-3">
                                    Read on Medium
                                </p>
                            </button>
                        </a>
                    </div>
                </div>
                <div className="md:text-lg lg:text-xl xl:text-1xl bg-[#181818] text-white/70 p-8 overflow-hidden">
                    <p
                        dangerouslySetInnerHTML={createMarkup(
                            blog?.description || ""
                        )}
                    />
                    <span>
                        <div className="text-white/70 text-left text-2xl max-md:text-xl font-extrabold font-[share-tech]">
                            Publish Date: {blog?.pubDate}
                        </div>
                    </span>
                </div>
            </div>
        </div>
    );
};

export const getServerSideProps: GetServerSideProps<Props> = async ({
    params
}) => {
    try {
        const response = await fetch(
            "https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@htbsrmist"
        );
        const { items } = await response.json();
        const formattedBlogs: BlogProps[] = items.map((item: any) => ({
            img: item.thumbnail,
            title: item.title,
            description: item.description,
            link: item.link,
            pubDate: item.pubDate.substring(0, 10),
            slug: encodeURIComponent(item.title)
        }));

        return {
            props: {
                blogData: formattedBlogs
            }
        };
    } catch (error) {
        console.error("Error fetching blogs:", error);
        return {
            props: {
                blogData: []
            }
        };
    }
};

export default BlogPage;
