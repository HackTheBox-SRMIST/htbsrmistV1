import { NextApiResponse } from "next";
import { errors, logTime } from "./errorConstants";

export default function (
    err: { errors: string[]; name: string },
    res: NextApiResponse,
    TYPE: string
) {
    if (err.name === "ValidationError") {
        let message: string = "";
        err.errors?.forEach((e: string) => {
            message += `${e}. `;
        });
        console.error(
            `${logTime.dateTime} 👉 ValidationError: \n  🟠 ${message}`
        );
        res.status(422).json({
            success: false,
            message: message
        });
    } else {
        console.error(`${logTime.dateTime} 👉 ${err.name} \n  📢 ${err}`);
        res.status(errors[TYPE as keyof typeof errors].httpStatus).json({
            success: false,
            message: errors[TYPE as keyof typeof errors].message
        });
    }
}
