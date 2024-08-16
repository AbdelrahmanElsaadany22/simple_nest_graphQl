import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { join } from 'path';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { MessageModule } from './message/message.module';
import { AuthMiddleware } from './auth/attach-user';

@Module({
  imports: [
    AuthModule,
    MessageModule,
    MongooseModule.forRoot(process.env.CONNECTION_STRING),
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      playground: true,
      autoSchemaFile: join(process.cwd(), 'src/schema.graphql'),
      context: ({ req }) => ({ req }),  // Ensure this is correctly set up
    }),
    UserModule,
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule{}
