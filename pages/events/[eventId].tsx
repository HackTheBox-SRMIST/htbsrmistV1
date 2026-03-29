// import type { NextPage, GetServerSidePropsResult } from "next";
// import React, { useState } from "react";
// import { Modal, Input, Radio } from "@nextui-org/react";
// import Select from "react-select";
// import CreatableSelect from "react-select/creatable";

// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import { useRouter } from "next/router";
// import LocationLogo from "../../utils/icons/LocationLogo";
// import EntryFees from "../../utils/icons/EntryFees";
// import DateLogo from "../../utils/icons/DateLogo";
// import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { GiCrossMark } from "react-icons/gi";
// import Image from "next/image";
// // interface EventProps {
// //     event_name: string;
// //     event_description: string;
// //     poster_url: string;
// //     speakers_details: [
// //         {
// //             name: string;
// //             designation: string;
// //             details: string;
// //             image: string;
// //         }
// //     ];
// //     event_date: Date;
// //     is_active: boolean;
// //     venue: string;
// //     sponsors_details: [
// //         {
// //             name: string;
// //             place: string;
// //             details: string;
// //         }
// //     ];
// //     duration: Number;
// //     prerequisites: string[];
// //     cost: number;
// //     gallery: [
// //         "https://ik.imagekit.io/htbsrmist/Events/zero_day.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1674281897886"
// //     ];
// //     registration_url: string;
// //     database: string;
// //     slug: string;
// // }


// interface EventProps {
//     event_name: string;
//     event_description: string;
//     poster_url: string;
//     speakers_details: [
//         {
//             name: string;
//             designation: string;
//             details: string;
//             image: string;
//         }
//     ];
//     event_date: Date;
//     is_active: boolean;
//     venue: string;
//     sponsors_details: [
//         {
//             name: string;
//             place: string;
//             details: string;
//         }
//     ];
//     duration: Number;
//     prerequisites: string[];
//     cost: number;
//     gallery: [
//         "https://ik.imagekit.io/htbsrmist/Events/zero_day.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1674281897886"
//     ];
//     registration_url: string;
//     database: string;
//     slug: string;

//     // ADD THIS
//     certificate: {
//         [key: string]: string | undefined;
//     };
// }

// interface EventsPageProps {
//     events: EventProps[];
// }

// // No need
// // const options = [
// //     { value: "participants", label: "Participant" },
// //     { value: "volunteers", label: "Volunteer" },
// //     { value: "organizers", label: "Organizer" },
// //     { value: "crypto", label: "Crypto" },
// //     { value: "forensics", label: "Forensics" },
// //     { value: "web-expl", label: "Web Exploitation" },
// //     { value: "reverse-engineering", label: "Reverse Engineering" },
// // ];

// const styles = {
//     // control: (base: any, state: any) => ({
//     //     ...base,
//     //     border: "1px solid black",
//     //     boxShadow: "none",
//     //     "&:hover": {
//     //         border: "1px solid black"
//     //     }
//     // }),
//     option: (provided: any, state: any) => ({
//         ...provided,
//         fontWeight: state.isSelected ? "bold" : "normal",
//         color: "black",
//         background: "#cccccc",
//         fontSize: state.selectProps.myFontSize,

//         "&:hover": {
//             background: "#9FEF00"
//         }
//     }),
//     control: (base: any, state: any) => ({
//         ...base,
//         background: "#9FEF00",
//         fontWeight: state.isSelected ? "bold" : "normal",
//         borderColor: state.isFocused ? "#9FEF00" : "#9FEF00",
//         borderRadius: "0px 20px 20px 0px",
//         height: "70px",
//         width: "100%",
//         boxShadow: state.isFocused ? null : null,
//         "&:hover": {
//             borderColor: state.isFocused ? "#000000" : "",
//             borderWidth: state.isFocused ? "1.5px" : ""
//         }
//     })
// };

// const Toast = (success: any, message: any) => {
//     toast[success ? "success" : "error"](message, {
//         position: "top-center",
//         autoClose: 5000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//         theme: "dark"
//     });
// };

// const url_root =
//   process.env.VERCEL_URL
//     ? `https://${process.env.VERCEL_URL}`
//     : "http://localhost:3000";

// const Event: NextPage<EventsPageProps> = ({ events }) => {
//     const router = useRouter();
//     const eventId = router.query.eventId as string;
//     const event = events.find((event) => event.event_name === eventId);
//     // const event = events.find((event) => event.slug === eventId);
//     const slug = event?.slug;
//     const registrationUrl = event?.registration_url?.trim();
//     const hasExternalRegistration = Boolean(registrationUrl);
//     const isRegistrationActive = Boolean(event?.is_active);

//     const [email, setEmail] = useState("");
//     const [certificate, setCertificate] = useState(null);
//     const [type, setType] = useState("Please Select...");
//     const [visible, setVisible] = React.useState(false);
//     const [loadingCertificate, setLoadingCertificate] = useState(false);
//     const [nameError, setNameError] = React.useState(false);
//     const [emailError, setEmailError] = React.useState(false);
//     const [phoneError, setPhoneError] = React.useState(false);

//     const [loadingSubmit, setLoadingSubmit] = useState(false);

//     const handler = () => {
//         setVisible(!visible);
//         if (typeof window != "undefined" && window.document) {
//             document.body.style.overflow = "hidden";
//         }
//         window.scrollTo({
//             top: 0
//         });
//     };

//     const options = event?.certificate
//     ? Object.entries(event.certificate)
//         .filter(([_, url]) => url && url.trim() !== "")
//         .map(([key]) => ({
//             value: key,
//             label: key
//                 .split("-")
//                 .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
//                 .join(" ")
//         }))
//     : [];

//     // Old 

//     // const fetchCertificate = async () => {
//     //     try {
//     //         const lowercaseEmail = email.toLowerCase();
//     //         setLoadingCertificate(true);
//     //         const values = { email: lowercaseEmail, type, event: slug };
//     //         // console.log(values);
//     //         const response = await axios.post(`/api/v1/certificates`, values);
//     //         setCertificate(response.data.certificate);
//     //         Toast(true, "Certificate Generated Successfully");
//     //     } catch (err: any) {
//     //         // Access the correct error response field
//     //         Toast(false, `${err.response?.data?.error || "An error occurred"}`);
//     //     } finally {
//     //         setLoadingCertificate(false);
//     //     }
//     // };

//     const fetchCertificate = async () => {
//         if (!email) {
//             Toast(false, "Please enter your registered email");
//             return;
//         }
//         if (type === "Please Select...") {
//             Toast(false, "Please select a certificate type");
//             return;
//         }
//         try {
//             const lowercaseEmail = email.toLowerCase();
//             setLoadingCertificate(true);
//             const values = { email: lowercaseEmail, type: type.toLowerCase(), event: slug };
//             const response = await axios.post(`/api/v1/certificates`, values);
//             setCertificate(response.data.certificate);
//             Toast(true, "Certificate Generated Successfully");
//         } catch (err: any) {
//             Toast(false, `${err.response?.data?.error || "An error occurred"}`);
//         } finally {
//             setLoadingCertificate(false);
//         }
//     };

//     const changeType = (e: any) => {
//         setType(e.value);
//     };

//     const closeHandler = () => {
//         setVisible(false);
//         setCertificate(null);
//         setEmail("");
//         setType("Please Select...");
//         document.body.style.overflow = "unset";
//     };

//     const settings = {
//         className: "center",
//         centerMode: true,
//         infinite: true,
//         centerPadding: "60px",
//         slidesToShow: 3,
//         speed: 500,
//         responsive: [
//             {
//                 breakpoint: 1024, // screens larger than 1024px
//                 settings: {
//                     slidesToShow: 3,
//                     centerPadding: "50px"
//                 }
//             },
//             {
//                 breakpoint: 768, // screens between 768px and 1024px
//                 settings: {
//                     slidesToShow: 2,
//                     centerPadding: "30px"
//                 }
//             },
//             {
//                 breakpoint: 480, // screens smaller than 768px
//                 settings: {
//                     slidesToShow: 1,
//                     centerPadding: "10px"
//                 }
//             }
//         ]
//     };

//     const handlerReg = () => setVisibleReg(true);
//     const closeHandlerReg = () => {
//         setVisibleReg(false);
//     };
//     const [visibleReg, setVisibleReg] = React.useState(false);
//     const [checked, setChecked] = React.useState("");
//     // const [usn, setUsn] = useState("");

//     // const changeUsnHandler =async (e: any) => {
//     //     if(usn.length === 15) {

//     //     }
//     //     setUsn(e.target.value);
//     // };
//     const submitHandler = async (events: React.ChangeEvent<any>) => {
//         const str2bool = (value: string) => {
//             if (value && typeof value === "string") {
//                 if (value.toLowerCase() === "true") return true;
//                 if (value.toLowerCase() === "false") return false;
//             }
//             return value;
//         };

//         const isSrmite = str2bool(events.target.isSrmite.value);
//         events.preventDefault();

