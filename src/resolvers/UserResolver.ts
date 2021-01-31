import { Resolver, Query, Mutation, Arg } from 'type-graphql';
import { UserModel, User } from '../models/User';

@Resolver(() => User)
export class UserResolver {
  @Query(() => [User], { nullable: true })
  async RetrieveUsers(): Promise<User[] | string> {
    try {
      const users = await UserModel.find({});
      return users;
    } catch (error) {
      return 'Error';
    }
  }

  @Mutation(() => User)
  async RegisterUser(
    @Arg('firstName') firstName: string,
    @Arg('lastName') lastName: string,
    @Arg('username') username: string,
    @Arg('password') password: string,
    @Arg('email') email: string,
    @Arg('birthDate') birthDate: string,
    @Arg('contact') contact: string
  ): Promise<User | String> {
    try {
      const registerUser = new UserModel({
        firstName,
        lastName,
        username,
        password,
        email,
        birthDate,
        contact,
      });

      await registerUser.save();
      return registerUser;
    } catch (error) {
      return 'error';
    }
  }
}
