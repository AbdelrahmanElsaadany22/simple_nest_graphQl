import { Field, ObjectType } from '@nestjs/graphql';
import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';


@ObjectType()
@Schema()
export class User {
  @Field(() => String)
  @Prop()
  name: string;

  @Field(() => String)
  @Prop({ unique: true })
  email: string;

  @Field(() => String)
  @Prop()
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);