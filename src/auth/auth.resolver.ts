import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { UserType } from './dto/usr-type';
import { loginUserInput, TokenType } from './dto/login-user.dtp';
import { CreateUserInput } from './dto/create-user-input';
import { User } from 'src/user/schema/user.schema';

@Resolver(of=>User)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => User)
  async signup(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<UserType> {
    
    return this.authService.signup(createUserInput);
  }

  @Mutation(()=>TokenType)
  async login(
      @Args('loginUserInput') loginUserInput: loginUserInput,
  ): Promise<TokenType> {
       
      return this.authService.login(loginUserInput);
  }
}
