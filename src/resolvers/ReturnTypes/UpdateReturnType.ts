import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export default class UpdateReturnType {
  @Field({ nullable: true })
  message?: string;

  @Field({ nullable: true })
  error?: string;
}
