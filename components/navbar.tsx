import Logo from "../utils/icons/htblogo";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Nav = () => {
    const { asPath } = useRouter();
    const [navbarOpen, setNavbarOpen] = useState(false);

    const links: { name: string; href: string }[] = [
        {
            name: "HOME",
            href: "/"
        },
        {
            name: "TEAM",
            href: "/team"
        },
        {
            name: "EVENTS",
            href: "/events"
        },
        {
            name: "CONTACT US",
            href: "/contact-us"
        },
        {
            name: "RECRUITMENTS",
            href: "/recruitment"
        }
    ];
    const showMenu = () => {
        setNavbarOpen(!navbarOpen);
    };
    return (
        <nav className="flex flex-row justify-between mb-4 bg-base-black rounded-lg custom-scrollbar overflow-auto overflow-y-hidden py-2 px-4 font-poppins">
            <a href="/" rel="noopener noreferrer" className="flex-none">
                <Logo />
            </a>
            {/* Primary Nav Menu */}
            <ul className=" text-white my-2 md:flex flex-row flex-nowrap mr-16 mt-8 hidden gap-x-8">
                {links.map((link) => (
                    <Link key={link.href} href={link.href}>
                        <a
                            className={`${
                                asPath === link.href
                                    ? "font-semibold text-htb-green"
                                    : ""
                            } transform hover:-translate-y-1 mb-2 flex-auto hover:text-htb-green hover:underline underline-offset-8 md:text-2xl transition-all`}
                        >
                            {link.name}
                        </a>
                    </Link>
                ))}
            </ul>
            {/* Mobile Hamburger Menu */}
            <div className="md:hidden flex items-center absolute right-10 top-10">
                <button
                    className="outline-none mobile-menu-button"
                    onClick={() => showMenu()}
                >
                    <svg
                        className=" w-6 h-6 text-gray-500 hover:text-green-500 "
                        x-show="!showMenu"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path d="M4 6h16M4 12h16M4 18h16"></path>
                    </svg>
                </button>
            </div>
            {/* Mobile Hamburger Menu */}
            {navbarOpen && (
                <div className="z-50">
                    <ul className=" text-white my-2 mx-auto mt-8 absolute top-10 right-10 bg-node-black min-w-[85%] ">
                        {links.map((link) => (
                            <Link href={link.href}>
                                <li
                                    key={link.href}
                                    className={`${
                                        asPath === link.href
                                            ? "font-semibold text-htb-green "
                                            : ""
                                    } min-w-max transform hover:-translate-y-1 cursor-pointer mb-2 flex-auto hover:text-htb-green md:text-sm py-2 px-4 border-b-[2px] border-htb-green `}
                                >
                                    <a
                                        className="mx-2 md:mx-5 "
                                        onClick={showMenu}
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            </Link>
                        ))}
                    </ul>
                </div>
            )}
        </nav>
    );
};

export default Nav;
