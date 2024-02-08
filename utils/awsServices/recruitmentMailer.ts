import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

require("dotenv-vault-core").config();

const REGION = "ap-south-1";
const sesClient = new SESClient({
    region: REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID_HTBSRMIST ?? "",
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY_HTBSRMIST ?? ""
    }
});

export const sendRecruitmentMail = async (
    participant: Record<string, any>
): Promise<void> => {
    const { name, email, domain } = participant;

    const subject = `Recruitment Registration Confirmation | HackTheBox SRMIST`;

    const htmlBody = `
<div>
    <div style="font-family :  Verdana,  Arial,  Helvetica,  sans-serif; font-size :  10pt;">
        <div>
            <div style="font-family  :  Verdana,   Arial,   Helvetica,   sans-serif; font-size  :  10pt;">
                <div dir="ltr" class="x_436002999es-wrapper-color" lang="en" style="background-color :  rgb(46, 59, 102);">
                    <table class="x_436002999es-wrapper" width="100%" cellspacing="0" cellpadding="0" style="border-collapse :  collapse; border-spacing :  0px; padding :  0px; margin :  0px; width :  100%; height :  100%; background-repeat :  repeat; background-position :  center top; background-color :  rgb(46, 59, 102);">
                        <tbody>
                            <tr>
                                <td valign="top" style="padding  :  0; margin  :  0;">
                                    <table cellpadding="0" cellspacing="0" class="x_436002999es-header" align="center" style="border-collapse  :  collapse; border-spacing  :  0px; table-layout  :  fixed; width  :  100%; background-color  :  transparent; background-repeat  :  repeat; background-position  :  center top;">
                                        <tbody>
                                            <tr>
                                                <td align="center" style="padding  :  0; margin  :  0;">
                                                    <table bgcolor="#ffffff" class="x_436002999es-header-body" align="center" cellpadding="0" cellspacing="0" style="border-collapse :  collapse; border-spacing :  0px; width :  600px; background-color :  rgb(208, 211, 251);">
                                                        <tbody>
                                                            <tr>
                                                                <td align="left" bgcolor="#1E2D46" style="padding :  20px; margin :  0px; background-color :  rgb(30, 45, 70);">
                                                                    <table cellpadding="0" cellspacing="0" width="100%" style="border-collapse  :  collapse; border-spacing  :  0px;">
                                                                        <tbody>
                                                                            <tr>
                                                                                <td align="left" style="padding  :  0; margin  :  0; width  :  560px;">
                                                                                    <table cellpadding="0" cellspacing="0" width="100%" style="border-collapse  :  collapse; border-spacing  :  0px;">
                                                                                        <tbody>
                                                                                            <tr>
                                                                                                <td align="center" style="padding  :  0; margin  :  0; font-size  :  0px;">
                                                                                                    <img class="x_436002999adapt-img" src="https://eeevnci.stripocdn.email/content/guids/CABINET_f0dd051ff2d0d417fd000dbcc89d0d3615db18c09c8849965df9227a778e9e78/images/topbaf.png" alt="" style="display  :  block; border  :  0; outline  :  none; text-decoration  :  none;" width="560" height="87">
                                                                                                </td>
                                                                                            </tr>
                                                                                        </tbody>
                                                                                    </table>
                                                                                </td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <table cellpadding="0" cellspacing="0" class="x_436002999es-footer" align="center" style="border-collapse  :  collapse; border-spacing  :  0px; table-layout  :  fixed; width  :  100%; background-color  :  transparent; background-repeat  :  repeat; background-position  :  center top;">
                                        <tbody>
                                            <tr>
                                                <td align="center" style="padding  :  0; margin  :  0;">
                                                    <table class="x_436002999es-footer-body" align="center" cellpadding="0" cellspacing="0" style="border-collapse  :  collapse; border-spacing  :  0px; background-color  :  transparent;">
                                                        <tbody>
                                                            <tr>
                                                                <td class="x_436002999esdev-adapt-off" align="left" style="padding: 30px 20px 0px; margin: 0px; width: 536px;">
                                                                    <table cellpadding="0" cellspacing="0" style="border-collapse  :  collapse; border-spacing  :  0px;">
                                                                        <tbody>
                                                                            <tr>
                                                                                <td align="left" style="padding: 0px; margin: 0px; width: 536px;">
                                                                                    <div>
                                                                                        <span class="size" style="font-size:18.6667px">
                                                                                            <span class="colour" style="color:rgb(153, 255, 153)">
                                                                                                Hello ${name},
                                                                                            </span>
                                                                                            <span class="colour" style="color:rgb(153, 255, 153)">
                                                                                            </span>
                                                                                        </span>
                                                                                        <br>
                                                                                    </div>
                                                                                    <div>
                                                                                        <br>
                                                                                    </div>
                                                                                    <div>
                                                                                        <span class="size" style="font-size:18.6667px">
                                                                                            <span class="colour" style="color:rgb(153, 255, 153)">
                                                                                                Thank you for submitting your application for the HackTheBox SRMIST recruitment in the ${domain} Domain! We appreciate your interest in our club and are excited to learn more about you.
                                                                                            </span>
                                                                                        </span>
                                                                                        <br>
                                                                                    </div>
                                                                                    <div>
                                                                                        <br>
                                                                                    </div>
                                                                                    <div>
                                                                                        <span class="size" style="font-size:18.6667px">
                                                                                            <span class="colour" style="color:rgb(153, 255, 153)">
                                                                                                This emails confirms your registration for the Recruitment Process. You will receive further steps very shortly, so please keep an eye on your registered email.
                                                                                            </span>
                                                                                        </span>
                                                                                        <br>
                                                                                    </div>
                                                                                    <div>
                                                                                        <br>
                                                                                    </div>
                                                                                    <div>
                                                                                        <span class="size" style="font-size:18.6667px">
                                                                                            <span class="colour" style="color:rgb(153, 255, 153)">
                                                                                                Meanwhile, check us out on our Social Media platforms
                                                                                            </span>
                                                                                        </span>
                                                                                        <br>
                                                                                    </div>
                                                                                    <div>
                                                                                        <br>
                                                                                    </div>
                                                                                    <div>
                                                                                        <br>
                                                                                    </div>
                                                                                    <div>
                                                                                        <span class="size" style="font-size:18.6667px">
                                                                                            <span class="colour" style="color:rgb(153, 255, 153)">
                                                                                                Best regards,
                                                                                            </span>
                                                                                            <span class="colour" style="color:rgb(153, 255, 153)">
                                                                                            </span>
                                                                                        </span>
                                                                                        <br>
                                                                                    </div>
                                                                                    <div>
                                                                                        <br>
                                                                                    </div>
                                                                                    <div>
                                                                                        <span class="size" style="font-size:18.6667px">
                                                                                            <span class="colour" style="color:rgb(153, 255, 153)">
                                                                                                HackTheBox SRMIST
                                                                                            </span>
                                                                                        </span>
                                                                                        <br>
                                                                                    </div>
                                                                                </td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <table cellpadding="0" cellspacing="0" class="x_436002999es-content" align="center" style="border-collapse  :  collapse; border-spacing  :  0px; table-layout  :  fixed; width  :  100%;">
                                        <tbody>
                                            <tr>
                                                <td align="center" style="padding  :  0; margin  :  0;">
                                                    <table class="x_436002999es-content-body" align="center" cellpadding="0" cellspacing="0" style="border-collapse  :  collapse; border-spacing  :  0px; background-color  :  transparent; width  :  600px;">
                                                        <tbody>
                                                            <tr>
                                                                <td align="left" bgcolor="#1E2D46" style="padding :  5px 0px 0px; margin :  0px; background-color :  rgb(30, 45, 70);">
                                                                    <table cellpadding="0" cellspacing="0" width="100%" style="border-collapse  :  collapse; border-spacing  :  0px;">
                                                                        <tbody>
                                                                            <tr>
                                                                                <td align="left" style="padding  :  0; margin  :  0; width  :  600px;">
                                                                                    <table cellpadding="0" cellspacing="0" width="100%" style="border-collapse  :  collapse; border-spacing  :  0px;">
                                                                                        <tbody>
                                                                                            <tr>
                                                                                                <td align="center" style="padding  :  0; margin  :  0; padding-top  :  10px;">
                                                                                                    <p style="margin  :  0px; line-height  :  24px;">
                                                                                                        <span class="colour" style="color:rgb(159, 239, 0)">
                                                                                                            <span class="font" style="font-family:Syne, Arial, sans-serif">
                                                                                                                <span class="size" style="font-size: 16px; margin: 0px; line-height: 24px;">
                                                                                                                    <b>
                                                                                                                        HackTheBox SRMIST
                                                                                                                    </b>
                                                                                                                </span>
                                                                                                            </span>
                                                                                                        </span>
                                                                                                        <br>
                                                                                                    </p>
                                                                                                </td>
                                                                                            </tr>
                                                                                        </tbody>
                                                                                    </table>
                                                                                </td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <table cellpadding="0" cellspacing="0" class="x_436002999es-content" align="center" style="border-collapse  :  collapse; border-spacing  :  0px; table-layout  :  fixed; width  :  100%;">
                                        <tbody>
                                            <tr>
                                                <td align="center" style="padding  :  0; margin  :  0;">
                                                    <table class="x_436002999es-content-body" align="center" cellpadding="0" cellspacing="0" style="border-collapse  :  collapse; border-spacing  :  0px; background-color  :  transparent; width  :  600px;">
                                                        <tbody>
                                                            <tr>
                                                                <td align="left" bgcolor="#1e2d46" style="padding :  20px; margin :  0px; background-color :  rgb(30, 45, 70);">
                                                                    <table cellpadding="0" cellspacing="0" width="100%" style="border-collapse  :  collapse; border-spacing  :  0px;">
                                                                        <tbody>
                                                                            <tr>
                                                                                <td align="center" valign="top" style="padding  :  0; margin  :  0; width  :  560px;">
                                                                                    <table cellpadding="0" cellspacing="0" width="100%" style="border-collapse  :  collapse; border-spacing  :  0px;">
                                                                                        <tbody>
                                                                                            <tr>
                                                                                                <td align="center" style="padding  :  0; margin  :  0; font-size  :  0;">
                                                                                                    <table cellpadding="0" cellspacing="0" class="x_436002999es-table-not-adapt x_436002999es-social" style="border-collapse  :  collapse; border-spacing  :  0px;">
                                                                                                        <tbody>
                                                                                                            <tr>
                                                                                                                <td align="center" valign="top" style="padding  :  0; margin  :  0; padding-right  :  20px;">
                                                                                                                    <a target="_blank" href="https://instagram.com/htbsrmist" style="text-decoration :  underline; font-size :  16px; color :  rgb(60, 9, 108);">
                                                                                                                        <img src="https://eeevnci.stripocdn.email/content/assets/img/social-icons/circle-colored/instagram-circle-colored.png" alt="Ig" title="Instagram" width="24" height="24" style="display :  block; border :  0px; outline :  none; text-decoration :  none;">
                                                                                                                    </a>
                                                                                                                </td>
                                                                                                                <td align="center" valign="top" style="padding  :  0; margin  :  0; padding-right  :  20px;">
                                                                                                                    <a target="_blank" href="https://www.linkedin.com/company/htbsrmist/" style="text-decoration :  underline; font-size :  16px; color :  rgb(60, 9, 108);">
                                                                                                                        <img src="https://eeevnci.stripocdn.email/content/assets/img/social-icons/circle-colored/linkedin-circle-colored.png" alt="In" title="Linkedin" width="24" height="24" style="display :  block; border :  0px; outline :  none; text-decoration :  none;">
                                                                                                                    </a>
                                                                                                                </td>
                                                                                                                <td align="center" valign="top" style="padding  :  0; margin  :  0; padding-right  :  20px;">
                                                                                                                    <a target="_blank" href="https://htbsrmist.tech" style="text-decoration :  underline; font-size :  16px; color :  rgb(60, 9, 108);">
                                                                                                                        <img src="https://eeevnci.stripocdn.email/content/assets/img/other-icons/circle-colored/link-circle-colored.png" alt="Website" title="Website" width="24" height="24" style="display :  block; border :  0px; outline :  none; text-decoration :  none;">
                                                                                                                    </a>
                                                                                                                </td>
                                                                                                                <td align="center" valign="top" style="padding  :  0; margin  :  0; padding-right  :  20px;">
                                                                                                                    <a target="_blank" href="https://discord.gg/vpWEV7bhms" style="text-decoration :  underline; font-size :  16px; color :  rgb(60, 9, 108);">
                                                                                                                        <img src="https://eeevnci.stripocdn.email/content/assets/img/messenger-icons/circle-colored/discort-circle-colored.png" alt="Discord" title="Discord" width="24" height="24" style="display :  block; border :  0px; outline :  none; text-decoration :  none;">
                                                                                                                    </a>
                                                                                                                </td>
                                                                                                                <td align="center" valign="top" style="padding  :  0; margin  :  0; padding-right  :  20px;">
                                                                                                                    <a target="_blank" href="https://x.com/htbsrmist" style="text-decoration :  underline; font-size :  16px; color :  rgb(60, 9, 108);">
                                                                                                                        <img src="https://eeevnci.stripocdn.email/content/assets/img/social-icons/circle-colored/x-circle-colored.png" alt="X" title="X.com" width="24" height="24" style="display :  block; border :  0px; outline :  none; text-decoration :  none;">
                                                                                                                    </a>
                                                                                                                </td>
                                                                                                                <td align="center" valign="top" style="padding  :  0; margin  :  0; padding-right  :  20px;">
                                                                                                                    <a target="_blank" href="https://www.meetup.com/chennai-in/" style="text-decoration :  underline; font-size :  16px; color :  rgb(60, 9, 108);">
                                                                                                                        <img src="https://eeevnci.stripocdn.email/content/assets/img/social-icons/circle-colored/meetup-circle-colored.png" alt="Meetup" title="Meetup" width="24" height="24" style="display :  block; border :  0px; outline :  none; text-decoration :  none;">
                                                                                                                    </a>
                                                                                                                </td>
                                                                                                                <td align="center" valign="top" style="padding  :  0; margin  :  0;">
                                                                                                                    <a target="_blank" href="https://github.com/HackTheBox-SRMIST" style="text-decoration :  underline; font-size :  16px; color :  rgb(60, 9, 108);">
                                                                                                                        <img src="https://eeevnci.stripocdn.email/content/assets/img/other-icons/circle-colored/github-circle-colored.png" alt="GitHub" title="GitHub" width="24" height="24" style="display :  block; border :  0px; outline :  none; text-decoration :  none;">
                                                                                                                    </a>
                                                                                                                </td>
                                                                                                            </tr>
                                                                                                        </tbody>
                                                                                                    </table>
                                                                                                </td>
                                                                                            </tr>
                                                                                        </tbody>
                                                                                    </table>
                                                                                </td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
`;

    const params = {
        Destination: {
            ToAddresses: [email]
        },
        Message: {
            Body: {
                Html: {
                    Data: htmlBody
                }
            },
            Subject: {
                Data: subject
            }
        },
        Source: `"HackTheBox SRMIST" <${process.env.SES_SENDER_EMAIL}>`,
        ReplyToAddresses: [process.env.SES_SENDER_EMAIL as string]
    };

    try {
        const metaData = await sesClient.send(new SendEmailCommand(params));
        console.log(
            "📧 Email sent to",
            email,
            "MessageId: ",
            metaData.MessageId
        );
    } catch (err: any) {
        console.error("AWS SES Error:", err);
        throw "AWS SES Error!";
    }
};
