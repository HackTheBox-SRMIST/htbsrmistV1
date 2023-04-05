import * as yup from "yup";

export interface teamsDBSchema {
    index: number;
    name: string;
    domain: string;
    position: string;
    caption: string;
    joined: number;
    pictureUrl: string;
    isCurrent: boolean;
    socials: {
        github?: string;
        website?: string;
        linkedin?: string;
        twitter?: string;
    };
}

export const yupTeamsSchema = yup
    .string()
    .trim()
    .max(5, "Max characters exceeded!!");

export type teamsReqSchema = yup.InferType<typeof yupTeamsSchema>;