//         try {
//             const name = events.target.name.value;
//             if (name.length > 20) {
//                 Toast(false, "Name cannot exceed 20 characters");
//                 return;
//             }
//             const email = events.target.email.value;
//             const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//             if (!emailRegex.test(email)) {
//                 Toast(false, "Invalid email");
//                 return;
//             }
//             const phone = events.target.phn.value;
//             const phoneRegex = /^\d{10}$/;
//             if (!phoneRegex.test(phone)) {
//                 Toast(false, "Invalid phone number");
//                 return;
//             }
//             const body = {
//                 usn: events.target.usn.value,
//                 phn: events.target.phn.value,
//                 name: events.target.name.value,
//                 email: events.target.email.value.toLowerCase(),
//                 dept: events.target.dept.value,
//                 isSrmite: isSrmite,
//                 event_name: event?.event_name
//             };
//             console.log(body);

//             const response = await axios.post(
//                 `/api/v1/events/registration`,
//                 body
//             );
//             const result = await response.data.message;
//             // console.log(result);

//             // events.target.usn.value =
//             Toast(true, result);
//         } catch (err: any) {
//             Toast(false, `${err.response.data.message}`);
//         } finally {
//             setLoadingSubmit(false);
//         }
//     };

//     return (
//         <>
//             <div className="suMain py-10">
//                 <div className="mx-auto w-[90%] max-w-7xl font-share-tech px-6">
//                     <div className=" rounded-2xl flex flex-col md:flex-row">
//                         <div className="md:w-1/2 w-full flex items-center justify-center p-4">
//                             <div className="border-[2px] border-htb-green rounded-2xl p-2">
//                                 <img
//                                     src={event?.poster_url}
//                                     alt="Event Poster"
//                                     className="max-w-full max-h-[450px] object-contain"
//                                 />
//                             </div>
//                         </div>
//                         <div className="md:w-1/2 w-full md:mr-16 text-white flex flex-col items-center justify-center p-6 space-y-5">
//                             <h1 className="text-htb-green font-bold text-4xl md:text-5xl text-center">
//                                 {event?.event_name}
//                             </h1>
//                             <div className="loc bg-[#141D2B] text-white flex flex-row items-center space-x-4 p-4 w-full md:w-96 rounded-xl">
//                                 <div className="lgo flex items-center justify-center">
//                                     <img
//                                         src="/locationLogo.svg"
//                                         alt="Location Logo"
//                                         className="h-6 w-6 md:h-8 md:w-8"
//                                     />
//                                 </div>
//                                 <div className="txt w-full">
//                                     <p className="text-xl md:text-2xl font-semibold break-words">
//                                         {event?.venue}
//                                     </p>
//                                 </div>
//                             </div>

//                             <div className="des bg-[#141D2B] text-white space-x-4 flex flex-row justify-start pl-5 pt-1 w-full md:w-96 h-[54px] rounded-xl">
//                                 <div className="lgo mt-1">
//                                     <img
//                                         src="/desLogo.svg"
//                                         alt="Description Logo"
//                                     />
//                                 </div>
//                                 <div className="txt">
//                                     <p className="ml-4 text-white text-xl md:text-2xl mt-[6px] font-semibold">
//                                         {event?.cost === 0
//                                             ? "Free of Cost"
//                                             : `${event?.cost}/-`}
//                                     </p>
//                                 </div>
//                             </div>
//                             <div className="date bg-[#141D2B] text-white space-x-4 flex flex-row justify-start pl-5 pt-1 w-full md:w-96 h-[54px] rounded-xl">
//                                 <div className="lgo mt-1">
//                                     <img src="/dateLogo.svg" alt="Date Logo" />
//                                 </div>
//                                 <div className="txt">
//                                     <p className="ml-4 text-white text-xl md:text-2xl mt-[6px] font-semibold">
//                                         {event?.event_date}
//                                     </p>
//                                 </div>
//                             </div>
//                             {hasExternalRegistration ? (
//                                 <a
//                                     href={registrationUrl}
//                                     target="_blank"
//                                     rel="noopener noreferrer"
//                                     aria-disabled={!isRegistrationActive}
//                                     className={`bg-htb-green w-full md:w-80 text-node-black font-bold text-center py-3 text-2xl rounded-2xl ${!isRegistrationActive
//                                         ? "pointer-events-none opacity-60"
//                                         : ""
//                                         }`}
//                                 >
//                                     Register Now
//                                 </a>
//                             ) : (
//                                 <button
//                                     className={`bg-htb-green w-full md:w-80 text-node-black font-bold text-center py-3 text-2xl rounded-2xl ${!isRegistrationActive
//                                         ? "opacity-60"
//                                         : ""
//                                         }`}
//                                     disabled={!isRegistrationActive}
//                                     onClick={handlerReg}
//                                 >
//                                     Register Now
//                                 </button>
//                             )}
//                             <Modal
//                                 className="bg-htb-green"
//                                 closeButton
//                                 blur
//                                 aria-labelledby="modal-title"
//                                 open={visibleReg}
//                                 onClose={closeHandlerReg}
//                             >
//                                 <Modal.Body className="flex justify-center items-center font-mono">
//                                     <ToastContainer />

//                                     <p className="text-3xl font-bold max-md:text-2xl">
//                                         Registration Form
//                                     </p>
//                                     <p>Please enter your Details</p>
//                                     <form
//                                         onSubmit={submitHandler}
//                                         className=" gap-5 flex-col flex w-full"
//                                     >
//                                         <Input
//                                             required
//                                             type="text"
//                                             name="name"
//                                             clearable
//                                             bordered
//                                             fullWidth
//                                             color="primary"
//                                             size="lg"
//                                             placeholder="Name"
//                                             maxLength={21}
//                                             // helperText="Name cannot exceed 20 characters"
//                                             helperColor="error"
//                                             status={
//                                                 nameError ? "error" : "default"
//                                             }
//                                             onChange={(e) => {
//                                                 const value = e.target.value;
//                                                 if (value.length > 20) {
//                                                     setNameError(true);
//                                                     Toast(
//                                                         false,
//                                                         "Name cannot exceed 20 characters"
//                                                     );
//                                                 } else {
//                                                     setNameError(false);
//                                                 }
//                                             }}
//                                         />
//                                         <Input
//                                             required
//                                             type="number"
//                                             name="phn"
//                                             clearable
//                                             bordered
//                                             fullWidth
//                                             color="primary"
//                                             size="lg"
//                                             placeholder="Phone Number"
//                                             helperColor="error"
//                                             status={
//                                                 phoneError ? "error" : "default"
//                                             }
//                                             onChange={(e) => {
//                                                 const value = e.target.value;
//                                                 if (value.length > 11) {
//                                                     e.target.value =
//                                                         value.slice(0, 11);
//                                                 }
//                                                 setPhoneError(
//                                                     value.length !== 10
//                                                 );
//                                                 if (value.length === 11) {
//                                                     Toast(
//                                                         false,
//                                                         "Phone Number cannot exceed 10 digits"
//                                                     );
//                                                 }
//                                             }}
//                                         />
//                                         <Input
//                                             required
//                                             type="text"
//                                             name="usn"
//                                             clearable
//                                             bordered
//                                             fullWidth
//                                             color="primary"
//                                             size="lg"
//                                             placeholder="Registration Number"
//                                         // onChange={
//                                         //     changeUsnHandler
//                                         // }
//                                         />
//                                         <Input
//                                             required
//                                             type="email"
//                                             name="email"
//                                             clearable
//                                             bordered
//                                             fullWidth
//                                             color="primary"
//                                             size="lg"
//                                             placeholder="Email"
//                                             helperColor="error"
//                                             status={
//                                                 emailError ? "error" : "default"
//                                             }
//                                             onChange={(e) => {
//                                                 const value = e.target.value;
//                                                 const emailRegex =
//                                                     /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//                                                 if (!emailRegex.test(value)) {
//                                                     setEmailError(true);
//                                                 } else {
//                                                     setEmailError(false);
//                                                 }
//                                             }}
//                                         />

//                                         <Input
//                                             required
//                                             type="text"
//                                             name="dept"
//                                             clearable
//                                             bordered
//                                             fullWidth
//                                             color="primary"
//                                             size="lg"
//                                             placeholder="Department"
//                                         />
//                                         <Radio.Group
//                                             isRequired
//                                             value={checked}
//                                             onChange={setChecked}
//                                             name="isSrmite"
//                                             orientation="horizontal"
//                                         >
//                                             <div className="flex justify-around">
//                                                 <Radio
//                                                     value="true"
//                                                     color="success"
//                                                 >
//                                                     SRMite
//                                                 </Radio>
//                                                 <Radio
//                                                     value="false"
//                                                     color="success"
//                                                 >
//                                                     Non-SRMite
//                                                 </Radio>
//                                             </div>
//                                         </Radio.Group>
//                                         <p className="text-center font-extra-bold">
//                                             Check us out on {""}
//                                             <a
//                                                 href="https://www.meetup.com/chennai-in/"
//                                                 className=" text-black text-xl hover:text-[#F74160] font-bold"
//                                             >
//                                                 MEETUP
//                                             </a>
//                                         </p>
//                                         <button
//                                             type="submit"
//                                             className="w-full bg-htb-green/50 hover:bg-htb-green py-2 font-normal text-lg rounded-lg"
//                                             disabled={loadingSubmit}
//                                         >
//                                             {loadingSubmit
//                                                 ? "Submitting..."
//                                                 : "SUBMIT"}{" "}
//                                         </button>
//                                     </form>
//                                 </Modal.Body>
//                             </Modal>

