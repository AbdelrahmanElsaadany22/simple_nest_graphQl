import { JwtService } from '@nestjs/jwt';

export default class ApiFeatures {
  static async assignJwtToken(userID: string, jwtService: JwtService): Promise<string> {
    try {
      const payload = { id: userID };
      const token = await jwtService.signAsync(payload);
      return token;
    } catch (error) {
      console.error('Error generating JWT token:', error);
      throw new Error('Unable to generate JWT token');
    }
  }
}
