import { DBInstance } from "../db.connect";
import { snsPublisher } from "../../utils/awsServices/snsAWSPublisher";
import { contactUsReqSchema, yupContactUsSchema } from "../types/contactus";

export const ContactUs = async (
    contactUsData: contactUsReqSchema
): Promise<void> => {
    // 1. Validate payload with Yup schema
    const value = await yupContactUsSchema.validate(contactUsData, {
        abortEarly: false
    });

    console.log("✅ Contact Us Validation Passed for:", value.email);

    // 2. Persist record into MongoDB (awaiting insertOne explicitly)
    const dbInstance = await DBInstance.getInstance();
    const db = await dbInstance.getCollection("contactus");

    const insertResult = await db.insertOne({
        name: value.name,
        email: value.email,
        question: value.question,
        countryCode: value.countryCode || "+91",
        contactNo: value.contactNo || "",
        createdAt: new Date()
    });

    console.log("💾 Contact Us Saved to DB with ID:", insertResult.insertedId);

    // 3. Attempt SNS notification non-fatally (log warning on failure so DB record is preserved)
    try {
        await snsPublisher(value);
    } catch (snsErr) {
        console.warn("⚠️ SNS notification warning (DB record saved successfully):", snsErr);
    }
};

