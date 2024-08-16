import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message } from './message.schema';
import { User } from 'src/user/schema/user.schema';


@Injectable()
export class MessageService {
  constructor(@InjectModel(Message.name) private messageModel: Model<Message>,
  @InjectModel(User.name) private userModel: Model<User>,
) {}

  async getAllMessages(): Promise<Message[]> {
    return this.messageModel.find().exec();
  }

  async createMessage(message: string, receiver: string,sender:string): Promise<Message> {
    const ifFound=await this.userModel.findById(sender)
    if(!ifFound)
        throw new UnauthorizedException('Please Login First To Can Make This Operation')
    const receiverHandle=await this.userModel.findById(receiver)
    if(!receiverHandle )
      throw new NotFoundException("Sorry There Is No User By This Id To Send")
    const newMessage = new this.messageModel({ message, receiver });
    return newMessage.save();
  }
  async getMessagesForUser(userId: string): Promise<Message[]> {
    const messages = await this.messageModel.find({ receiver: userId });
    if (messages.length === 0) {
      throw new NotFoundException("Sorry, there are no messages.");
    }
    return messages;
  }
  async deleteMessage(messageId:string,ownerId:string):Promise<Message>{
    const message=await this.messageModel.findById(messageId)
    if(!message)
      throw new NotFoundException("No message by this Id")
    if(message.receiver===ownerId)
      await this.messageModel.findByIdAndDelete(messageId)
    return message
  }
  
}
