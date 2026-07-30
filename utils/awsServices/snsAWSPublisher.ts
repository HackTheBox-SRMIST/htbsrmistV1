import { SNSClient, PublishCommand } from "@aws-sdk/client-sns";
import { contactUsReqSchema } from "../types/contactus";

require("dotenv-vault-core").config();

export const snsPublisher = async (data: contactUsReqSchema): Promise<void> => {
    const accessKeyId = process.env.AWS_ACCESS_KEY_ID_HTBSRMIST;
    const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY_HTBSRMIST;
    const topicArn = process.env.AWS_SNS_TOPIC_ARN;

    if (!accessKeyId || !secretAccessKey || !topicArn) {
        console.warn(
            "⚠️ AWS SNS credentials or AWS_SNS_TOPIC_ARN missing from environment. Skipping SNS publish."
        );
        return;
    }

    // Dynamically extract region from topic ARN (e.g., arn:aws:sns:eu-north-1:...)
    const region = process.env.AWS_REGION || topicArn.split(":")[3] || "ap-south-1";

    const snsClient = new SNSClient({
        region,
        credentials: {
            accessKeyId,
            secretAccessKey
        }
    });

    const message = `
    New Contact Us Query Received:\n
    ${JSON.stringify(data, null, "\t")}\n
    Timestamp: ${new Date().toISOString()}\n
    `;

    const params = {
        Message: message,
        TopicArn: topicArn
    };

    try {
        const metaData = await snsClient.send(new PublishCommand(params));
        console.log("📨 MessageID: ", metaData.MessageId);
    } catch (err: any) {
        console.error("❌ AWS SNS Publish Error:", err);
        throw new Error(`AWS SNS Error: ${err?.message || err}`);
    }
};
