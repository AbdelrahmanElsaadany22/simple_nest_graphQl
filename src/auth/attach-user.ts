// auth.middleware.ts
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';
import { ExtractJwt } from 'passport-jwt';
import { CustomRequest } from './custom-request.interface'; // Import the custom interface

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  async use(req: CustomRequest, res: Response, next: NextFunction): Promise<void> {
    const token = ExtractJwt.fromAuthHeaderAsBearerToken()(req);
    if (token) {
      try {
        const user = await this.jwtService.verifyAsync(token);
        req.user = user; // Attach the user object to the custom request
        console.log('uid',req.user.id)
      } catch (e) {
        console.error('Invalid token', e);
      }
    }
    next();
  }
}
