import { DBInstance } from "../db.connect";
import { contactUsDBSchema } from "../types/contact";

export const ContactUs = async (
    contactUsData: contactUsDBSchema
): Promise<String> => {
    try {
        const db = await (
            await DBInstance.getInstance()
        ).getCollection("contactus");
        const verifier = db.insertOne({
            name: contactUsData.name,
            email: contactUsData.email,
            question: contactUsData.question,
            contactNo: contactUsData.contactNo
        });
        return "✅ Data successfully Added!";
    } catch (err: any) {
        console.error(err.message);
        return err.message;
    }
};
