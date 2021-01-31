import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export default class DeleteReturnType {
  @Field()
  deleted?: boolean;

  @Field()
  message?: string;

  @Field()
  error?: string;
}
