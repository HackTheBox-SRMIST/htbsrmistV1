import { SNSClient, PublishCommand } from "@aws-sdk/client-sns";
import { contactUsReqSchema } from "../middleware/contactValidator";

const REGION = "ap-south-1";
const snsClient = new SNSClient({ region: REGION });

export const snsPublisher = async (data: contactUsReqSchema): Promise<void> => {
    //console.log(data);
    const params = {
        Message: JSON.stringify(data, null, "\t"), // MESSAGE_TEXT
        TopicArn: process.env.AWS_SNS_TOPIC_ARN //TOPIC_ARN
    };
    try {
        const metaData = await snsClient.send(new PublishCommand(params));
        console.log("📨 MessageID: ", metaData.MessageId);
        //console.log(metaData);
    } catch (err: any) {
        console.log("Error", err);
    }
};