//                             <button
//                                 className="bg-htb-green w-full md:w-80 text-node-black font-bold text-center py-3 text-2xl rounded-2xl"
//                                 onClick={handler}
//                                 disabled={event?.is_active}
//                             >
//                                 Get Certificate
//                             </button>
//                             {visible ? (
//                                 <div className="absolute top-0 left-0 w-screen h-screen text-white flex justify-center items-center backdrop-blur-xl">
//                                     <div className="w-[90%] lg:w-[500px] bg-white text-black z-50 p-7  rounded-3xl flex flex-col gap-5 relative ">
//                                         <ToastContainer />
//                                         <div
//                                             className="absolute top-5 right-5 w-7 hover:cursor-pointer hover:text-red-600"
//                                             onClick={closeHandler}
//                                         >
//                                             <GiCrossMark className="w-full h-full" />
//                                         </div>
//                                         <p className="text-xl max-md:text-base">
//                                             Please enter your registered E-Mail
//                                         </p>
//                                         <Input
//                                             type="email"
//                                             clearable
//                                             bordered
//                                             fullWidth
//                                             color="primary"
//                                             size="lg"
//                                             placeholder="Email"
//                                             onChange={(event: any) =>
//                                                 setEmail(event.target.value)
//                                             }
//                                         />

//                                         {certificate ? (
//                                             <a
//                                                 className="w-full bg-htb-green/50 hover:bg-htb-green py-2 font-normal rounded-full  p-8 text-xl text-center"
//                                                 href={certificate}
//                                                 download="Certificate.png"
//                                             >
//                                                 Download Now
//                                             </a>
//                                         ) : (
//                                             <div className="flex space-evenly justify-center">
//                                                 <button
//                                                     onClick={fetchCertificate}
//                                                     disabled={
//                                                         loadingCertificate ||
//                                                         type ===
//                                                         "Please Select..."
//                                                     }
//                                                     className={`w-1/2 bg-htb-green hover:bg-htb-green/50 py-1 rounded-l-[20px] font-normal p-8 text-xl max-md:text-sm ${loadingCertificate
//                                                         ? "opacity-50 cursor-not-allowed"
//                                                         : ""
//                                                         }`}
//                                                 >
//                                                     {loadingCertificate
//                                                         ? "Generating..."
//                                                         : "Generate Certificate"}
//                                                 </button>
//                                                 <div className=" max-md:w-2/3 text-xl max-md:text-lg mt-0  border-l-[1px] border-l-black">
//                                                     <Select
//                                                         autoFocus
//                                                         hideSelectedOptions={
//                                                             true
//                                                         }
//                                                         isClearable={false}
//                                                         isSearchable={false}
//                                                         placeholder={type}
//                                                         theme={(theme) => ({
//                                                             ...theme,
//                                                             colors: {
//                                                                 ...theme.colors,
//                                                                 neutral50:
//                                                                     "#000000" // Placeholder color
//                                                             }
//                                                         })}
//                                                         tabSelectsValue={false}
//                                                         name="preference1"
//                                                         className="text-black w-full rounded-full"
//                                                         options={options}
//                                                         onChange={changeType}
//                                                         styles={styles}
//                                                     />
//                                                 </div>
//                                             </div>
//                                         )}
//                                     </div>
//                                 </div>
//                             ) : null}
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             <div className="eventText text-white px-4 sm:px-8 md:px-16 lg:px-64 text-2xl sm:text-3xl md:text-4xl font-medium font-share-tech">
//                 {event?.event_description}
//             </div>
//             <div className="speaker mt-10 font-share-tech text-center">
//                 <p className="text-htb-green text-3xl md:text-6xl font-bold">
//                     Know Our Guest
//                 </p>

//                 <div
//                     className={`spkr mt-8 px-4 md:px-16 lg:px-32 grid gap-6 ${(event?.speakers_details?.length ?? 0) <= 2
//                         ? "grid-cols-1 sm:grid-cols-2 justify-center"
//                         : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
//                         }`}
//                 >
//                     {event?.speakers_details?.map((guest, index) => (
//                         <div
//                             key={index}
//                             className={`flex flex-col items-center bg-[#141D2B] hover:bg-[#1f2c42] rounded-xl border-2 border-htb-green p-6 shadow-lg w-full max-w-xs mx-auto ${!guest.image ? "justify-center h-full" : ""
//                                 }`}
//                         >
//                             {guest.image && (
//                                 <div className="w-full h-48 rounded-xl overflow-hidden flex items-center justify-center">
//                                     <Image
//                                         src={guest.image}
//                                         alt={guest.name}
//                                         width={250}
//                                         height={250}
//                                         className="object-cover rounded-xl"
//                                     />
//                                 </div>
//                             )}
//                             <div className="speakerInfo text-center mt-4">
//                                 <p className="text-lg md:text-xl font-bold text-htb-green">
//                                     {guest.name}
//                                 </p>
//                                 <p className="text-sm md:text-base text-white px-4">
//                                     {guest.designation}
//                                 </p>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </div>

//             <div className="prereq font-share-tech mb-10">
//                 <p className="text-htb-green text-3xl sm:text-4xl md:text-5xl font-bold text-center my-6">
//                     Pre-Requisites
//                 </p>

//                 <div className="text-white px-4 sm:px-8 md:px-16 lg:px-64 text-xl sm:text-2xl md:text-3xl font-medium">
//                     <ul className="list-disc list-inside">
//                         {event?.prerequisites?.map((item, index) => (
//                             <li key={index}>{item}</li>
//                         ))}
//                     </ul>
//                 </div>
//             </div>

//             {/*


//             <div className="flex-col px-4 lg:mx-20 mx-auto lg:px-10 items-center md:pr-0 font-mono">
//                 <div className="md:h-screen flex flex-col md:flex-row items-center justify-center md:gap-14 lg:gap-24">
//                     <div className="w-full md:w-1/2">
//                         <div className="mb-4 text-center md:text-left">
//                             <h1 className="text-white text-3xl font-do-hyeon underline underline-offset-8 decoration-double sm:no-underline justify-self-auto ml-6 lg:ml-0 md:mt-[350px] lg:mt-0 sm:text-5xl  font-semibold ">
//                                 {event?.event_name} 
//                             </h1>

//                             <p className="text-white sm:text-xl mt-6 text-justify md:ml-10 lg:ml-0 md:text-left text-sm ">
//                                 {event?.event_description}. <br />
//                                 <br />
//                             </p>
//                         </div>
//                         <div>
//                             <div className="rounded-3xl sm:ml-0 sm:px-0 bg-[#181818] ">
//                                 <div className="grid grid-cols-3 divide-x bg-hacker-grey py-2 rounded-md space-x-1 md:space-x-3 divide-solid lg:mx-0">
//                                     <div className="flex justify-evenly md:flex-row flex-col space-y-2 items-center">
//                                         <span className="w-8">
//                                             <LocationLogo />
//                                         </span>
//                                         <div className="text-center">
//                                             <h4 className="text-black font-bold text-sm uppercase ">
//                                                 Location
//                                             </h4>
//                                             <p className="whitespace-normal">
//                                                 {event?.venue}
//                                             </p>
//                                         </div>
//                                     </div>

//                                     <div className="flex justify-evenly md:flex-row flex-col pl-2 items-center">
//                                         <span className="w-8">
//                                             <EntryFees />
//                                         </span>
//                                         <div className="text-center">
//                                             <h4 className="text-black font-bold text-sm uppercase">
//                                                 Price
//                                             </h4>
//                                             {(() => {
//                                                 let price = [];
//                                                 if (event?.cost == 0) {
//                                                     price.push(
//                                                         <p>Free of Cost</p>
//                                                     );
//                                                 } else {
//                                                     price.push(
//                                                         <p>{event?.cost}/-</p>
//                                                     );
//                                                 }
//                                                 return price;
//                                             })()}
//                                         </div>
//                                     </div>
//                                     <div className="flex justify-evenly md:flex-row flex-col pl-2 items-center">
//                                         <span className="w-8">
//                                             <DateLogo />
//                                         </span>
//                                         <div className="text-center">
//                                             <h4 className="text-black font-bold text-sm uppercase">
//                                                 Date
//                                             </h4>
//                                             <p>{event?.event_date}</p>
//                                         </div>
//                                     </div>
//                                 </div>
//                                 <div className="flex flex-col items-center justify-evenly md:flex-row ">
//                                     <div>
//                                         <button
//                                             className="bg-htb-green  px-3 py-3 font-semibold rounded-md inline-block mt-6 "
//                                             disabled={!event?.is_active}
//                                             onClick={handlerReg}
//                                         >
//                                             REGISTER NOW
//                                         </button>
//                                         <Modal
//                                             className="bg-htb-green"
//                                             closeButton
//                                             blur
//                                             aria-labelledby="modal-title"
//                                             open={visibleReg}
//                                             onClose={closeHandlerReg}
//                                         >
//                                             <Modal.Body className="flex justify-center items-center font-mono">
//                                                 <ToastContainer />

