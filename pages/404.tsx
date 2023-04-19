import Head from "next/head";
import Footer from "../components/footer";
import Nav from "../components/navbar";
import Image from "next/image";
import error404 from "../public/error404.svg";
import Link from "next/link";
import { BsArrowLeft } from "react-icons/bs";

const FOF = () => {
    return (
        <section className="flex flex-col items-center justify-between w-full px-4 gap-12 my-5 md:gap-6 xl:gap-12 lg:h-screen lg:justify-start lg:mt-20">
            <Image src={error404} />
            <Link href="/">
                <button className="flex justify-start items-center pl-12 py-2 w-60 text-2xl rounded-3xl gap-5 tracking-wider bg-[#12273e] hover:bg-htb-green active:bg-[#5B8E23] focus:outline-none  text-white ">
                    <BsArrowLeft />
                    <span>Go Back</span>
                </button>
            </Link>
        </section>
    );
};

export default FOF;
