import { SNSClient } from "@aws-sdk/client-sns";
import { PublishCommand } from "@aws-sdk/client-sns";
import { contactUsReqSchema } from "../middleware/contactValidator";

const REGION = "ap-south-1";
const snsClient = new SNSClient({ region: REGION });

export const snsPublisher = async (
    data: contactUsReqSchema
): Promise<number | undefined> => {
    const snsMessage: string = "New contactUS Message from: " + data.email;

    const params = {
        Message: snsMessage, // MESSAGE_TEXT
        TopicArn: process.env.AWS_SNS_TOPIC_ARN //TOPIC_ARN
    };
    try {
        const metaData = await snsClient.send(new PublishCommand(params));
        console.log("MessageID: ", metaData.MessageId);
        //console.log(metaData);
        return metaData.$metadata.httpStatusCode;
    } catch (err) {
        console.log("Error", err);
        return 400;
    }
};
