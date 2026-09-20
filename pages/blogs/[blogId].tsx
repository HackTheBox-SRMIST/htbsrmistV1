import { NextPage, GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React from "react";
import Link from "next/link";
import Head from "next/head";
import { SiMedium } from "react-icons/si";
import FOF from "../404";

interface BlogProps {
    img: string | null;
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

    const blog = (blogData || []).find(
        (b) => b.title === blogId || b.slug === blogId || decodeURIComponent(blogId || "") === b.title
    );

    if (!blog) {
        return <FOF />;
    }

    return (
        <div className="min-h-screen text-white px-3 sm:px-6 md:px-8 py-6 sm:py-10 flex flex-col items-center">
            <Head>
                <title>{blog.title} | HTB SRMIST Writeup</title>
                <link rel="icon" href="/favicon.svg" />
            </Head>

            {/* Top Navigation Bar */}
            <div className="max-w-4xl w-full mb-6 sm:mb-8 flex items-center justify-between gap-3">
                <Link href="/blogs">
                    <a className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-black/70 hover:bg-htb-green text-zinc-300 hover:text-black border border-htb-green/40 font-fira-sans text-xs sm:text-sm font-bold transition-all duration-200 shadow-md active:scale-95">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <line x1="19" y1="12" x2="5" y2="12" />
                            <polyline points="12 19 5 12 12 5" />
                        </svg>
                        <span>Back to Writeups</span>
                    </a>
                </Link>

                {blog.link && (
                    <a
                        href={blog.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-black/70 hover:bg-htb-green text-zinc-300 hover:text-black border border-htb-green/40 font-fira-sans text-xs sm:text-sm font-bold transition-all duration-200 shadow-md active:scale-95"
                    >
                        <SiMedium className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        <span>Read on Medium</span>
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                            <polyline points="15 3 21 3 21 9" />
                            <line x1="10" y1="14" x2="21" y2="3" />
                        </svg>
                    </a>
                )}
            </div>

            {/* Main Article Container */}
            <main className="max-w-4xl w-full bg-[#0d1218]/90 backdrop-blur-md rounded-2xl md:rounded-3xl border border-htb-green/25 p-4 sm:p-8 md:p-10 shadow-[0_10px_40px_rgba(0,0,0,0.8)] overflow-hidden">
                {/* Article Header */}
                <header className="mb-6 sm:mb-8 pb-5 sm:pb-6 border-b border-zinc-800">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white font-fira-sans tracking-tight leading-tight mb-4">
                        {blog.title}
                    </h1>

                    <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm font-fira-sans text-zinc-400">
                        <div className="flex items-center gap-2 text-htb-green">
                            <span className="w-2 h-2 rounded-full bg-htb-green shadow-[0_0_8px_rgba(159,239,0,0.8)]" />
                            <span className="text-zinc-200 font-semibold">HackTheBox SRMIST</span>
                        </div>
                        {blog.pubDate && (
                            <div className="flex items-center gap-1.5 text-zinc-400">
                                <svg className="w-4 h-4 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" strokeWidth={2} />
                                    <line x1="16" y1="2" x2="16" y2="6" strokeWidth={2} />
                                    <line x1="8" y1="2" x2="8" y2="6" strokeWidth={2} />
                                    <line x1="3" y1="10" x2="21" y2="10" strokeWidth={2} />
                                </svg>
                                <span>Publish Date: {blog.pubDate}</span>
                            </div>
                        )}
                    </div>
                </header>

                {/* Article Prose Body */}
                <article className="blog-prose overflow-hidden break-words">
                    <div dangerouslySetInnerHTML={{ __html: blog.description || "" }} />
                </article>

                {/* Bottom Footer Actions */}
                <footer className="mt-10 pt-6 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <Link href="/blogs">
                        <a className="inline-flex items-center gap-2 text-htb-green hover:underline font-fira-sans text-xs sm:text-sm font-semibold">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                <line x1="19" y1="12" x2="5" y2="12" />
                                <polyline points="12 19 5 12 12 5" />
                            </svg>
                            <span>Back to all writeups</span>
                        </a>
                    </Link>

                    {blog.link && (
                        <a
                            href={blog.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-zinc-400 hover:text-htb-green transition-colors font-fira-sans text-xs sm:text-sm"
                        >
                            <SiMedium className="w-4 h-4" />
                            <span>View original publication on Medium ↗</span>
                        </a>
                    )}
                </footer>
            </main>
        </div>
    );
};

let cachedBlogsDetail: BlogProps[] = [];
let lastFetchTimeDetail = 0;
const CACHE_TTL_MS = 10 * 60 * 1000; // 10 minutes cache

export const getServerSideProps: GetServerSideProps<Props> = async ({ res }) => {
    try {
        if (res && res.setHeader) {
            res.setHeader("Cache-Control", "public, s-maxage=600, stale-while-revalidate=1200");
        }

        const now = Date.now();
        if (cachedBlogsDetail.length > 0 && now - lastFetchTimeDetail < CACHE_TTL_MS) {
            return {
                props: {
                    blogData: cachedBlogsDetail
                }
            };
        }

        const response = await fetch(
            "https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@htbsrmist"
        );
        const { items } = await response.json();
        const regex = /<figure><img[^>]*?src="([^"]*)"[^>]*><\/figure>/;
        const imgRegex = /<img[^>]+src=["']([^"']+)["']/i;

        const formattedBlogs: BlogProps[] = (items || []).map((item: any) => {
            const rawDescription = item.content || item.description || "";
            const extractedImg =
                regex.exec(rawDescription)?.[1] ||
                item.thumbnail ||
                rawDescription.match(imgRegex)?.[1] ||
                null;

            return {
                img: extractedImg,
                title: item.title,
                description: rawDescription,
                link: item.link || "https://medium.com/@htbsrmist",
                pubDate: item.pubDate ? item.pubDate.substring(0, 10) : "",
                slug: encodeURIComponent(item.title)
            };
        });

        cachedBlogsDetail = formattedBlogs;
        lastFetchTimeDetail = now;

        return {
            props: {
                blogData: formattedBlogs
            }
        };
    } catch (error) {
        console.error("Error fetching blogs:", error);
        return {
            props: {
                blogData: cachedBlogsDetail.length > 0 ? cachedBlogsDetail : []
            }
        };
    }
};

export default BlogPage;
