import type { NextApiRequest, NextApiResponse } from "next";

type HealthCheckData = {
    success: boolean;
    message: string;
    timestamp: string;
    uptime: number;
};

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<HealthCheckData>
) {
    res.status(200).json({
        success: true,
        message: "API v1 working!",
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
}
