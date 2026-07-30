import * as yup from "yup";

const countryCodeRegex = /^\+\d{1,4}$/;
const phoneRegExp =
    /^(\+?[0-9]{1,4}[ \-]*)?(\([0-9]{2,4}\)[ \-]*)?[0-9]{3,4}[ \-]*[0-9]{3,5}$/;

export interface contactUsDBSchema {
    name: string;
    email: string;
    question: string;
    countryCode?: string;
    contactNo?: string;
    createdAt?: Date;
}
export const yupContactUsSchema = yup
    .object({
        name: yup
            .string()
            .trim()
            .required("Name field is required!")
            .min(3, "Name must be at least 3 characters")
            .max(255),
        email: yup
            .string()
            .trim()
            .email("Must be a valid Email")
            .min(6, "Email must be at least 6 characters!")
            .max(255)
            .required("Email field is required!"),
        question: yup
            .string()
            .trim()
            .required("Question field is required!")
            .min(30, "Question/Message must be at least 30 characters!")
            .max(1000, "Question/Message cannot exceed 1000 characters!"),
        countryCode: yup
            .string()
            .trim()
            .matches(countryCodeRegex, "Invalid Country Code!"),
        contactNo: yup
            .string()
            .trim()
            .matches(phoneRegExp, "Mobile Number is not valid!")
            .max(25)
            .nullable()
    })
    .noUnknown(true)
    .required();
export type contactUsReqSchema = yup.InferType<typeof yupContactUsSchema>;