//                                                 <p className="text-3xl font-bold max-md:text-2xl">
//                                                     Registration Form
//                                                 </p>
//                                                 <p>Please enter your Details</p>
//                                                 <form
//                                                     onSubmit={submitHandler}
//                                                     className=" gap-5 flex-col flex w-full"
//                                                 >
//                                                     <Input
//                                                         required
//                                                         type="text"
//                                                         name="name"
//                                                         clearable
//                                                         bordered
//                                                         fullWidth
//                                                         color="primary"
//                                                         size="lg"
//                                                         placeholder="Name"
//                                                         maxLength={21}
//                                                         // helperText="Name cannot exceed 20 characters"
//                                                         helperColor="error"
//                                                         status={nameError ? "error" : "default"}
//                                                         onChange={(e) => {
//                                                             const value = e.target.value;
//                                                             if (value.length > 20) {
//                                                                 setNameError(true);
//                                                                 Toast(false, "Name cannot exceed 20 characters");
//                                                             } else {
//                                                                 setNameError(false);
//                                                             }
//                                                         }}
//                                                     />
//                                                     <Input
//                                                         required
//                                                         type="text"
//                                                         name="phn"
//                                                         clearable
//                                                         bordered
//                                                         fullWidth
//                                                         color="primary"
//                                                         size="lg"
//                                                         placeholder="Phone Number"
//                                                         // onChange={
//                                                         //     changeUsnHandler
//                                                         // }
//                                                     />
//                                                     <Input
//                                                         required
//                                                         type="text"
//                                                         name="usn"
//                                                         clearable
//                                                         bordered
//                                                         fullWidth
//                                                         color="primary"
//                                                         size="lg"
//                                                         placeholder="Registration Number"
//                                                         // onChange={
//                                                         //     changeUsnHandler
//                                                         // }
//                                                     />
//                                                     <Input
//                                                         required
//                                                         type="email"
//                                                         name="email"
//                                                         clearable
//                                                         bordered
//                                                         fullWidth
//                                                         color="primary"
//                                                         size="lg"
//                                                         placeholder="Email"
//                                                     />

//                                                     <Input
//                                                         required
//                                                         type="text"
//                                                         name="dept"
//                                                         clearable
//                                                         bordered
//                                                         fullWidth
//                                                         color="primary"
//                                                         size="lg"
//                                                         placeholder="Department"
//                                                     />
//                                                     <Radio.Group
//                                                         isRequired
//                                                         value={checked}
//                                                         onChange={setChecked}
//                                                         name="isSrmite"
//                                                         orientation="horizontal"
//                                                     >
//                                                         <div className="flex justify-around">
//                                                             <Radio
//                                                                 value="true"
//                                                                 color="success"
//                                                             >
//                                                                 SRMite
//                                                             </Radio>
//                                                             <Radio
//                                                                 value="false"
//                                                                 color="success"
//                                                             >
//                                                                 Non-SRMite
//                                                             </Radio>
//                                                         </div>
//                                                     </Radio.Group>
//                                                     <p className="text-center font-extra-bold">
//                                                         Check us out on {""}
//                                                         <a
//                                                             href="https://www.meetup.com/chennai-in/"
//                                                             className=" text-black text-xl hover:text-[#F74160] font-bold"
//                                                         >
//                                                             MEETUP
//                                                         </a>
//                                                     </p>
//                                                     <button
//                                                         type="submit"
//                                                         className="w-full bg-htb-green/50 hover:bg-htb-green py-2 font-normal text-lg rounded-lg"
//                                                         disabled={loadingSubmit}
//                                                     >
//                                                         {loadingSubmit
//                                                             ? "Submitting..."
//                                                             : "SUBMIT"}{" "}
//                                                     </button>
//                                                 </form>
//                                             </Modal.Body>
//                                         </Modal>
//                                     </div>
//                                     <div>
//                                         <button
//                                             onClick={handler}
//                                             disabled={event?.is_active}
//                                             className="bg-htb-green px-3 py-3 rounded-md font-semibold inline-block mt-6"
//                                         >
//                                             Get your Certificate
//                                         </button>

//                                         {visible ? (
//                                             <div className="absolute top-0 left-0 w-screen h-screen text-white flex justify-center items-center backdrop-blur-xl">
//                                                 <div className="w-[90%] lg:w-[500px] bg-white text-black z-50 p-7  rounded-3xl flex flex-col gap-5 relative ">
//                                                     <ToastContainer />
//                                                     <div
//                                                         className="absolute top-5 right-5 w-7 hover:cursor-pointer hover:text-red-600"
//                                                         onClick={closeHandler}
//                                                     >
//                                                         <GiCrossMark className="w-full h-full" />
//                                                     </div>
//                                                     <p className="text-xl max-md:text-base">
//                                                         Please enter your
//                                                         registered E-Mail
//                                                     </p>
//                                                     <Input
//                                                         type="email"
//                                                         clearable
//                                                         bordered
//                                                         fullWidth
//                                                         color="primary"
//                                                         size="lg"
//                                                         placeholder="Email"
//                                                         onChange={(
//                                                             event: any
//                                                         ) =>
//                                                             setEmail(
//                                                                 event.target
//                                                                     .value
//                                                             )
//                                                         }
//                                                     />

//                                                     {certificate ? (
//                                                         <a
//                                                             className="w-full bg-htb-green/50 hover:bg-htb-green py-2 font-normal rounded-full  p-8 text-xl text-center"
//                                                             href={certificate}
//                                                             download="Certificate.png"
//                                                         >
//                                                             Download Now
//                                                         </a>
//                                                     ) : (
//                                                         <div className="flex space-evenly justify-center">
//                                                             <button
//                                                                 onClick={
//                                                                     fetchCertificate
//                                                                 }
//                                                                 disabled={
//                                                                     loadingCertificate ||
//                                                                     type ===
//                                                                         "Please Select..."
//                                                                 }
//                                                                 className={`w-1/2 bg-htb-green hover:bg-htb-green/50 py-1 rounded-l-[20px] font-normal p-8 text-xl max-md:text-sm ${
//                                                                     loadingCertificate
//                                                                         ? "opacity-50 cursor-not-allowed"
//                                                                         : ""
//                                                                 }`}
//                                                             >
//                                                                 {loadingCertificate
//                                                                     ? "Generating..."
//                                                                     : "Generate Certificate"}
//                                                             </button>
//                                                             <div className=" max-md:w-2/3 text-xl max-md:text-lg mt-0  border-l-[1px] border-l-black">
//                                                                 <Select
//                                                                     autoFocus
//                                                                     hideSelectedOptions={
//                                                                         true
//                                                                     }
//                                                                     isClearable={
//                                                                         false
//                                                                     }
//                                                                     isSearchable={
//                                                                         false
//                                                                     }
//                                                                     placeholder={
//                                                                         type
//                                                                     }
//                                                                     theme={(
//                                                                         theme
//                                                                     ) => ({
//                                                                         ...theme,
//                                                                         colors: {
//                                                                             ...theme.colors,
//                                                                             neutral50:
//                                                                                 "#000000" // Placeholder color
//                                                                         }
//                                                                     })}
//                                                                     tabSelectsValue={
//                                                                         false
//                                                                     }
//                                                                     name="preference1"
//                                                                     className="text-black w-full rounded-full"
//                                                                     options={
//                                                                         options
//                                                                     }
//                                                                     onChange={
//                                                                         changeType
//                                                                     }
//                                                                     styles={
//                                                                         styles
//                                                                     }
//                                                                 />
//                                                             </div>
//                                                         </div>
//                                                     )}
//                                                 </div>
//                                             </div>
//                                         ) : null}
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>

//                     <div className="md:mb-14 sm:ml-0 sm:mb-0 lg:w-2/4 w-full mt-16 lg:mx-0 mx-auto pl-2 md:pl-8 flex justify-center">

//                         <figure className="mb-32 sm:mb-0 ">
//                             <img
//                                 src={event?.poster_url}
//                                 alt="HackTheBox Meetup: Chennai, IN - Revealed Post"

//                             />
//                         </figure>
//                     </div>
//                 </div>
//             </div>

//             <div className=" md:mt-0 flex-col justify-center px-2 md:pl-10 sm:px-20 ">
//                 <div className="text-center mb-10">
//                     <h1 className="text-white text-3xl ml-2 sm:ml-4 sm:text-5xl  font-bold">
//                         Speakers
//                     </h1>
//                 </div>
//                 <div className="p-5 ml-1 sm:ml-0 rounded-3xl w-full sm:w-auto bg-[#181818] border-4 border-htb-green/50 mb-10">
//                     <p className="text-white mt-2 text-justify text-xl">
//                         The Elite panel of guests who will inaugurate the event
//                         are:-
//                         <br />
//                         <br />
//                         {event?.speakers_details.map((speaker) => {
//                             return (
//                                 <>
//                                     <strong className="text-htb-green">
//                                         {speaker.name}
//                                     </strong>
//                                     <strong>, {speaker.designation}</strong>
//                                     <br />
//                                     <br />{" "}
//                                 </>
//                             );
//                         })}
//                         <br />
//                     </p>
//                 </div>
//             </div>

//             <div className="mt-10 flex-col justify-center px-2 md:pl-10 sm:px-20">
//                 <div className="text-center mb-10">
//                     <h1 className="text-white text-3xl pl-2 sm:pl-6 sm:text-5xl  font-bold">
//                         Prerequisites
//                     </h1>
//                 </div>
//                 <div className="p-5 rounded-3xl ml-1 sm:ml-0 w-full sm:w-auto bg-[#181818] border-4 border-htb-green/50 mb-10">
//                     <p className="text-white mt-4  break-keep text-xl">
//                         <h2 className="text-2xl font-bold">
//                             Prerequisites for the Hands-on Workshop:-
//                         </h2>
//                         <br />
//                         <ul className="list-disc list-inside">
//                             {(() => {
//                                 let prereq_len: number = Number(
//                                     event?.prerequisites.length
//                                 );
//                                 let prereq = [];
//                                 for (let i = 0; i < prereq_len; i++) {
//                                     prereq.push(
//                                         <li key={event?.prerequisites[i]}>
//                                             {event?.prerequisites[i]}
//                                         </li>
//                                     );
//                                 }
//                                 return prereq;
//                             })()}
//                         </ul>
//                     </p>
//                 </div>
//             </div>

