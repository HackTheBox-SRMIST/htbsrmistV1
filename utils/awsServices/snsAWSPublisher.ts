import { SNSClient, PublishCommand } from "@aws-sdk/client-sns";
import { contactUsReqSchema } from "../types/contactus";

require("dotenv-vault-core").config();

const REGION = "ap-south-1";
const snsClient = new SNSClient({
    region: REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID_HTBSRMIST ?? "",
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY_HTBSRMIST ?? ""
    }
});

export const snsPublisher = async (data: contactUsReqSchema): Promise<void> => {
    //console.log(data);
    const message = `
    New Contact Us Query Received:\n
    ${JSON.stringify(data, null, "\t")}\n
    Timestamp: ${new Date().toISOString()}\n
    `;
    const params = {
        Message: message, // MESSAGE_TEXT
        TopicArn: process.env.AWS_SNS_TOPIC_ARN //TOPIC_ARN
    };
    try {
        const metaData = await snsClient.send(new PublishCommand(params));
        console.log("📨 MessageID: ", metaData.MessageId);
        //console.log(metaData);
    } catch (err: any) {
        console.error("AWS Error:", err);
        throw "AWS SNS Error!";
    }
};
