import "../styles/globals.css";
import type { AppProps } from "next/app";
import Nav from "../components/navbar";
import Head from "next/head";
import Footer from "../components/footer";
import ScrollToTopButton from "../components/scrlbtn"

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <title>HackTheBox SRMIST</title>
                <meta name="title" content="HackTheBox SRMIST" />
                <meta
                    name="description"
                    content="HackTheBox SRMIST focuses on training the next-gen of cyber-warriors transforming cyberspace in SRMIST and beyond."
                />
                <meta
                    name="keywords"
                    content="hack the box, hackthebox srmist, htbsrmist, cybersecurity, hacking, hack the box meetup, meetup, chennai, srmist"
                />
                <meta name="language" content="English" />
                <meta name="author" content="HackTheBox SRMIST" />
                <meta
                    name="copyright"
                    content="All rights reserved | HackTheBox SRMIST"
                />
                <meta httpEquiv="content-language" content="en" />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://www.htbsrmist.tech" />
                <meta property="og:title" content="HackTheBox SRMIST" />
                <meta
                    property="og:description"
                    content="HackTheBox SRMIST focuses on training the next-gen of cyber-warriors transforming cyberspace in SRMIST and beyond."
                />
                <meta property="og:image" content="/favicon.svg" />
                <meta property="twitter:card" content="summary_large_image" />\
                <meta
                    property="twitter:url"
                    content="https://www.htbsrmist.tech"
                />
                <meta property="twitter:site" content="@htbsrmist" />
                <meta
                    property="twitter:title"
                    content="HackTheBox SRMIST focuses on training the next-gen of cyber-warriors transforming cyberspace in SRMIST and beyond."
                />
                <meta
                    property="twitter:description"
                    content="HackTheBox SRMIST focuses on training the next-gen of cyber-warriors transforming cyberspace in SRMIST and beyond."
                />
                <meta property="twitter:image" content="/favicon.svg" />
                <link rel="icon" href="/favicon.svg" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link
                    rel="preconnect"
                    href="https://fonts.gstatic.com"
                    // crossorigin
                />
                <link
                    href="https://fonts.googleapis.com/css2?family=Share+Tech&display=swap"
                    rel="stylesheet"
                />
                <link
                    href="https://fonts.googleapis.com/css2?family=Poppins&display=swap"
                    rel="stylesheet"
                ></link>
            </Head>

            <Nav />
            <Component {...pageProps} />
            <ScrollToTopButton />
            <Footer />
        </>
    );
}

export default MyApp;
