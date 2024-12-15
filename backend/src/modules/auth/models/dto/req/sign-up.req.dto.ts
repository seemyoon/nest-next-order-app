
import { PickType } from '@nestjs/swagger';

import { BaseAuthReqDto } from './base-auth.req.dto';

export class SignUpReqDto extends PickType(BaseAuthReqDto, [
  'email',
  'phoneNumber',
  'password',
  'deviceId',
  'role',
  'name',
]) {}