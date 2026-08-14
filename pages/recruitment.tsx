import type { NextPage } from "next";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import React, { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";

const Toast = (success: boolean, message: React.ReactNode) => {
    toast[success ? "success" : "error"](message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
        style: {
            background: "#0d1117",
            border: `1px solid ${success ? "rgba(159,239,0,0.5)" : "rgba(255,95,87,0.5)"}`,
            color: success ? "#9FEF00" : "#ff5f57",
            fontFamily: "'Share Tech', monospace",
            letterSpacing: "0.05em",
            boxShadow: `0 0 20px ${success ? "rgba(159,239,0,0.15)" : "rgba(255,95,87,0.15)"}`
        }
    });
};

/* ─── Field Component ───────────────────────────────────────── */
const Field = ({
    label,
    required,
    error,
    children,
}: {
    label: string;
    required?: boolean;
    error?: string;
    children: React.ReactNode;
}) => (
    <div className="flex flex-col gap-1.5">
        <label className="text-base font-semibold text-[#e6edf3]">
            {label.replace(" (Optional)", "")}
            {label.includes("(Optional)") && (
                <span className="text-[#c9d1d9] font-normal text-base ml-1.5">(Optional)</span>
            )}
            {required && <span className="text-[#9FEF00] ml-0.5">*</span>}
        </label>
        {children}
        {error && (
            <p className="text-xs text-red-400 mt-0.5">{error}</p>
        )}
    </div>
);

const inputClass = (hasError?: boolean) =>
    `w-full bg-[#161b22] border ${
        hasError ? "border-red-500/70" : "border-[#30363d]"
    } hover:border-[#48535e] focus:border-[#9FEF00] text-[#e6edf3] text-sm px-3.5 py-2.5 rounded-md outline-none transition-colors duration-200 placeholder:text-[#6e7681]`;

/* ─── Domain Chips ──────────────────────────────────────────── */
const DOMAINS = ["Cyber Security", "Creatives", "Development", "Corporate"];

const DomainPicker = ({
    label,
    required,
    value,
    onChange,
    error,
}: {
    label: string;
    required?: boolean;
    value: string;
    onChange: (v: string) => void;
    error?: string;
}) => (
    <Field label={label} required={required} error={error}>
        <div className="grid grid-cols-2 gap-2">
            {DOMAINS.map((d) => (
                <button
                    key={d}
                    type="button"
                    onClick={() => onChange(value === d ? "" : d)}
                    className={`flex items-center justify-center py-2.5 px-2 text-sm rounded-md border transition-all duration-200 font-share-tech tracking-wide uppercase ${
                        value === d
                            ? "bg-[#9FEF00]/10 border-[#9FEF00] text-[#9FEF00] font-bold shadow-[0_0_12px_rgba(159,239,0,0.15)]"
                            : "bg-[#161b22] border-[#30363d] text-[#c9d1d9] hover:border-[#48535e] hover:bg-[#21262d] hover:text-white"
                    }`}
                >
                    {d}
                </button>
            ))}
        </div>
    </Field>
);

