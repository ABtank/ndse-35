import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import * as Joi from 'joi';

@Injectable()
export class JoiValidationUpdateBookPipe implements PipeTransform {
  private schema = Joi.object({
    title: Joi.string().optional(),
    description: Joi.string().optional(),
    authors: Joi.array().items(Joi.string()).optional(),
    favorite: Joi.boolean().optional(),
  });

  transform(value: any, metadata: ArgumentMetadata) {
    console.log(value);
    const { error } = this.schema.validate(value);
    console.log(error);
    if (error) {
      throw new BadRequestException(`Validation failed ${error.message}`);
    }
    return value;
  }
}
