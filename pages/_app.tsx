import "../styles/globals.css";
import type { AppProps } from "next/app";
import Nav from "../components/navbar";
import Head from "next/head";
import Footer from "../components/footer";
import ScrollToTopButton from "../components/scrlbtn";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const RouteProgressBar = () => {
    const router = useRouter();
    const [progress, setProgress] = useState(0);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        let progressInterval: NodeJS.Timeout;

        const handleStart = (url: string) => {
            if (url === router.asPath) return;
            setVisible(true);
            setProgress(25);

            clearInterval(progressInterval);
            progressInterval = setInterval(() => {
                setProgress((prev) => {
                    if (prev >= 85) {
                        clearInterval(progressInterval);
                        return 85;
                    }
                    return prev + (85 - prev) * 0.25;
                });
            }, 120);
        };

        const handleComplete = () => {
            clearInterval(progressInterval);
            setProgress(100);
            timer = setTimeout(() => {
                setVisible(false);
                setProgress(0);
            }, 250);
        };

        router.events.on("routeChangeStart", handleStart);
        router.events.on("routeChangeComplete", handleComplete);
        router.events.on("routeChangeError", handleComplete);

        return () => {
            clearInterval(progressInterval);
            clearTimeout(timer);
            router.events.off("routeChangeStart", handleStart);
            router.events.off("routeChangeComplete", handleComplete);
            router.events.off("routeChangeError", handleComplete);
        };
    }, [router]);

    if (!visible && progress === 0) return null;

    return (
        <div
            className="fixed top-0 left-0 right-0 h-[2.5px] z-[99999] pointer-events-none transition-opacity duration-300"
            style={{ opacity: visible ? 1 : 0 }}
        >
            <div
                className="h-full bg-gradient-to-r from-htb-green via-[#b8f520] to-htb-green shadow-[0_0_10px_#9FEF00,0_0_20px_#9FEF00] transition-all duration-200 ease-out"
                style={{ width: `${progress}%` }}
            />
        </div>
    );
};

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <RouteProgressBar />
            <Head>
                <title>HackTheBox Chennai</title>
                <meta name="title" content="HackTheBox Chennai" />
                <meta
                    name="description"
                    content="HackTheBox Chennai focuses on training the next-gen of cyber-warriors transforming cyberspace in Chennai and beyond."
                />
                <meta
                    name="keywords"
                    content="hack the box, hackthebox chennai, htbchennai, cybersecurity, hacking, hack the box meetup, meetup, chennai"
                />
                <meta name="language" content="English" />
                <meta name="author" content="HackTheBox Chennai" />
                <meta
                    name="copyright"
                    content="All rights reserved | HackTheBox Chennai"
                />
                <meta httpEquiv="content-language" content="en" />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://www.htbchennai.in" />
                <meta property="og:title" content="HackTheBox Chennai" />
                <meta
                    property="og:description"
                    content="HackTheBox Chennai focuses on training the next-gen of cyber-warriors transforming cyberspace in Chennai and beyond."
                />
                <meta property="og:image" content="/favicon.svg" />
                <meta property="twitter:card" content="summary_large_image" />
                <meta
                    property="twitter:url"
                    content="https://www.htbchennai.in"
                />
                <meta property="twitter:site" content="@htbsrmist" />
                <meta
                    property="twitter:title"
                    content="HackTheBox Chennai focuses on training the next-gen of cyber-warriors transforming cyberspace in Chennai and beyond."
                />
                <meta
                    property="twitter:description"
                    content="HackTheBox Chennai focuses on training the next-gen of cyber-warriors transforming cyberspace in Chennai and beyond."
                />
                <meta property="twitter:image" content="/favicon.svg" />
                <link rel="icon" href="/favicon.svg" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link
                    rel="preconnect"
                    href="https://fonts.gstatic.com"
                    crossOrigin="anonymous"
                />
                <link
                    href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Share+Tech&display=swap&family=Fira+Sans:wght@400;500;600;700&display=swap"
                    rel="stylesheet"
                />
            </Head>

            <Nav />
            <div className="flex-1 pt-[86px] sm:pt-[96px] md:pt-[100px]">
                <Component {...pageProps} />
            </div>
            <ScrollToTopButton />
            <Footer />
        </>
    );
}

export default MyApp;
