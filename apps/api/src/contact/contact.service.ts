import { Injectable } from '@nestjs/common';
import type { ContactMessage } from '@portfolio/shared';
import { PrismaService } from '../prisma/prisma.service';
import { CreateContactDto } from './dto/create-contact.dto';

@Injectable()
export class ContactService {
  constructor(private readonly prismaService: PrismaService) {}

  async createContactMessage(dto: CreateContactDto): Promise<ContactMessage> {
    const record = await this.prismaService.contactMessage.create({
      data: {
        name: dto.name.trim(),
        email: dto.email.trim().toLowerCase(),
        subject: dto.subject.trim(),
        message: dto.message.trim(),
      },
    });

    return {
      id: record.id,
      name: record.name,
      email: record.email,
      subject: record.subject,
      message: record.message,
      createdAt: record.createdAt.toISOString(),
    };
  }
}
