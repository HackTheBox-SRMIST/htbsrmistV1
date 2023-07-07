import { NextPage, GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React from "react";

interface BlogProps {
    img: string;
    title: string;
    description: string;
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

    const createMarkup = (html: string) => {
        return { __html: html };
    };

    return (
        <div>
            {/* <div>Blog Page for: {blogId}</div> */}
            <div>
                <div className="text-4xl text-center justify-center font-bold text-htb-green p-6">
                <h1>{blog?.title}</h1>
                </div>
                <div className="ml-36 mr-36 md:text-lg lg:text-xl xl:text-1xl leading-loose bg-[#141D2B] text-white/60">
                <p
                    dangerouslySetInnerHTML={createMarkup(
                        blog?.description || ""
                    )}
                />{" "}
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
