import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MessageResolver } from './message.resolver';
import { MessageService } from './message.service';
import { Message, MessageSchema } from './message.schema';
import { UserModule } from 'src/user/user.module';
import { User, UserSchema } from 'src/user/schema/user.schema';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from 'src/auth/auth.module';
import { AuthMiddleware } from 'src/auth/attach-user';
@Module({
  imports: [UserModule,MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }]),
  MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),AuthModule
],

  providers: [MessageService, MessageResolver],
})
export class MessageModule {
    configure(consumer: MiddlewareConsumer) {
      consumer.apply(AuthMiddleware).forRoutes({ path: '*', method: RequestMethod.ALL });
    }
  }