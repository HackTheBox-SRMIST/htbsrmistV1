import { DBInstance } from "../db.connect";
import { snsPublisher } from "../../utils/awsServices/snsAWSPublisher";
import { contactUsReqSchema, yupContactUsSchema } from "../types/contactus";

export const ContactUs = async (
    contactUsData: contactUsReqSchema
): Promise<void> => {
    await yupContactUsSchema
        .validate(contactUsData, { abortEarly: false })
        .then(async (value) => {
            //console.log("success", value);
            const db = await (
                await DBInstance.getInstance()
            ).getCollection("contactus");
            db.insertOne({
                name: value.name,
                email: value.email,
                question: value.question,
                countryCode: value.countryCode,
                contactNo: value.contactNo
            });
            await snsPublisher(value);
        });
    // console.log(contactUsData);
};
