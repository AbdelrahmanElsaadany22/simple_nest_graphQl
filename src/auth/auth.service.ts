import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { User } from 'src/user/schema/user.schema';
import * as bcrypt from 'bcryptjs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import ApiFeatures from 'src/utils/apiFeatures';
import { loginUserInput } from './dto/login-user.dtp';
import { CreateUserInput } from './dto/create-user-input';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
        @InjectModel(User.name) private userModel: Model<User>
    ) {}

    async signup(createUserInput:CreateUserInput): Promise<User> {
        const{name,email,password}=createUserInput
        const hashedPassword = await bcrypt.hash(password, parseInt(process.env.SALT));
        const user = await this.userModel.create({ name:name, email:email, password: hashedPassword });
        return user
    }

    async login(loginUser: loginUserInput): Promise<{ token: string }> {
        const { email, password } = loginUser;
        const user = await this.userModel.findOne({ email }).select('+password');
        if (!user) {
            throw new UnauthorizedException('Invalid Email Address Or Password.');
        }
        const isPasswordMatched = await bcrypt.compare(password, user.password);
        if (!isPasswordMatched) {
            throw new UnauthorizedException('The Password Is Incorrect.');
        }
        const token = await ApiFeatures.assignJwtToken(user._id.toString(), this.jwtService);
        return { token };
    }
}
