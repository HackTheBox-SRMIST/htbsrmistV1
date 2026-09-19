import React, { useState } from "react";
import Link from "next/link";
import Head from "next/head";

interface BlogData {
    img: string | null;
    title: string;
    description: string;
    pubDate: string;
    slug: string;
    link: string;
    readTime: string;
    categories: string[];
}

interface BlogsProps {
    blogs: BlogData[];
}

const BlogCard: React.FC<{ blog: BlogData }> = ({ blog }) => {
    const [imgError, setImgError] = useState(false);
    const [isOpening, setIsOpening] = useState(false);
    const hasImage = Boolean(blog.img) && !imgError;

    return (
        <div className="group relative flex flex-col justify-between h-full rounded-2xl bg-[#11161d]/85 backdrop-blur-md border border-htb-green/20 hover:border-htb-green hover:shadow-[0_0_20px_rgba(159,239,0,0.18)] transition-all duration-300 overflow-hidden">
            {/* Image Banner with Fallback */}
            <div className="w-full h-48 sm:h-52 overflow-hidden relative bg-black/60 shrink-0">
                {hasImage ? (
                    <img
                        src={blog.img!}
                        alt={blog.title}
                        onError={() => setImgError(true)}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 select-none"
                    />
                ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#0c1015] via-[#141b24] to-[#090d12] relative overflow-hidden group-hover:border-htb-green/40 transition-colors">
                        {/* Cyber grid pattern */}
                        <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#9FEF00_1px,transparent_1px),linear-gradient(to_bottom,#9FEF00_1px,transparent_1px)] bg-[size:24px_24px]" />
                        <div className="relative z-10 flex flex-col items-center gap-1.5 text-center px-4">
                            <span className="font-mono text-[11px] font-bold text-htb-green tracking-widest uppercase py-1 px-2.5 rounded border border-htb-green/40 bg-black/70 shadow-[0_0_12px_rgba(159,239,0,0.25)]">
                                HTB // WRITEUP
                            </span>
                        </div>
                    </div>
                )}
            </div>

            {/* Card Content */}
            <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between">
                <div>
                    {/* Title */}
                    <Link href={`/blogs/${blog.slug}`}>
                        <a onClick={() => setIsOpening(true)} className="block">
                            <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-htb-green transition-colors duration-200 line-clamp-2 leading-snug mb-2 font-mono">
                                {blog.title}
                            </h3>
                        </a>
                    </Link>

                    {/* Excerpt Snippet */}
                    {blog.description && (
                        <p className="text-zinc-400 text-xs sm:text-sm font-sans line-clamp-2 leading-relaxed mb-4">
                            {blog.description}
                        </p>
                    )}
                </div>

                {/* Bottom Bar: Read Writeup & Publish Date */}
                <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between gap-3">
                    <Link href={`/blogs/${blog.slug}`}>
                        <a
                            onClick={() => setIsOpening(true)}
                            className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg border font-mono text-xs font-bold transition-all duration-200 group/btn shadow-sm active:scale-95 ${
                                isOpening
                                    ? "bg-htb-green text-black border-htb-green opacity-90 cursor-wait"
                                    : "bg-htb-green/15 hover:bg-htb-green text-htb-green hover:text-black border-htb-green/40 hover:border-htb-green"
                            }`}
                        >
                            <span>{isOpening ? "Opening..." : "Read Writeup"}</span>
                            <svg className={`w-3.5 h-3.5 transition-transform ${isOpening ? "animate-spin" : "group-hover/btn:translate-x-1"}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                                {isOpening ? (
                                    <>
                                        <circle cx="12" cy="12" r="9" strokeOpacity="0.3" />
                                        <path d="M12 3a9 9 0 0 1 9 9" />
                                    </>
                                ) : (
                                    <>
                                        <line x1="5" y1="12" x2="19" y2="12" />
                                        <polyline points="12 5 19 12 12 19" />
                                    </>
                                )}
                            </svg>
                        </a>
                    </Link>

                    {blog.pubDate && (
                        <span className="text-zinc-400 font-mono text-xs tracking-tight shrink-0">
                            Publish Date: {blog.pubDate}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};

const Blogs: React.FC<BlogsProps> = ({ blogs }) => {
    return (
        <div className="flex flex-col min-h-screen max-w-screen font-[share-tech] px-4 sm:px-6 md:px-8 pb-14">
            <Head>
                <title>Blogs & Writeups | HTB SRMIST</title>
                <link rel="icon" href="/favicon.svg" />
            </Head>

            {/* Header / Title Banner */}
            <div className="flex justify-center items-center my-4 md:my-6">
                <img src="./blogs.svg" className="h-8 md:h-14" alt="Blogs & Writeups" />
            </div>

            {/* Grid of Hacker-Themed Article Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto w-full">
                {blogs.map((blog, index) => (
                    <BlogCard key={index} blog={blog} />
                ))}
            </div>
        </div>
    );
};

let cachedBlogsIndex: BlogData[] = [];
let lastFetchTimeIndex = 0;
const CACHE_TTL_MS = 10 * 60 * 1000; // 10 minutes cache

export async function getServerSideProps({ res }: { res: any }) {
    try {
        if (res && res.setHeader) {
            res.setHeader("Cache-Control", "public, s-maxage=600, stale-while-revalidate=1200");
        }

        const now = Date.now();
        if (cachedBlogsIndex.length > 0 && now - lastFetchTimeIndex < CACHE_TTL_MS) {
            return {
                props: {
                    blogs: cachedBlogsIndex
                }
            };
        }

        const response = await fetch(
            "https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@htbsrmist"
        );
        const { items } = await response.json();
        const regex = /<figure><img[^>]*?src="([^"]*)"[^>]*><\/figure>/;
        const imgRegex = /<img[^>]+src=["']([^"']+)["']/i;

        const formattedBlogs: BlogData[] = (items || []).map((item: any) => {
            const rawDescription = item.content || item.description || "";
            // Strip HTML tags for clean excerpt snippet and word count
            const plainText = rawDescription.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
            const wordCount = plainText ? plainText.split(/\s+/).length : 0;
            const readTimeMinutes = Math.max(1, Math.ceil(wordCount / 200));

            // Extract image from figure or first img tag
            const extractedImg =
                regex.exec(rawDescription)?.[1] ||
                item.thumbnail ||
                rawDescription.match(imgRegex)?.[1] ||
                null;

            // Extract topic tags
            const rawCategories: string[] = Array.isArray(item.categories) ? item.categories : [];
            const cleanCategories = rawCategories
                .map((cat: string) => cat.trim().toLowerCase().replace(/^#+/, ""))
                .filter(Boolean)
                .slice(0, 3);

            return {
                img: extractedImg,
                title: item.title || "Untitled Writeup",
                description: plainText.length > 120 ? `${plainText.substring(0, 120)}...` : plainText,
                pubDate: item.pubDate ? item.pubDate.substring(0, 10) : "",
                slug: encodeURIComponent(item.title || ""),
                link: item.link || "https://medium.com/@htbsrmist",
                readTime: `${readTimeMinutes} min read`,
                categories: cleanCategories
            };
        });

        cachedBlogsIndex = formattedBlogs;
        lastFetchTimeIndex = now;

        return {
            props: {
                blogs: formattedBlogs
            }
        };
    } catch (error) {
        console.error("Error fetching blogs:", error);
        return {
            props: {
                blogs: cachedBlogsIndex.length > 0 ? cachedBlogsIndex : []
            }
        };
    }
}

export default Blogs;
