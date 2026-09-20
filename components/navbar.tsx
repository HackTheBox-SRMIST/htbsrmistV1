import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Nav = () => {
    const { asPath } = useRouter();
    const [navbarOpen, setNavbarOpen] = useState(false);
    const [shineActive, setShineActive] = useState(false);

    const triggerShine = () => {
        setShineActive(true);
        setTimeout(() => {
            setShineActive(false);
        }, 1200);
    };

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

    // Close mobile menu on route change
    useEffect(() => {
        setNavbarOpen(false);
    }, [asPath]);

    const isLinkActive = (href: string) => {
        if (href === "/") {
            return asPath === "/";
        }
        return asPath === href || asPath.startsWith(href);
    };

    return (
        <nav className="fixed top-3 z-50 w-full flex justify-center px-2.5 sm:px-6">
            <div className={`relative w-full max-w-[1200px] xl:max-w-[1340px] flex items-center justify-between gap-2 px-3 sm:px-4 py-2.5 sm:py-3 rounded-2xl border border-htb-green/60 ${navbarOpen ? "bg-[#10161f] md:bg-white/[0.07]" : "bg-[#10161f]/90 md:bg-white/[0.07]"} [-webkit-backdrop-filter:blur(24px)_saturate(150%)] [backdrop-filter:blur(24px)_saturate(150%)] shadow-[0_0_12px_rgba(159,239,0,0.10),0_8px_24px_rgba(0,0,0,0.4)] font-poppins`}>
                <Link href="/">
                    <a
                        onClick={triggerShine}
                        className="flex items-center gap-1.5 sm:gap-3 md:gap-3.5 cursor-pointer group select-none"
                    >
                        {/* 1. logo.png */}
                        <img
                            src="/logo.png"
                            alt="HackTheBox SRMIST"
                            className="w-9 h-9 sm:w-11 sm:h-11 md:w-12 md:h-12 object-contain transition-all duration-300 group-hover:scale-105 shrink-0"
                        />

                        {/* Brand Text Container: all 3 pngs side by side on every screen size */}
                        <div className="flex items-center justify-center gap-0.5 sm:gap-3 md:gap-3.5 lg:gap-4 min-w-0">
                            {/* 2. HACKTHEBOX.png */}
                            <img
                                src="/HACKTHEBOX.png"
                                alt="HACKTHEBOX"
                                style={{
                                    filter: shineActive
                                        ? "brightness(1) invert(0)"
                                        : "brightness(0) invert(1)"
                                }}
                                className="h-4 sm:h-5 md:h-5 lg:h-6 w-auto object-contain min-w-0 transition-all duration-300"
                            />

                            {/* Divider 2: desktop only */}
                            <div className="md:hidden lg:block h-5 sm:h-7 lg:h-8 w-px bg-white/25 shrink-0 mx-1" />

                            {/* 3. heroDesc.png */}
                            <img
                                src="/heroDesc.png"
                                alt="Meetup: Chennai, IN | Supported by: SRMIST"
                                style={{
                                    filter: shineActive
                                        ? "brightness(1) invert(0)"
                                        : "brightness(0) invert(1)"
                                }}
                                className="hidden min-[360px]:block h-[15px] sm:h-5 md:hidden lg:block lg:h-9 w-auto object-contain min-w-0 transition-all duration-300"
                            />
                    </div>
                    </a>
                </Link>

                {/* Primary Nav Menu with glass bubble on active link */}
                <ul className="text-white items-center md:flex flex-row flex-nowrap hidden gap-x-1.5 lg:gap-x-2.5 xl:gap-x-3.5 whitespace-nowrap">
                    {links.map((link) => (
                        <Link key={link.href} href={link.href}>
                            <a
                                className={`${
                                    isLinkActive(link.href)
                                        ? "text-htb-green bg-htb-green/15 ring-1 ring-htb-green/40 shadow-[0_0_16px_rgba(159,239,0,0.3),inset_0_0_12px_rgba(159,239,0,0.08)]"
                                        : "text-white/85 hover:text-htb-green hover:bg-white/10"
                                } inline-block rounded-full px-2.5 lg:px-3 py-1.5 text-sm lg:text-[15px] xl:text-base 2xl:text-lg tracking-wide transition-all duration-300`}
                            >
                                {link.name}
                            </a>
                        </Link>
                    ))}
                </ul>

                {/* Mobile Hamburger Menu */}
                <div className="md:hidden flex items-center shrink-0 ml-auto z-50">
                    <button
                        className="outline-none mobile-menu-button p-0.5 text-white hover:text-htb-green transition-colors focus:outline-none"
                        onClick={() => showMenu()}
                        aria-label="Toggle navigation menu"
                        aria-expanded={navbarOpen}
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            {navbarOpen ? (
                                <path d="M6 6l12 12M6 18L18 6"></path>
                            ) : (
                                <path d="M4 6h16M4 12h16M4 18h16"></path>
                            )}
                        </svg>
                    </button>
                </div>

                {/* Mobile Backdrop Overlay (click outside to dismiss) */}
                {navbarOpen && (
                    <div
                        className="fixed inset-0 z-40 bg-black/40 md:hidden"
                        onClick={() => setNavbarOpen(false)}
                    />
                )}
                {/* Mobile Dropdown Menu with glass bubble on active link */}
                {navbarOpen && (
                    <div className="absolute right-2 top-full mt-2 z-50 md:hidden">
                        <ul className="text-white bg-[#10161f]/90 [-webkit-backdrop-filter:blur(24px)] [backdrop-filter:blur(24px)] border border-htb-green/60 rounded-2xl shadow-[0_0_12px_rgba(159,239,0,0.10),0_8px_24px_rgba(0,0,0,0.4)] py-2 px-2 overflow-hidden">
                            {links.map((link) => (
                                <Link key={link.href} href={link.href}>
                                    <li
                                        className={`${
                                            isLinkActive(link.href)
                                                ? "font-semibold text-htb-green bg-htb-green/15 ring-1 ring-htb-green/40"
                                                : "text-white/85 hover:text-htb-green hover:bg-white/10"
                                        } cursor-pointer rounded-lg text-sm py-2.5 px-4 mb-1 last:mb-0 transition-colors`}
                                    >
                                        <a
                                            className="block w-full tracking-wider"
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
            </div>
        </nav>
    );
};

export default Nav;