/* ─── Modal ─────────────────────────────────────────────────── */
const Modal = ({
    open,
    onClose,
    children,
}: {
    open: boolean;
    onClose: () => void;
    children: React.ReactNode;
}) => {
    const [render, setRender] = useState(false);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (open) {
            setRender(true);
            requestAnimationFrame(() => {
                requestAnimationFrame(() => setVisible(true));
            });
        } else {
            setVisible(false);
            const t = setTimeout(() => setRender(false), 200);
            return () => clearTimeout(t);
        }
    }, [open]);

    useEffect(() => {
        document.body.style.overflow = open ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [open]);

    if (!render) return null;

    return (
        <div
            className={`fixed inset-0 z-[9999] flex items-center justify-center p-4 transition-all duration-200 ${visible ? "opacity-100 bg-[rgba(1,4,9,0.85)] backdrop-blur-sm" : "opacity-0 bg-transparent backdrop-blur-none"}`}
            onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
        >
            <div
                className={`relative w-full max-w-md rounded-xl overflow-hidden flex flex-col transition-all duration-200 ease-out max-h-[82vh] sm:max-h-[92vh] ${visible ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-4"}`}
                style={{
                    background: "#0d1117",
                    border: "1px solid rgba(159,239,0,0.55)",
                    boxShadow: "0 0 0 1px rgba(159,239,0,0.12), 0 0 25px rgba(159,239,0,0.2), 0 24px 64px rgba(0,0,0,0.7)",
                }}
            >
                {/* Modal header */}
                <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-[#21262d]">
                    <div>
                        <h2 className="text-3xl font-bold font-share-tech tracking-wide"
                            style={{ color: "#9FEF00", textShadow: "0 0 18px rgba(159,239,0,0.55)" }}>
                            Recruitment Form
                        </h2>
                        <p className="text-sm text-[#e6edf3] mt-1 font-poppins">
                            Fill your details
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-[#8b949e] hover:text-[#e6edf3] transition-colors text-2xl leading-none w-8 h-8 flex items-center justify-center rounded-md hover:bg-[#21262d]"
                    >
                        ×
                    </button>
                </div>

                {/* Scrollable body */}
                <div className="overflow-y-auto px-6 py-5 flex flex-col gap-4 flex-1 htb-scrollbar">
                    {children}
                </div>
            </div>
        </div>
    );
};

/* ─── Page ──────────────────────────────────────────────────── */
const Recruitment: NextPage = () => {
    const [open, setOpen] = useState(false);
    const [usn, setUsn] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [domain1, setDomain1] = useState("");
    const [domain2, setDomain2] = useState("");
    const [linkedin, setLinkedin] = useState("");
    const [additionalLink, setAdditionalLink] = useState("");
    const [resume, setResume] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [errors, setErrors] = useState({ usn: "", email: "", phone: "", domain: "" });

    const [typedText, setTypedText] = useState("");

    useEffect(() => {
        const phrases = [
            "> Register by clicking the Apply Now button.",
            "> Domains: Cyber Security, Development, Creatives, Corporate",
            "> HackTheBox SRMIST"
        ];
        
        let i = 0;
        let isDeleting = false;
        let loopNum = 0;
        let timeout: NodeJS.Timeout;

        const type = () => {
            const currentPhrase = phrases[loopNum % phrases.length];
            
            if (!isDeleting && i <= currentPhrase.length) {
                setTypedText(currentPhrase.substring(0, i));
                i++;
                timeout = setTimeout(type, 25);
            } else if (isDeleting && i >= 0) {
                setTypedText(currentPhrase.substring(0, i));
                i--;
                timeout = setTimeout(type, 12);
            } else {
                if (isDeleting) {
                    isDeleting = false;
                    loopNum++;
                    timeout = setTimeout(type, 400);
                } else {
                    isDeleting = true;
                    timeout = setTimeout(type, 2300);
                }
            }
        };

        timeout = setTimeout(type, 1000);
        return () => clearTimeout(timeout);
    }, []);

    const validate = (fieldName: string, value: string): string => {
        if (fieldName === "usn") {
            if (!value.trim()) return "Registration number is required.";
            if (value.length !== 15) return "Must be exactly 15 characters.";
            if (!/^RA(25|26)/.test(value)) return "Must start with RA25 or RA26.";
        }
        if (fieldName === "email") {
            if (!value.trim()) return "Email is required.";
            if (!value.endsWith("@srmist.edu.in")) return "Must be an @srmist.edu.in address.";
        }
        if (fieldName === "phone") {
            if (!value.trim()) return "Phone number is required.";
            if (!/^\d{10}$/.test(value)) return "Must be a 10-digit number.";
        }
        return "";
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const err = validate(e.target.name, e.target.value);
        setErrors((p) => ({ ...p, [e.target.name]: err }));
    };

    const validateAll = (): boolean => {
        const usnErr = validate("usn", usn);
        const emailErr = validate("email", email);
        const phoneErr = validate("phone", phone);
        const domainErr = !domain1.trim()
            ? "Please select your first domain."
            : domain1 === domain2
            ? "Both domains cannot be the same."
            : "";
        const nameErr = !name.trim() ? "Name is required." : "";
        const linkedinErr = !linkedin.trim() ? "LinkedIn profile is required." : "";

        setErrors({ usn: usnErr, email: emailErr, phone: phoneErr, domain: domainErr });

        const firstError = usnErr || nameErr || emailErr || phoneErr || domainErr || linkedinErr;
        if (firstError) Toast(false, firstError);

        return !usnErr && !nameErr && !emailErr && !phoneErr && !domainErr && !linkedinErr;
    };

    const reset = () => {
        setUsn(""); setName(""); setEmail(""); setPhone("");
        setDomain1(""); setDomain2(""); setLinkedin("");
        setAdditionalLink(""); setResume("");
        setErrors({ usn: "", email: "", phone: "", domain: "" });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (submitting) return;
        setSubmitting(true);

        try {
            if (!validateAll()) { setSubmitting(false); return; }

            const response = await axios.post("/api/v1/recruitment", {
                usn: usn.trim(), name: name.trim(),
                email: email.toLowerCase().trim(), phone: phone.trim(),
                domain1: domain1.trim(), domain2: domain2.trim(),
                linkedin: linkedin.trim(), additionalLink: additionalLink.trim(),
                resume: resume.trim(),
            });

            if (response.status === 200) {
                Toast(true, (
                    <div className="flex flex-col gap-1 font-share-tech tracking-wide mt-1">
                        <span className="text-[#9FEF00] font-bold text-base mb-1">[+] Registration successful!</span>
                        <span className="text-[#c9d1d9] text-sm">&gt; Name: {name}</span>
                        <span className="text-[#c9d1d9] text-sm">&gt; Reg No: {usn.toUpperCase()}</span>
                    </div>
                ));
                reset();
                setOpen(false);
            } else {
                Toast(false, response.data.message);
            }
        } catch (err: any) {
            const msg =
                err.response?.data?.message ||
                err.message ||
                "Something went wrong. Please try again.";
            Toast(false, msg);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <>
            <ToastContainer />

            {/* ── Hero ── */}
            <div className="w-full max-w-6xl mx-auto px-6 md:px-16 pt-0 pb-10 md:pb-14">
                <div className="flex flex-col-reverse md:flex-row md:items-center md:justify-between gap-10 md:gap-16">

                    {/* Left: Copy */}
                    <div className="flex-1 flex flex-col items-start max-md:items-center">

                        {/* Main heading */}
                        <h1 className="font-share-tech font-bold leading-[1.05] max-md:text-center text-5xl sm:text-6xl lg:text-7xl">
                            <span className="text-htb-green" style={{ textShadow: "0 0 18px rgba(159,239,0,0.35)" }}>&gt;&nbsp;</span>
                            <span className="text-white">We&apos;re </span>
                            <span className="text-htb-green" style={{ textShadow: "0 0 24px rgba(159,239,0,0.45)" }}>hiring!</span>
                        </h1>


                        {/* Terminal window */}
                        <div className="mt-5 max-w-md md:max-w-lg lg:max-w-xl w-full rounded-xl overflow-hidden max-md:mx-auto relative"
                            style={{
                                background: "rgba(255,255,255,0.03)",
                                backdropFilter: "blur(24px) saturate(180%)",
                                WebkitBackdropFilter: "blur(24px) saturate(180%)",
                                border: "1px solid rgba(159,239,0,0.15)",
                                boxShadow: "0 0 15px rgba(159,239,0,0.08), 0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)",
                            }}>

                            {/* Terminal top bar */}
                            <div className="flex items-center justify-between px-3 sm:px-4 py-2 sm:py-2.5 border-b"
                                style={{
                                    background: "rgba(255,255,255,0.05)",
                                    borderColor: "rgba(255,255,255,0.08)",
                                }}>
                                <div className="flex items-center gap-1 sm:gap-2">
                                    <span className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-[#ff5f57]" />
                                    <span className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-[#febc2e]" />
                                    <span className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-[#28c840]" />
                                </div>
                                <div className="flex items-center gap-1.5 sm:gap-2 truncate px-2">
                                    <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-htb-green animate-pulse flex-shrink-0" />
                                    <span className="font-share-tech font-bold text-[13px] sm:text-base md:text-lg tracking-[0.15em] sm:tracking-[0.22em] text-htb-green uppercase truncate">
                                        Recruitment &apos;26
                                    </span>
                                </div>
                                <span className="text-[9px] sm:text-xs md:text-sm text-white font-bold font-share-tech tracking-wider flex-shrink-0">htb@srmist</span>
                            </div>

                            {/* Terminal body */}
                            <div className="px-5 py-4 md:px-7 md:py-6 font-poppins text-[14px] md:text-base leading-[1.85] space-y-3 md:space-y-4">
                                <p className="text-white">
                                    The same old routine on loop and a constant desire to start
                                    new chapters in your life?
                                </p>
                                <p className="text-white">
                                    Don&apos;t know where or how to begin?
                                </p>
                                <p className="text-white">
                                    Join <span className="font-bold text-white">HackTheBox SRMIST</span> today for a chance to experience and
                                    discover something new. Come join our passionate team driven
                                    by black coffee and lack of sleep.
                                </p>
                                <div className="font-share-tech text-htb-green tracking-wide text-[15px] md:text-[17px] min-h-[44px] sm:min-h-[20px] md:min-h-[24px] leading-relaxed">
                                    <span>{typedText}</span>
                                    <span className="inline-block w-[7px] h-[15px] md:h-[17px] bg-htb-green ml-1 animate-pulse align-middle" style={{ transform: "translateY(-1px)" }} />
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={() => setOpen(true)}
                            className="mt-8 group relative px-8 py-3.5 font-poppins font-bold text-base tracking-[0.1em] uppercase text-htb-green bg-transparent border-2 border-htb-green active:scale-95 transition-all duration-300 overflow-hidden rounded-md"
                            style={{ boxShadow: "0 0 15px rgba(159,239,0,0.25)" }}
                            onMouseEnter={e => (e.currentTarget.style.boxShadow = "0 0 25px rgba(159,239,0,0.5)")}
                            onMouseLeave={e => (e.currentTarget.style.boxShadow = "0 0 15px rgba(159,239,0,0.25)")}
                        >
                            {/* Filled background by default, slides down on hover */}
                            <div className="absolute inset-0 bg-htb-green translate-y-0 group-hover:translate-y-[100%] transition-transform duration-300 ease-in-out" />
                            
                            <span className="relative z-10 flex items-center justify-center gap-2.5 text-black group-hover:text-htb-green transition-colors duration-300">
                                <span className="font-share-tech font-bold text-[18px] opacity-80 group-hover:opacity-100 transition-opacity">&lt;</span>
                                <span>Apply Now</span>
                                <span className="font-share-tech font-bold text-[18px] opacity-80 group-hover:opacity-100 transition-opacity">/&gt;</span>
                            </span>
                        </button>
                    </div>

                    {/* Right: Poster */}
                    <div className="flex-shrink-0 flex justify-center">
                        <img
                            src="https://ik.imagekit.io/htbsrmist/Recruitments/Rec_25-26.png?updatedAt=1755971078244"
                            alt="Recruitment Poster"
                            className="h-[480px] md:h-[560px] w-auto object-contain rounded-xl"
                        />
                    </div>

                </div>
            </div>

            {/* ── Modal ── */}
            <Modal open={open} onClose={() => setOpen(false)}>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                    <Field label="Registration Number" required error={errors.usn}>
                        <input
                            name="usn"
                            type="text"
                            required
                            value={usn}
                            placeholder="RAXXXXXXXXXXXXX"
                            onChange={(e) => setUsn(e.target.value)}
                            onBlur={handleBlur}
                            className={inputClass(!!errors.usn)}
                        />
                    </Field>

                    <Field label="Full Name" required>
                        <input
                            name="name"
                            type="text"
                            required
                            value={name}
                            placeholder="Your full name"
                            onChange={(e) => setName(e.target.value)}
                            className={inputClass()}
                        />
                    </Field>

                    <Field label="SRM Email" required error={errors.email}>
                        <input
                            name="email"
                            type="email"
                            required
                            value={email}
                            placeholder="netid@srmist.edu.in"
                            onChange={(e) => setEmail(e.target.value)}
                            onBlur={handleBlur}
                            className={inputClass(!!errors.email)}
                        />
                    </Field>

                    <Field label="Phone Number" required error={errors.phone}>
                        <input
                            name="phone"
                            type="tel"
                            required
                            value={phone}
                            placeholder="10-digit mobile number"
                            onChange={(e) => setPhone(e.target.value)}
                            onBlur={handleBlur}
                            className={inputClass(!!errors.phone)}
                        />
                    </Field>

                    <DomainPicker
                        label="First Domain Preference"
                        required
                        value={domain1}
                        onChange={(v) => { setDomain1(v); setErrors(p => ({ ...p, domain: "" })); }}
                        error={errors.domain}
                    />

                    <DomainPicker
                        label="Second Domain (Optional)"
                        value={domain2}
                        onChange={(v) => { setDomain2(v); setErrors(p => ({ ...p, domain: "" })); }}
                    />

                    <Field label="LinkedIn Profile" required>
                        <input
                            name="linkedin"
                            type="text"
                            required
                            value={linkedin}
                            placeholder="linkedin.com/in/yourprofile"
                            onChange={(e) => setLinkedin(e.target.value)}
                            className={inputClass()}
                        />
                    </Field>

                    <Field label="Portfolio / Additional Link (Optional)">
                        <input
                            name="additionalLink"
                            type="text"
                            value={additionalLink}
                            placeholder="portfolio site / github / hackthebox / behance"
                            onChange={(e) => setAdditionalLink(e.target.value)}
                            className={inputClass()}
                        />
                    </Field>

                    <Field label="Resume Link (Optional)">
                        <input
                            name="resume"
                            type="text"
                            value={resume}
                            placeholder="drive.google.com/..."
                            onChange={(e) => setResume(e.target.value)}
                            className={inputClass()}
                        />
                    </Field>

                    <div className="pt-2 flex flex-col gap-3">
                        <button
                            type="submit"
                            disabled={submitting}
                            className="w-full py-2.5 bg-[#9FEF00] text-[#0d1117] text-sm font-semibold rounded-md hover:bg-[#b8f520] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {submitting ? "Submitting..." : "Submit Application"}
                        </button>
                        <p className="text-xs text-center text-[#6e7681]">
                            Fields marked with <span className="text-[#9FEF00]">*</span> are required.
                        </p>
                    </div>
                </form>
            </Modal>
        </>
    );
};

export default Recruitment;
