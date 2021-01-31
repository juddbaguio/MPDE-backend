import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export default class RegisterReturnType {
  @Field({ nullable: true })
  registered?: boolean;

  @Field({ nullable: true })
  message?: string;

  @Field({ nullable: true })
  error?: string;

  @Field({ nullable: true })
  exists?: boolean;
}
