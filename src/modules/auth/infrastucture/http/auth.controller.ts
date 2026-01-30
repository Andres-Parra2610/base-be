import '@fastify/cookie'; //
import { Body, Controller, Post, Headers as HeadersDec, Res } from '@nestjs/common';
import { LoginAuthDto } from './dto/create-auth.dto';
import { LoginUseCase } from '../../application/use-cases/login.usecase';
import { FastifyReply } from 'fastify';
import { env } from '@/src/config/env';

@Controller('auth')
export class AuthController {
  constructor(private readonly loginUseCase: LoginUseCase) {}

  @Post('login')
  async login(
    @Body() dto: LoginAuthDto,
    @HeadersDec('x-device') device: string,
    @Res({ passthrough: true }) res: FastifyReply,
  ) {
    const result = await this.loginUseCase.execute(dto);

    console.log(device);

    if (device === 'web') {
      (res as any).setCookie('token', result.token, {
        httpOnly: true,
        path: '/',
        signed: true,
        secure: env.NODE_ENV === 'production',
      });
      return { user: result.user };
    }

    return result;
  }
}
