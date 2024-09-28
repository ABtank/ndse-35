import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class ValidateCreateBookDtoPipe implements PipeTransform {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  transform(value: any, metadata: ArgumentMetadata) {
    if (!value || typeof value !== 'object') {
      throw new BadRequestException('Validation failed');
    }

    // Проверяем наличие определенных полей
    const requiredFields = ['title', 'description', 'authors'];
    for (const field of requiredFields) {
      if (!value[field]) {
        throw new BadRequestException(`Missing field: ${field}`);
      }
    }

    return value;
  }
}
