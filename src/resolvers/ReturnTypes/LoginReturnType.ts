import { ObjectType, Field } from 'type-graphql';

@ObjectType()
export default class LoginReturnType {
  @Field({ nullable: true })
  accessToken?: string;

  @Field({ nullable: true })
  refreshToken?: string;

  @Field({ nullable: true })
  error?: string;
}
