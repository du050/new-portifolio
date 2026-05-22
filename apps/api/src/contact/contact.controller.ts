import { Body, Controller, Post } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import type { ApiResponse, ContactMessage } from '@portfolio/shared';
import { createApiResponse } from '../common/utils/api-response.util';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  @Throttle({ default: { limit: 5, ttl: 60000 } })
  async createContact(
    @Body() dto: CreateContactDto,
  ): Promise<ApiResponse<ContactMessage>> {
    const message = await this.contactService.createContactMessage(dto);
    return createApiResponse(message);
  }
}
