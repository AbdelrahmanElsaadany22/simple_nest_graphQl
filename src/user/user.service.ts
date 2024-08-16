import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './schema/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserInput } from '../auth/dto/create-user-input';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private readonly userModel: Model<User>,
      ) {}
      async getAllUsers(): Promise<User[]> {
        return this.userModel.find().select('-password').exec();
      }
    
      async getUserById(id: string): Promise<User> {
        const userById = await this.userModel.findById(id).exec();
        console.log(userById);
        return userById;
      }
    
      async createUser(createUserInput: CreateUserInput): Promise<User> {
        const createdUser = new this.userModel(createUserInput);
        console.log(createdUser);
        return createdUser.save();
      }
    
      async findUser(email: string): Promise<User> {
        const user = await this.userModel.findOne({ email }).exec();
        if (!user) {
          throw new NotFoundException('User not found');
        }
        return user;
      }
    
      async updateUser(userId: string, upload: Partial<User>): Promise<User> {
        const updatedUser = await this.userModel
          .findByIdAndUpdate(userId, upload, { new: true })
          .exec();
        console.log(updatedUser);
        return updatedUser;
      }
}
