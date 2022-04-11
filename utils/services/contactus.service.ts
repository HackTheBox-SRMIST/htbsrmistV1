import { DBInstance } from "../db.connect";
import { snsPublisher } from "../../utils/awsServices/snsAWSPublisher";
import {
    contactUsReqSchema,
    yupContactUsSchema
} from "../middleware/contactValidator";

export const ContactUs = async (
    contactUsData: contactUsReqSchema
): Promise<{ message: String; success: boolean }> => {
    try {
        if (await yupContactUsSchema.isValid(contactUsData)) {
            const snsChecker = await snsPublisher(contactUsData);
            if (snsChecker == 200) {
                const db = await (
                    await DBInstance.getInstance()
                ).getCollection("contactus");
                db.insertOne({
                    name: contactUsData.name,
                    email: contactUsData.email,
                    question: contactUsData.question,
                    countryCode: contactUsData.countryCode,
                    contactNo: contactUsData.contactNo
                });
                return {
                    message: "✅ Data successfully Added!",
                    success: true
                };
            }
            throw "📳️ AWS SNS Error!";
        } else {
            throw "🚩 Invalid Input Format";
        }
    } catch (err: any) {
        console.error(err);
        return { message: err, success: false };
    }
};
