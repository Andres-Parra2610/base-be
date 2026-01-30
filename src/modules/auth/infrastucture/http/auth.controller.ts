import '@fastify/cookie';
import { Body, Controller, Post, Headers as HeadersDec, Res, Req } from '@nestjs/common';
import { LoginAuthDto } from './dto/create-auth.dto';
import { LoginUseCase } from '../../application/use-cases/login.usecase';
import { FastifyReply } from 'fastify';
import { env } from '@/src/config/env';

import { RefreshTokenUseCase } from '../../application/use-cases/refresh-token.usecase';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly loginUseCase: LoginUseCase,
    private readonly refreshTokenUseCase: RefreshTokenUseCase,
  ) {}

  @Post('login')
  async login(
    @Body() dto: LoginAuthDto,
    @HeadersDec('x-device') device: string,
    @Res({ passthrough: true }) res: FastifyReply,
  ) {
    const result = await this.loginUseCase.execute(dto);

    if (device === 'web') {
      (res as any).setCookie('access_token', result.token, {
        httpOnly: true,
        path: '/',
        signed: true,
        secure: env.NODE_ENV === 'production',
      });
      (res as any).setCookie('refresh_token', result.refreshToken, {
        httpOnly: true,
        path: '/',
        signed: true,
        secure: env.NODE_ENV === 'production',
      });
      return { user: result.user };
    }

    return result;
  }

  @Post('refresh')
  async refresh(
    @HeadersDec('x-device') device: string,
    @Res({ passthrough: true }) res: FastifyReply,
    @Body() body: { refreshToken: string },
    @Req() req: any,
  ) {
    let refreshToken = body?.refreshToken;

    if (device === 'web') {
      refreshToken = req.cookies['refresh_token'];
    }

    if (!refreshToken) {
      throw new Error('No refresh token provided');
    }

    const result = await this.refreshTokenUseCase.execute(refreshToken);

    if (device === 'web') {
      (res as any).setCookie('access_token', result.token, {
        httpOnly: true,
        path: '/',
        signed: true,
        secure: env.NODE_ENV === 'production',
      });
      (res as any).setCookie('refresh_token', result.refreshToken, {
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
