import { PartialType } from '@nestjs/mapped-types';
import { CreateClaimDto } from './create.dto';

export class UpdateClaimDto extends PartialType(CreateClaimDto) {}
