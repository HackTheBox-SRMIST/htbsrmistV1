import { SNSClient } from "@aws-sdk/client-sns";
import { PublishCommand } from "@aws-sdk/client-sns";

const REGION = "ap-south-1";
const snsClient = new SNSClient({ region: REGION });

var params = {
    Message: "Hello Test", // MESSAGE_TEXT
    TopicArn: process.env.AWS_SNS_TOPIC_ARN //TOPIC_ARN
};

export const snsPublisher = async () => {
    try {
        const data = await snsClient.send(new PublishCommand(params));
        console.log("Success.", data);
    } catch (err) {
        console.log("Error", err);
    }
};
