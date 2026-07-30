import { NextApiResponse } from "next";
import { errors } from "./errorConstants";

export default function (
    err: any,
    res: NextApiResponse,
    TYPE: string
) {
    const timestamp = new Date().toISOString();
    
    // Check if error is a Yup ValidationError
    if (err && (err.name === "ValidationError" || Array.isArray(err.errors))) {
        let message: string = "";
        if (Array.isArray(err.errors) && err.errors.length > 0) {
            message = err.errors.join(". ");
        } else {
            message = err.message || "Validation failed";
        }

        console.error(
            `[${timestamp}] 👉 ValidationError: \n  🟠 ${message}`
        );
        return res.status(422).json({
            success: false,
            message: message
        });
    }

    // Check if error is a MongoDB Connection/DNS failure
    const isMongoConnError =
        err?.code === "ECONNREFUSED" ||
        err?.syscall === "querySrv" ||
        err?.name === "MongoNetworkError" ||
        err?.name === "MongoServerSelectionError" ||
        err?.message?.includes("querySrv") ||
        err?.message?.includes("ECONNREFUSED");

    if (isMongoConnError) {
        console.error(
            `[${timestamp}] 👉 Database Connection Error: \n  🔴 ${err?.message || err}`
        );
        return res.status(errors.MONGODB_CONNECT_ERROR.httpStatus).json({
            success: false,
            message: errors.MONGODB_CONNECT_ERROR.message
        });
    }

    // Default error handling
    const errorName = err?.name || err?.message || (typeof err === "string" ? err : "Unknown Error");
    console.error(
        `[${timestamp}] 👉 ${errorName} \n  📢 ${err?.stack || err}`
    );

    const errorConfig = errors[TYPE as keyof typeof errors] || errors.INTERNAL_SERVER_ERROR;
    return res.status(errorConfig.httpStatus).json({
        success: false,
        message: errorConfig.message
    });
}


