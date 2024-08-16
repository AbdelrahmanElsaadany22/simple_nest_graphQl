import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class deleteMessageInput {
  @Field()
  messageId: string;
}
