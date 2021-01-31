import { Resolver, Query, Mutation, Arg } from 'type-graphql';
import { RiderModel, Rider } from '../entities/Rider';

@Resolver(() => Rider)
export class RiderResolver {
  @Query(() => [Rider], { nullable: true })
  async RetrieveRiders(): Promise<Rider[] | string> {
    try {
      const users = await RiderModel.find({});
      return users;
    } catch (error) {
      return 'Error';
    }
  }

  @Mutation(() => Rider)
  async RegisterRider(
    @Arg('firstName') firstName: string,
    @Arg('lastName') lastName: string,
    @Arg('username') username: string,
    @Arg('password') password: string,
    @Arg('email') email: string,
    @Arg('birthDate') birthDate: string,
    @Arg('contact') contact: string,
    @Arg('plateNumber') plateNumber: string
  ): Promise<Rider | String> {
    try {
      const registerRider = new RiderModel({
        firstName,
        lastName,
        username,
        password,
        email,
        birthDate,
        contact,
        plateNumber,
      });

      await registerRider.save();
      return registerRider;
    } catch (error) {
      return 'error';
    }
  }
}
