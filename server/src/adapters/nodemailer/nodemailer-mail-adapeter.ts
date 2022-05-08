import {MailAdapter, SendMailData} from "../mail-adapter";
import nodemailer from "nodemailer";

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "434550623f8364",
    pass: "39c02f48d2e90f"
  }
});


export class NodemailerMailAdapeter implements MailAdapter{

  async sendMail({subject, body}: SendMailData): Promise<void> {
    await transport.sendMail({
      from: 'Equipe Feedget <oi@feedget.com>',
      to: 'Lucas Nunes <lucasdomingosnunes@gmail.com>',
      subject: subject,
      html: body,
    });
  }

}