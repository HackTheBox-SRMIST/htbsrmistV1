import React, { useState } from "react";
import { Input } from "@nextui-org/react";
import Select from "react-select";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GiCrossMark } from "react-icons/gi";
import axios from "axios";

interface CertificateModalProps {
    isOpen: boolean;
    onClose: () => void;
    slug?: string;
    options: { value: string; label: string }[];
}

const styles = {
    option: (provided: any, state: any) => ({
        ...provided,
        fontWeight: state.isSelected ? "bold" : "normal",
        color: "black",
        background: "#cccccc",
        fontSize: state.selectProps.myFontSize,
        "&:hover": {
            background: "#9FEF00"
        }
    }),
    control: (base: any, state: any) => ({
        ...base,
        background: "#9FEF00",
        fontWeight: state.isSelected ? "bold" : "normal",
        borderColor: state.isFocused ? "#9FEF00" : "#9FEF00",
        borderRadius: "0px 20px 20px 0px",
        height: "70px",
        width: "100%",
        boxShadow: state.isFocused ? null : null,
        "&:hover": {
            borderColor: state.isFocused ? "#000000" : "",
            borderWidth: state.isFocused ? "1.5px" : ""
        }
    })
};

const CertificateModal: React.FC<CertificateModalProps> = ({
    isOpen,
    onClose,
    slug,
    options
}) => {
    const [email, setEmail] = useState("");
    const [certificate, setCertificate] = useState<string | null>(null);
    const [type, setType] = useState("Please Select...");
    const [loadingCertificate, setLoadingCertificate] = useState(false);

    if (!isOpen) return null;

    const Toast = (success: boolean, message: string) => {
        toast[success ? "success" : "error"](message, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark"
        });
    };

    const fetchCertificate = async () => {
        if (!email) {
            Toast(false, "Please enter your registered email");
            return;
        }
        if (type === "Please Select...") {
            Toast(false, "Please select a certificate type");
            return;
        }
        try {
            const lowercaseEmail = email.toLowerCase().trim();
            setLoadingCertificate(true);
            const values = {
                email: lowercaseEmail,
                type: type.toLowerCase().trim(),
                event: slug
            };
            const response = await axios.post(`/api/v1/certificates`, values);
            setCertificate(response.data.certificate);
            Toast(true, "Certificate Generated Successfully");
        } catch (err: any) {
            Toast(false, `${err.response?.data?.error || "An error occurred"}`);
        } finally {
            setLoadingCertificate(false);
        }
    };

    const handleClose = () => {
        setCertificate(null);
        setEmail("");
        setType("Please Select...");
        onClose();
    };

    return (
        <div className="fixed inset-0 z-[100] text-white flex justify-center items-center backdrop-blur-xl">
            <div className="w-[90%] lg:w-[500px] bg-white text-black p-7 rounded-3xl flex flex-col gap-5 relative ">
                <ToastContainer />
                <div
                    className="absolute top-5 right-5 w-7 hover:cursor-pointer hover:text-red-600"
                    onClick={handleClose}
                >
                    <GiCrossMark className="w-full h-full" />
                </div>
                <p className="text-xl max-md:text-base">
                    Please enter your registered E-Mail
                </p>
                <Input
                    type="email"
                    clearable
                    bordered
                    fullWidth
                    color="primary"
                    size="lg"
                    placeholder="Email"
                    onChange={(event: any) => setEmail(event.target.value)}
                />
                {certificate ? (
                    <a
                        className="w-full bg-htb-green/50 hover:bg-htb-green py-2 font-normal rounded-full p-8 text-xl text-center"
                        href={certificate}
                        download="Certificate.png"
                    >
                        Download Now
                    </a>
                ) : (
                    <div className="flex space-evenly justify-center">
                        <button
                            onClick={fetchCertificate}
                            disabled={loadingCertificate}
                            className={`w-1/2 bg-htb-green hover:bg-htb-green/50 py-1 rounded-l-[20px] font-normal p-8 text-xl max-md:text-sm flex items-center justify-center gap-2 cursor-pointer transition-all ${
                                loadingCertificate
                                    ? "opacity-50 cursor-not-allowed"
                                    : ""
                            }`}
                        >
                            {loadingCertificate && (
                                <svg
                                    className="animate-spin h-5 w-5 text-black"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    />
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    />
                                </svg>
                            )}
                            <span>
                                {loadingCertificate
                                    ? "Generating..."
                                    : "Generate Certificate"}
                            </span>
                        </button>
                        <div className=" max-md:w-2/3 text-xl max-md:text-lg mt-0 border-l-[1px] border-l-black">
                            <Select
                                autoFocus
                                hideSelectedOptions={true}
                                isClearable={false}
                                isSearchable={false}
                                placeholder={type}
                                theme={(theme) => ({
                                    ...theme,
                                    colors: {
                                        ...theme.colors,
                                        neutral50: "#000000"
                                    }
                                })}
                                tabSelectsValue={false}
                                name="preference1"
                                className="text-black w-full rounded-full"
                                options={options}
                                onChange={(e: any) => setType(e.value)}
                                styles={styles}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CertificateModal;