//             <div className="Events_Gallery ml-[1.5rem] md:ml-[5rem] mt-4 sm:mt-0 flex-col">
//                 <p className="font-bold mr-8 sm:ml-32 mb-4 text-4xl uppercase text-teal-50 relative right-4 sm:right-14 ">
//                     Gallery
//                 </p>
//                 <div className="mt-8 sm:mt-6 sm:pr-0 w-full">
//                     <Slider {...settings}>
//                         {event?.gallery?.map((image) => (
//                             <div key={image}>
//                                 <div className="image">
//                                     <img
//                                         src={image}
//                                         alt="Gallery"
//                                         style={{
//                                             width: "100%",
//                                             height: "100%",
//                                             objectFit: "contain",
//                                             borderRadius: "10px",
//                                             boxShadow:
//                                                 "0px 0px 10px rgba(0, 0, 0, 0.3)"
//                                         }}
//                                     />
//                                 </div>
//                             </div>
//                         ))}
//                     </Slider>
//                 </div>
//             </div>
//             */}
//         </>
//     );
// };

// export async function getServerSideProps(): Promise<
//     GetServerSidePropsResult<EventsPageProps>
// > {
//     try {
//         const { data: events } = await (
//             await fetch(`${url_root}/api/v1/events`)
//         ).json();

//         return { props: { events } };
//     } catch (error) {
//         console.log(error);
//         return { notFound: true };
//     }
// }

// export default Event;import type { NextPage, GetServerSidePropsResult } from "next";
import type { NextPage, GetServerSidePropsResult } from "next";
import React, { useState, useEffect, useRef } from "react";
import { Modal, Radio } from "@nextui-org/react";
import Select, { SingleValue, StylesConfig, GroupBase } from "react-select";
import { useRouter } from "next/router";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GiCrossMark } from "react-icons/gi";

interface SpeakerDetail {
    name: string;
    designation: string;
    details: string;
    image: string;
}

interface SponsorDetail {
    name: string;
    place: string;
    details: string;
}

interface EventProps {
    event_name: string;
    event_description: string;
    poster_url: string;
    speakers_details: SpeakerDetail[];
    event_date: string;
    is_active: boolean;
    venue: string;
    sponsors_details: SponsorDetail[];
    duration: number;
    prerequisites: string[];
    cost: number;
    gallery: string[];
    registration_url: string;
    database: string;
    slug: string;
    certificate: {
        [key: string]: string | undefined;
    };
}

interface EventsPageProps {
    events: EventProps[];
}

interface SelectOption {
    value: string;
    label: string;
}

const styles: StylesConfig<SelectOption, false, GroupBase<SelectOption>> = {
    option: (provided, state) => ({
        ...provided,
        fontWeight: state.isSelected ? "bold" : "normal",
        background: state.isFocused ? "#9FEF00" : "#1a2535",
        color: state.isFocused ? "#0a0f1a" : "#9FEF00",
    }),
    control: (base) => ({
        ...base,
        background: "#9FEF00",
        fontWeight: "bold",
        borderColor: "#9FEF00",
        borderRadius: "0px 12px 12px 0px",
        height: "52px",
        minWidth: "160px",
        boxShadow: "none",
        "&:hover": { borderColor: "#9FEF00" }
    }),
    singleValue: (base) => ({ ...base, color: "#0a0f1a" }),
    menu: (base) => ({ ...base, background: "#1a2535", border: "1px solid #9FEF00" }),
};

const Toast = (success: boolean, message: string) => {
    toast[success ? "success" : "error"](message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark"
    });
};

const url_root =
    process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : "http://localhost:3000";

// Animated glitch text component
const GlitchText = ({ text, className }: { text: string; className?: string }) => (
    <span className={`glitch-text relative inline-block ${className ?? ""}`} data-text={text}>
        {text}
    </span>
);

// Hex grid background SVG
const HexBackground = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.04]">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <pattern id="hex" x="0" y="0" width="56" height="100" patternUnits="userSpaceOnUse">
                    <polygon points="28,2 54,16 54,44 28,58 2,44 2,16" fill="none" stroke="#9FEF00" strokeWidth="1" />
                    <polygon points="28,52 54,66 54,94 28,108 2,94 2,66" fill="none" stroke="#9FEF00" strokeWidth="1" />
                </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hex)" />
        </svg>
    </div>
);

// Scan line effect
const ScanLines = () => (
    <div className="pointer-events-none fixed inset-0 z-[1] opacity-[0.03]"
        style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.5) 2px, rgba(0,0,0,0.5) 4px)" }} />
);

