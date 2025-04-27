import { applyDecorators, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

export function NeedAuth() {
    return applyDecorators(
      UseGuards(AuthGuard('jwt'))
    );
}
