import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class IUser {
  @Field(() => String)
  _id: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  password: string;

}