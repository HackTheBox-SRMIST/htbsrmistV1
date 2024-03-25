import Logo from "../utils/icons/htblogo";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Nav = () => {
    const { asPath } = useRouter();
    const [navbarOpen, setNavbarOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

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
            name: "BLOGS",
            href: "/blogs"
        },
        {
            name: "RECRUITMENTS",
            href: "/recruitment"
        }
    ];
    const showMenu = () => {
        setNavbarOpen(!navbarOpen);
    };

    useEffect(() => {
        const handleScroll = () => {
          const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
          setIsScrolled(scrollTop > 0);
        };
    
        window.addEventListener('scroll', handleScroll);
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
      }, []);


    return (
        <nav className={`flex flex-row justify-between mb-4 bg-transparent rounded-lg custom-scrollbar overflow-auto overflow-y-hidden h-18 py-2 px-4 font-poppins fixed z-200 w-full top-0 ${isScrolled ? 'bg-black bg-opacity-10 backdrop-blur-lg' : ''} transition-all duration-300 ease-in-out`}>
            <a href="/" rel="noopener noreferrer" className="flex-none">
                <img className="w-14 ml-5 mt-2" src="https://www.htbsrmist.tech/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.46ee2c41.png&w=640&q=75" alt="" />
            </a>
            {/* Primary Nav Menu */}
            <ul className=" text-white my-2 md:flex flex-row flex-nowrap mr-16 mt-5 hidden gap-x-8">
                {links.map((link) => (
                    <Link key={link.href} href={link.href}>
                        <a
                            className={`${
                                asPath === link.href
                                    ? "font-semibold text-htb-green"
                                    : ""
                            } transform hover:-translate-y-1 mb-2 flex-auto hover:text-htb-green hover:underline underline-offset-8 md:text-lg transition-all`}
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
                    <ul className=" text-white my-2 mx-auto mt-8 absolute top-10 right-10 bg-[#181818] min-w-[85%] ">
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
