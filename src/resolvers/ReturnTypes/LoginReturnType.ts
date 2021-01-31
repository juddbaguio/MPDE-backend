import { ObjectType, Field } from 'type-graphql';

@ObjectType()
export default class LoginReturnType {
  @Field()
  accessToken: string;

  @Field()
  refreshToken: string;
}
