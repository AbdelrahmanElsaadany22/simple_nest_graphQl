import { Field, InputType,ObjectType } from '@nestjs/graphql';

@InputType()
export class loginUserInput {

  @Field()
  email: string;

  @Field()
  password: string;
}


@ObjectType()
export class TokenType {
  @Field(()=>String)
  token: string;
}
