import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';


@Injectable()
export class EmailService {
    constructor(private readonly mailerService: MailerService) { }

    sendMail(to: string, subject: string, message: string) {
        this.mailerService.sendMail({
            from: process.env.EMAIL_USERNAME,
            to,
            subject,
            html: message
        })
    }
}
