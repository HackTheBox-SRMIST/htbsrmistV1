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
