import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { MessageService } from './message.service';
import { Message } from './message.schema';
import { CreateMessageInput } from './dto/create-message.input';
import { UnauthorizedException, UseGuards } from '@nestjs/common';
import { deleteMessageInput } from './dto/delete-message.input';

@Resolver(of => Message)
export class MessageResolver {
  constructor(private readonly messageService: MessageService) {}

  @Query(returns => [Message])    
  async messages(): Promise<Message[]> {
    return this.messageService.getAllMessages();
  }

  @Query(() => [Message])
  async userMessages(
    @Args('id') id: string
  ): Promise<Message[]> {
    return this.messageService.getMessagesForUser(id);
  }
  @Mutation(() => Message)
  async createMessage(
    @Args('createMessageInput') createMessageInput: CreateMessageInput,
    @Context() context: { req: any }
  ): Promise<Message> {
    const user = context.req.user;
    const sender = user?.id;

    if (!sender) {
      throw new UnauthorizedException('Please enter a valid token');
    }

    const { message, receiver } = createMessageInput;
    return this.messageService.createMessage(message, receiver, sender);
  }

  @Mutation(()=>Message)
  async deleteMessage(@Args('deleteMessageInput') deleteMessageInput:deleteMessageInput,@Context() context: { req: any }):Promise<Message>{
   const {messageId}=deleteMessageInput
   const user = context.req.user;
   const owner = user?.id;
   return this.messageService.deleteMessage(messageId,owner)
  }


}