const Event: NextPage<EventsPageProps> = ({ events }) => {
    const router = useRouter();
    const eventId = router.query.eventId as string;
    const event = events.find((e) => e.event_name === eventId);
    const slug = event?.slug;
    const registrationUrl = event?.registration_url?.trim();
    const hasExternalRegistration = Boolean(registrationUrl);
    const isRegistrationActive = Boolean(event?.is_active);

    const [email, setEmail] = useState("");
    const [certificate, setCertificate] = useState<string | null>(null);
    const [type, setType] = useState("Please Select...");
    const [visible, setVisible] = useState(false);
    const [loadingCertificate, setLoadingCertificate] = useState(false);
    const [loadingSubmit, setLoadingSubmit] = useState(false);
    const [visibleReg, setVisibleReg] = useState(false);
    const [checked, setChecked] = useState("");
    const [mounted, setMounted] = useState(false);
    const [terminalText, setTerminalText] = useState("");
    const terminalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setMounted(true);
        const fullText = `> INITIALIZING EVENT_PORTAL...\n> LOADING ${event?.event_name?.toUpperCase() ?? "EVENT"}...\n> STATUS: ${isRegistrationActive ? "ACTIVE" : "ARCHIVED"}\n> ACCESS GRANTED ✓`;
        let i = 0;
        const interval = setInterval(() => {
            if (i < fullText.length) {
                setTerminalText(fullText.slice(0, i + 1));
                i++;
            } else {
                clearInterval(interval);
            }
        }, 28);
        return () => clearInterval(interval);
    }, [event?.event_name, isRegistrationActive]);

    const options: SelectOption[] = event?.certificate
        ? Object.entries(event.certificate)
            .filter(([, url]) => url && url.trim() !== "")
            .map(([key]) => ({
                value: key,
                label: key.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")
            }))
        : [];

    const fetchCertificate = async () => {
        if (!email) { Toast(false, "Please enter your registered email"); return; }
        if (type === "Please Select...") { Toast(false, "Please select a certificate type"); return; }
        try {
            setLoadingCertificate(true);
            const values = { email: email.toLowerCase(), type: type.toLowerCase(), event: slug };
            const response = await axios.post(`/api/v1/certificates`, values);
            setCertificate(response.data.certificate as string);
            Toast(true, "Certificate Generated Successfully");
        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                Toast(false, `${err.response?.data?.error ?? "An error occurred"}`);
            } else {
                Toast(false, "An error occurred");
            }
        } finally {
            setLoadingCertificate(false);
        }
    };

    const changeType = (e: SingleValue<SelectOption>) => {
        if (e) setType(e.value);
    };

    const closeHandler = () => {
        setVisible(false);
        setCertificate(null);
        setEmail("");
        setType("Please Select...");
        document.body.style.overflow = "unset";
    };

    const handler = () => {
        setVisible(!visible);
        document.body.style.overflow = "hidden";
        window.scrollTo({ top: 0 });
    };

    const handlerReg = () => setVisibleReg(true);
    const closeHandlerReg = () => setVisibleReg(false);

    const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;

        const str2bool = (value: string): boolean | string => {
            if (value && typeof value === "string") {
                if (value.toLowerCase() === "true") return true;
                if (value.toLowerCase() === "false") return false;
            }
            return value;
        };

        const isSrmite = str2bool((form.elements.namedItem("isSrmite") as HTMLInputElement)?.value ?? "");
        const name = (form.elements.namedItem("name") as HTMLInputElement)?.value ?? "";
        const emailVal = (form.elements.namedItem("email") as HTMLInputElement)?.value ?? "";
        const phone = (form.elements.namedItem("phn") as HTMLInputElement)?.value ?? "";
        const usn = (form.elements.namedItem("usn") as HTMLInputElement)?.value ?? "";
        const dept = (form.elements.namedItem("dept") as HTMLInputElement)?.value ?? "";

        try {
            if (name.length > 20) { Toast(false, "Name cannot exceed 20 characters"); return; }
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailVal)) { Toast(false, "Invalid email"); return; }
            if (!/^\d{10}$/.test(phone)) { Toast(false, "Invalid phone number"); return; }

            const body = { usn, phn: phone, name, email: emailVal.toLowerCase(), dept, isSrmite, event_name: event?.event_name };
            const response = await axios.post(`/api/v1/events/registration`, body);
            Toast(true, response.data.message as string);
        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                Toast(false, `${err.response?.data?.message ?? "An error occurred"}`);
            } else {
                Toast(false, "An error occurred");
            }
        } finally {
            setLoadingSubmit(false);
        }
    };

    // suppress unused ref warning
    void terminalRef;

    if (!mounted) return null;

    return (
        <>
            <style jsx global>{`
                @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Orbitron:wght@400;700;900&family=Inter:wght@300;400;500;600&display=swap');

                :root {
                    --htb-green: #9FEF00;
                    --htb-green-dim: rgba(159, 239, 0, 0.15);
                    --htb-green-glow: rgba(159, 239, 0, 0.4);
                    --bg-deep: #0a0f1a;
                    --bg-card: #0e1420;
                    --bg-surface: #141d2b;
                    --text-muted: #4a5568;
                    --border-subtle: rgba(159, 239, 0, 0.12);
                }

                * { box-sizing: border-box; }

                body {
                    background: var(--bg-deep);
                    font-family: 'Inter', sans-serif;
                }

                .glitch-text::before, .glitch-text::after {
                    content: attr(data-text);
                    position: absolute;
                    top: 0; left: 0;
                    width: 100%; height: 100%;
                }
                .glitch-text::before {
                    animation: glitch1 3s infinite;
                    color: #00ffff;
                    clip-path: polygon(0 0, 100% 0, 100% 45%, 0 45%);
                    opacity: 0.6;
                }
                .glitch-text::after {
                    animation: glitch2 3s infinite;
                    color: #ff0080;
                    clip-path: polygon(0 55%, 100% 55%, 100% 100%, 0 100%);
                    opacity: 0.5;
                }
                @keyframes glitch1 {
                    0%, 90%, 100% { transform: translate(0); }
                    92% { transform: translate(-2px, 1px); }
                    94% { transform: translate(2px, -1px); }
                    96% { transform: translate(-1px, 2px); }
                }
                @keyframes glitch2 {
                    0%, 90%, 100% { transform: translate(0); }
                    92% { transform: translate(2px, -1px); }
                    94% { transform: translate(-2px, 1px); }
                    96% { transform: translate(1px, -2px); }
                }

                .terminal-cursor::after {
                    content: '█';
                    animation: blink 1s step-end infinite;
                    color: var(--htb-green);
                }
                @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }

                .neon-border {
                    border: 1px solid var(--htb-green);
                    box-shadow: 0 0 8px var(--htb-green-glow), inset 0 0 8px rgba(159, 239, 0, 0.03);
                }

                .htb-btn {
                    background: var(--htb-green);
                    color: #0a0f1a;
                    font-family: 'Orbitron', monospace;
                    font-weight: 700;
                    font-size: 0.85rem;
                    letter-spacing: 0.12em;
                    text-transform: uppercase;
                    padding: 14px 32px;
                    border: none;
                    cursor: pointer;
                    position: relative;
                    overflow: hidden;
                    transition: all 0.2s ease;
                    clip-path: polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%);
                }
                .htb-btn::before {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
                    transform: translateX(-100%);
                    transition: transform 0.4s;
                }
                .htb-btn:hover::before { transform: translateX(100%); }
                .htb-btn:hover { box-shadow: 0 0 24px var(--htb-green-glow); }
                .htb-btn:disabled { opacity: 0.4; cursor: not-allowed; }
                .htb-btn:disabled::before { display: none; }

                .htb-btn-outline {
                    background: transparent;
                    color: var(--htb-green);
                    font-family: 'Orbitron', monospace;
                    font-weight: 700;
                    font-size: 0.85rem;
                    letter-spacing: 0.12em;
                    text-transform: uppercase;
                    padding: 13px 32px;
                    border: 1px solid var(--htb-green);
                    cursor: pointer;
                    transition: all 0.2s;
                    clip-path: polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%);
                }
                .htb-btn-outline:hover {
                    background: var(--htb-green-dim);
                    box-shadow: 0 0 20px var(--htb-green-glow);
                }

                .stat-card {
                    background: var(--bg-surface);
                    border: 1px solid var(--border-subtle);
                    padding: 16px 20px;
                    display: flex;
                    align-items: center;
                    gap: 14px;
                    transition: border-color 0.3s;
                }
                .stat-card:hover { border-color: rgba(159, 239, 0, 0.4); }

                .stat-icon {
                    width: 38px;
                    height: 38px;
                    background: var(--htb-green-dim);
                    border: 1px solid rgba(159, 239, 0, 0.3);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                }

                .section-label {
                    font-family: 'Share Tech Mono', monospace;
                    font-size: 0.7rem;
                    color: var(--htb-green);
                    letter-spacing: 0.2em;
                    text-transform: uppercase;
                    opacity: 0.7;
                    margin-bottom: 4px;
                }

                .section-heading {
                    font-family: 'Orbitron', monospace;
                    font-weight: 900;
                    color: var(--htb-green);
                    letter-spacing: 0.05em;
                }

                .prereq-item {
                    display: flex;
                    align-items: flex-start;
                    gap: 12px;
                    padding: 12px 0;
                    border-bottom: 1px solid var(--border-subtle);
                    font-family: 'Share Tech Mono', monospace;
                    color: #a0aec0;
                    font-size: 0.95rem;
                }
                .prereq-item:last-child { border-bottom: none; }
                .prereq-item::before {
                    content: '//';
                    color: var(--htb-green);
                    opacity: 0.7;
                    flex-shrink: 0;
                    margin-top: 1px;
                }

                .speaker-card {
                    background: var(--bg-surface);
                    border: 1px solid var(--border-subtle);
                    overflow: hidden;
                    transition: all 0.3s;
                    position: relative;
                }
                .speaker-card::after {
                    content: '';
                    position: absolute;
                    bottom: 0; left: 0;
                    width: 0; height: 2px;
                    background: var(--htb-green);
                    transition: width 0.4s;
                }
                .speaker-card:hover::after { width: 100%; }
                .speaker-card:hover { border-color: rgba(159, 239, 0, 0.35); box-shadow: 0 8px 32px rgba(0,0,0,0.4); transform: translateY(-4px); }

                .poster-frame {
                    position: relative;
                }
                .poster-frame::before, .poster-frame::after {
                    content: '';
                    position: absolute;
                    width: 20px;
                    height: 20px;
                    border-color: var(--htb-green);
                    border-style: solid;
                    z-index: 2;
                }
                .poster-frame::before {
                    top: -4px; left: -4px;
                    border-width: 2px 0 0 2px;
                }
                .poster-frame::after {
                    bottom: -4px; right: -4px;
                    border-width: 0 2px 2px 0;
                }

                .cert-modal-overlay {
                    position: fixed;
                    top: 0; left: 0;
                    width: 100vw; height: 100vh;
                    background: rgba(10, 15, 26, 0.92);
                    backdrop-filter: blur(12px);
                    z-index: 1000;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .cert-modal {
                    background: var(--bg-card);
                    border: 1px solid rgba(159, 239, 0, 0.25);
                    width: 90%;
                    max-width: 500px;
                    padding: 40px;
                    position: relative;
                    box-shadow: 0 0 60px rgba(159, 239, 0, 0.08), 0 32px 64px rgba(0,0,0,0.6);
                }
                .cert-modal::before {
                    content: '';
                    position: absolute;
                    top: 0; left: 0; right: 0;
                    height: 2px;
                    background: linear-gradient(90deg, transparent, var(--htb-green), transparent);
                }

                .modal-input {
                    width: 100%;
                    background: var(--bg-surface);
                    border: 1px solid var(--border-subtle);
                    color: #e2e8f0;
                    padding: 12px 16px;
                    font-family: 'Share Tech Mono', monospace;
                    font-size: 0.95rem;
                    outline: none;
                    transition: border-color 0.2s;
                }
                .modal-input:focus { border-color: var(--htb-green); box-shadow: 0 0 0 1px rgba(159, 239, 0, 0.2); }
                .modal-input::placeholder { color: var(--text-muted); }

                .reg-input {
                    width: 100%;
                    background: #0a0f1a;
                    border: 1px solid rgba(255,255,255,0.1);
                    color: #e2e8f0;
                    padding: 12px 16px;
                    font-family: 'Share Tech Mono', monospace;
                    font-size: 0.95rem;
                    outline: none;
                    transition: border-color 0.2s;
                    border-radius: 4px;
                }
                .reg-input:focus { border-color: var(--htb-green); }
                .reg-input::placeholder { color: var(--text-muted); }

                .progress-bar {
                    height: 2px;
                    background: linear-gradient(90deg, var(--htb-green), #00ffff);
                    animation: scanProgress 2s ease-in-out infinite;
                    transform-origin: left;
                }
                @keyframes scanProgress {
                    0% { transform: scaleX(0); opacity: 1; }
                    80% { transform: scaleX(1); opacity: 1; }
                    100% { transform: scaleX(1); opacity: 0; }
                }

                .particle {
                    position: absolute;
                    width: 2px;
                    height: 2px;
                    background: var(--htb-green);
                    border-radius: 50%;
                    animation: float linear infinite;
                    opacity: 0;
                }
                @keyframes float {
                    0% { transform: translateY(0) translateX(0); opacity: 0; }
                    10% { opacity: 0.6; }
                    90% { opacity: 0.2; }
                    100% { transform: translateY(-120px) translateX(20px); opacity: 0; }
                }

                .fadeup {
                    animation: fadeUp 0.7s ease forwards;
                    opacity: 0;
                }
                @keyframes fadeUp {
                    from { opacity: 0; transform: translateY(24px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .delay-1 { animation-delay: 0.1s; }
                .delay-2 { animation-delay: 0.2s; }
                .delay-3 { animation-delay: 0.3s; }
                .delay-4 { animation-delay: 0.4s; }
                .delay-5 { animation-delay: 0.5s; }
            `}</style>

            <ScanLines />
            <ToastContainer />

            {/* Hero Section */}
            <section style={{ background: "var(--bg-deep)", position: "relative", overflow: "hidden", paddingTop: "60px", paddingBottom: "60px" }}>
                <HexBackground />
                <div style={{ position: "absolute", top: "-20%", right: "-10%", width: "600px", height: "600px", background: "radial-gradient(circle, rgba(159,239,0,0.04) 0%, transparent 65%)", pointerEvents: "none" }} />
                <div style={{ position: "absolute", bottom: "0", left: "-5%", width: "400px", height: "400px", background: "radial-gradient(circle, rgba(0,255,255,0.03) 0%, transparent 65%)", pointerEvents: "none" }} />

                <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 2 }}>
                    {/* Terminal header */}
                    <div className="fadeup" style={{ marginBottom: "48px" }}>
                        <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(159,239,0,0.06)", border: "1px solid rgba(159,239,0,0.15)", padding: "6px 16px", marginBottom: "24px" }}>
                            <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: isRegistrationActive ? "#9FEF00" : "#666", boxShadow: isRegistrationActive ? "0 0 8px #9FEF00" : "none", display: "inline-block" }} />
                            <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.75rem", color: "#9FEF00", letterSpacing: "0.1em", opacity: 0.8 }}>
                                {isRegistrationActive ? "REGISTRATION_OPEN" : "EVENT_ARCHIVED"}
                            </span>
                        </div>
                        <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.8rem", color: "#4a5568", whiteSpace: "pre-wrap", lineHeight: "1.8", maxWidth: "400px" }} className="terminal-cursor">
                            {terminalText}
                        </div>
                    </div>

                    {/* Main hero grid */}
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "64px", alignItems: "start" }}>

                        {/* Left: Poster */}
                        <div className="fadeup delay-1">
                            <div className="poster-frame" style={{ display: "inline-block", width: "100%" }}>
                                <div style={{ background: "var(--bg-card)", border: "1px solid rgba(159,239,0,0.2)", overflow: "hidden", position: "relative" }}>
                                    <div className="progress-bar" />
                                    <img
                                        src={event?.poster_url}
                                        alt={event?.event_name}
                                        style={{ width: "100%", maxHeight: "520px", objectFit: "contain", display: "block", filter: "contrast(1.05) saturate(1.1)" }}
                                    />
                                    <div style={{ position: "absolute", top: "12px", right: "12px", fontFamily: "'Share Tech Mono', monospace", fontSize: "0.6rem", color: "#9FEF00", opacity: 0.5 }}>
                                        {`[${event?.event_name?.slice(0, 6).toUpperCase() ?? ""}]`}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right: Info */}
                        <div className="fadeup delay-2" style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
                            <div>
                                <div className="section-label">Event</div>
                                <h1 style={{ fontFamily: "'Orbitron', monospace", fontWeight: 900, fontSize: "clamp(1.8rem, 4vw, 3rem)", color: "#9FEF00", lineHeight: 1.1, margin: 0, letterSpacing: "0.02em" }}>
                                    <GlitchText text={event?.event_name ?? ""} />
                                </h1>
                            </div>

                            {/* Stats grid */}
                            <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "8px" }}>
                                <div className="stat-card">
                                    <div className="stat-icon">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9FEF00" strokeWidth="1.5">
                                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
                                        </svg>
                                    </div>
                                    <div>
                                        <div className="section-label" style={{ marginBottom: "2px" }}>Venue</div>
                                        <div style={{ color: "#e2e8f0", fontFamily: "'Share Tech Mono', monospace", fontSize: "0.95rem" }}>{event?.venue}</div>
                                    </div>
                                </div>

                                <div className="stat-card">
                                    <div className="stat-icon">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9FEF00" strokeWidth="1.5">
                                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
                                        </svg>
                                    </div>
                                    <div>
                                        <div className="section-label" style={{ marginBottom: "2px" }}>Date</div>
                                        <div style={{ color: "#e2e8f0", fontFamily: "'Share Tech Mono', monospace", fontSize: "0.95rem" }}>{event?.event_date}</div>
                                    </div>
                                </div>

                                <div className="stat-card">
                                    <div className="stat-icon">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9FEF00" strokeWidth="1.5">
                                            <line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                                        </svg>
                                    </div>
                                    <div>
                                        <div className="section-label" style={{ marginBottom: "2px" }}>Entry</div>
                                        <div style={{ color: event?.cost === 0 ? "#9FEF00" : "#e2e8f0", fontFamily: "'Share Tech Mono', monospace", fontSize: "0.95rem", fontWeight: event?.cost === 0 ? "bold" : "normal" }}>
                                            {event?.cost === 0 ? "FREE" : `₹${event?.cost}`}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Action buttons */}
                            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                                {hasExternalRegistration ? (
                                    <a href={registrationUrl} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", opacity: isRegistrationActive ? 1 : 0.4, pointerEvents: isRegistrationActive ? "auto" : "none" }}>
                                        <button className="htb-btn" style={{ width: "100%" }}>
                                            <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}>
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" /><polyline points="10 17 15 12 10 7" /><line x1="15" y1="12" x2="3" y2="12" /></svg>
                                                Register Now
                                            </span>
                                        </button>
                                    </a>
                                ) : (
                                    <button className="htb-btn" style={{ width: "100%" }} disabled={!isRegistrationActive} onClick={handlerReg}>
                                        <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}>
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" /><polyline points="10 17 15 12 10 7" /><line x1="15" y1="12" x2="3" y2="12" /></svg>
                                            Register Now
                                        </span>
                                    </button>
                                )}

                                <button className="htb-btn-outline" style={{ width: "100%" }} onClick={handler} disabled={event?.is_active}>
                                    <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}>
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" /></svg>
                                        Get Certificate
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Description Section */}
            <section style={{ background: "var(--bg-card)", padding: "64px 0", borderTop: "1px solid var(--border-subtle)", borderBottom: "1px solid var(--border-subtle)" }}>
                <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>
                    <div style={{ maxWidth: "800px" }}>
                        <div className="section-label">About This Event</div>
                        <p style={{ color: "#a0aec0", fontFamily: "'Share Tech Mono', monospace", fontSize: "1rem", lineHeight: "1.9", marginTop: "12px" }}>
                            {event?.event_description}
                        </p>
                    </div>
                </div>
            </section>

            {/* Speakers Section */}
            {(event?.speakers_details?.length ?? 0) > 0 && (
                <section style={{ background: "var(--bg-deep)", padding: "80px 0", position: "relative", overflow: "hidden" }}>
                    <HexBackground />
                    <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 2 }}>
                        <div style={{ marginBottom: "48px", display: "flex", alignItems: "center", gap: "24px" }}>
                            <div>
                                <div className="section-label">Speakers</div>
                                <h2 className="section-heading" style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)", margin: 0 }}>Meet Our Guests</h2>
                            </div>
                            <div style={{ flex: 1, height: "1px", background: "linear-gradient(90deg, rgba(159,239,0,0.3), transparent)" }} />
                        </div>

                        <div style={{
                            display: "grid",
                            gridTemplateColumns: `repeat(${Math.min(event?.speakers_details?.length ?? 1, 3)}, 1fr)`,
                            gap: "24px"
                        }}>
                            {event?.speakers_details?.map((guest, index) => (
                                <div key={index} className="speaker-card">
                                    {guest.image && (
                                        <div style={{ height: "200px", overflow: "hidden", position: "relative" }}>
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img src={guest.image} alt={guest.name} width={400} height={200} style={{ width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(20%)" }} />
                                            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(14,20,32,0.9) 0%, transparent 60%)" }} />
                                            <div style={{ position: "absolute", top: "10px", right: "10px", fontFamily: "'Share Tech Mono', monospace", fontSize: "0.6rem", color: "#9FEF00", opacity: 0.6 }}>
                                                {`[SYS_${(index + 1).toString().padStart(2, "0")}]`}
                                            </div>
                                        </div>
                                    )}
                                    <div style={{ padding: "20px" }}>
                                        <div style={{ fontFamily: "'Orbitron', monospace", fontWeight: 700, color: "#9FEF00", fontSize: "0.95rem", marginBottom: "4px" }}>{guest.name}</div>
                                        <div style={{ fontFamily: "'Share Tech Mono', monospace", color: "#718096", fontSize: "0.8rem" }}>{guest.designation}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Prerequisites Section */}
            {(event?.prerequisites?.length ?? 0) > 0 && (
                <section style={{ background: "var(--bg-card)", padding: "80px 0", borderTop: "1px solid var(--border-subtle)" }}>
                    <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>
                        <div style={{ marginBottom: "40px", display: "flex", alignItems: "center", gap: "24px" }}>
                            <div>
                                <div className="section-label">Requirements</div>
                                <h2 className="section-heading" style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)", margin: 0 }}>Pre-Requisites</h2>
                            </div>
                            <div style={{ flex: 1, height: "1px", background: "linear-gradient(90deg, rgba(159,239,0,0.3), transparent)" }} />
                        </div>

                        <div style={{ maxWidth: "700px", background: "var(--bg-surface)", border: "1px solid var(--border-subtle)", padding: "8px 24px" }}>
                            {event?.prerequisites?.map((item, index) => (
                                <div key={index} className="prereq-item">{item}</div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Gallery Section */}
            {(event?.gallery?.length ?? 0) > 0 && (
                <section style={{ background: "var(--bg-deep)", padding: "80px 0", borderTop: "1px solid var(--border-subtle)", position: "relative", overflow: "hidden" }}>
                    <HexBackground />
                    <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 2 }}>
                        <div style={{ marginBottom: "48px", display: "flex", alignItems: "center", gap: "24px" }}>
                            <div>
                                <div className="section-label">Moments</div>
                                <h2 className="section-heading" style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)", margin: 0 }}>Event Gallery</h2>
                            </div>
                            <div style={{ flex: 1, height: "1px", background: "linear-gradient(90deg, rgba(159,239,0,0.3), transparent)" }} />
                        </div>

                        <div style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                            gap: "16px"
                        }}>
                            {event?.gallery?.map((imgUrl, index) => (
                                <div
                                    key={index}
                                    style={{
                                        position: "relative",
                                        overflow: "hidden",
                                        border: "1px solid var(--border-subtle)",
                                        cursor: "pointer",
                                        transition: "border-color 0.3s"
                                    }}
                                    onMouseOver={(e) => (e.currentTarget.style.borderColor = "rgba(159,239,0,0.5)")}
                                    onMouseOut={(e) => (e.currentTarget.style.borderColor = "var(--border-subtle)")}
                                    onClick={() => window.open(imgUrl, "_blank")}
                                >
                                    <div style={{
                                        position: "absolute", top: "8px", left: "8px", zIndex: 2,
                                        fontFamily: "'Share Tech Mono', monospace", fontSize: "0.6rem",
                                        color: "#9FEF00", opacity: 0.7,
                                        background: "rgba(10,15,26,0.7)", padding: "2px 6px"
                                    }}>
                                        {`IMG_${(index + 1).toString().padStart(2, "0")}`}
                                    </div>

                                    <img
                                        src={imgUrl}
                                        alt={`${event?.event_name ?? "Event"} gallery ${index + 1}`}
                                        style={{
                                            width: "100%",
                                            height: "220px",
                                            objectFit: "cover",
                                            display: "block",
                                            filter: "grayscale(10%) contrast(1.05)",
                                            transition: "transform 0.4s ease, filter 0.4s ease"
                                        }}
                                        onMouseOver={(e) => {
                                            e.currentTarget.style.transform = "scale(1.05)";
                                            e.currentTarget.style.filter = "grayscale(0%) contrast(1.1)";
                                        }}
                                        onMouseOut={(e) => {
                                            e.currentTarget.style.transform = "scale(1)";
                                            e.currentTarget.style.filter = "grayscale(10%) contrast(1.05)";
                                        }}
                                    />

                                    <div style={{
                                        position: "absolute", inset: 0,
                                        background: "linear-gradient(to top, rgba(10,15,26,0.7) 0%, transparent 60%)",
                                        opacity: 0, transition: "opacity 0.3s"
                                    }}
                                        onMouseOver={(e) => (e.currentTarget.style.opacity = "1")}
                                        onMouseOut={(e) => (e.currentTarget.style.opacity = "0")}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Certificate Modal */}
            {visible && (
                <div className="cert-modal-overlay">
                    <div className="cert-modal">
                        <button onClick={closeHandler} style={{ position: "absolute", top: "16px", right: "16px", background: "none", border: "none", color: "#4a5568", cursor: "pointer", padding: "4px", display: "flex", transition: "color 0.2s" }}
                            onMouseOver={(e) => (e.currentTarget.style.color = "#ff4444")}
                            onMouseOut={(e) => (e.currentTarget.style.color = "#4a5568")}>
                            <GiCrossMark size={20} />
                        </button>

                        <div className="section-label" style={{ marginBottom: "8px" }}>Certificate Portal</div>
                        <h3 style={{ fontFamily: "'Orbitron', monospace", color: "#9FEF00", margin: "0 0 28px", fontSize: "1.2rem" }}>Generate Your Certificate</h3>

                        <div style={{ marginBottom: "20px" }}>
                            <label style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.75rem", color: "#4a5568", letterSpacing: "0.1em", textTransform: "uppercase", display: "block", marginBottom: "8px" }}>
                                Registered Email
                            </label>
                            <input
                                type="email"
                                className="modal-input"
                                placeholder="your@email.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        {!certificate ? (
                            <div style={{ display: "flex", gap: "0" }}>
                                <button
                                    onClick={fetchCertificate}
                                    disabled={loadingCertificate || type === "Please Select..."}
                                    style={{
                                        flex: 1, background: type !== "Please Select..." ? "#9FEF00" : "rgba(159,239,0,0.2)",
                                        color: type !== "Please Select..." ? "#0a0f1a" : "#4a5568",
                                        border: "none", padding: "14px 20px",
                                        fontFamily: "'Orbitron', monospace", fontWeight: 700, fontSize: "0.8rem",
                                        letterSpacing: "0.08em", textTransform: "uppercase", cursor: type !== "Please Select..." ? "pointer" : "not-allowed",
                                        transition: "all 0.2s"
                                    }}
                                >
                                    {loadingCertificate ? "Generating..." : "Generate"}
                                </button>
                                <div style={{ borderLeft: "1px solid var(--border-subtle)" }}>
                                    <Select<SelectOption>
                                        hideSelectedOptions
                                        isClearable={false}
                                        isSearchable={false}
                                        placeholder="Type"
                                        options={options}
                                        onChange={changeType}
                                        styles={styles}
                                    />
                                </div>
                            </div>
                        ) : (
                            <a href={certificate} download="Certificate.png" style={{ textDecoration: "none", display: "block" }}>
                                <button className="htb-btn" style={{ width: "100%" }}>
                                    ↓ Download Certificate
                                </button>
                            </a>
                        )}
                    </div>
                </div>
            )}

            {/* Registration Modal */}
            <Modal className="bg-[#0e1420]" closeButton blur aria-labelledby="modal-title" open={visibleReg} onClose={closeHandlerReg}>
                <Modal.Body className="flex justify-center items-center">
                    <ToastContainer />
                    <div style={{ width: "100%", padding: "8px" }}>
                        <div className="section-label">Registration</div>
                        <h3 style={{ fontFamily: "'Orbitron', monospace", color: "#9FEF00", fontSize: "1.2rem", margin: "4px 0 24px" }}>Join the Event</h3>

                        <form onSubmit={submitHandler} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                            {([
                                { name: "name", type: "text", placeholder: "Full Name", onChange: (e: React.ChangeEvent<HTMLInputElement>) => { if (e.target.value.length > 20) Toast(false, "Name cannot exceed 20 characters"); } },
                                { name: "phn", type: "number", placeholder: "Phone Number", onChange: (e: React.ChangeEvent<HTMLInputElement>) => { const v = e.target.value; if (v.length > 10) e.target.value = v.slice(0, 10); } },
                                { name: "usn", type: "text", placeholder: "Registration Number", onChange: undefined },
                                { name: "email", type: "email", placeholder: "Email Address", onChange: undefined },
                                { name: "dept", type: "text", placeholder: "Department", onChange: undefined },
                            ] as { name: string; type: string; placeholder: string; onChange?: React.ChangeEventHandler<HTMLInputElement> }[]).map((field) => (
                                <input key={field.name} required type={field.type} name={field.name} placeholder={field.placeholder} onChange={field.onChange} className="reg-input" />
                            ))}

                            <Radio.Group isRequired value={checked} onChange={setChecked} name="isSrmite" orientation="horizontal">
                                <div style={{ display: "flex", gap: "24px", justifyContent: "center", padding: "8px 0" }}>
                                    <Radio value="true" color="success">SRMite</Radio>
                                    <Radio value="false" color="success">Non-SRMite</Radio>
                                </div>
                            </Radio.Group>

                            <p style={{ textAlign: "center", fontFamily: "'Share Tech Mono', monospace", fontSize: "0.8rem", color: "#4a5568", margin: "4px 0" }}>
                                Find us on{" "}
                                <a href="https://www.meetup.com/chennai-in/" style={{ color: "#9FEF00", textDecoration: "none" }} target="_blank" rel="noopener noreferrer">MEETUP</a>
                            </p>

                            <button type="submit" className="htb-btn" style={{ width: "100%" }} disabled={loadingSubmit}>
                                {loadingSubmit ? "Submitting..." : "Submit Registration"}
                            </button>
                        </form>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
};

export async function getServerSideProps(): Promise<GetServerSidePropsResult<EventsPageProps>> {
    try {
        const response = await fetch(`${url_root}/api/v1/events`);
        const json = await response.json() as { data?: EventProps[] };
        const events: EventProps[] = json?.data ?? [];
        return { props: { events } };
    } catch (error) {
        console.log(error);
        return { props: { events: [] } };
    }
}

export default Event;