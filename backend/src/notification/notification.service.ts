// src/notification/notification.service.ts
import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class NotificationService {
  constructor(private readonly mailerService: MailerService) {}

  async sendExpenseUpdateNotification(
    emails: string[],
    expenseDetails: string,
  ): Promise<void> {
    await this.mailerService.sendMail({
      to: emails,
      subject: 'Expense Updated',
      text: `An expense has been updated: ${expenseDetails}`,
    });
  }
}
