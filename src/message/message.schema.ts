import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
@ObjectType()
export class Message extends Document {
  @Field(() => ID)
  _id: string;

  @Prop({ required: true })
  @Field()
  message: string;
  
  @Prop({ required: true })
  @Field()
  receiver: string;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
