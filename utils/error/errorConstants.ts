const today = new Date();
const date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
const time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
const dateTime = date + " " + time;

export const logTime = {
    dateTime: dateTime,
    date: date,
    time: time
};

export const errors = {
    BAD_REQUEST: {
        httpStatus: 400,
        message: "❓ Bad Request."
    },
    INTERNAL_SERVER_ERROR: {
        httpStatus: 500,
        message: "🔌 Internal Server Error."
    },
    NOT_FOUND: {
        httpStatus: 404,
        message: "❌ Resource Not Found."
    },
    MONGODB_CONNECT_ERROR: {
        httpStatus: 503,
        message: "🐛 Could Not Connect to MongoDB."
    },
    CORS_ERROR: {
        httpStatus: 502,
        message: "⛔ Not Allowed by CORS."
    },
    FORBIDDEN: {
        httpStatus: 403,
        message: "🚫 Action Forbidden."
    }
};
