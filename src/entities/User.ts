import { prop, getModelForClass } from '@typegoose/typegoose';
import { ObjectId } from 'mongodb';
import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class User {
  @Field()
  readonly _id: ObjectId;

  @Field()
  @prop({ required: true })
  firstName: string;

  @Field()
  @prop({ required: true })
  lastName: string;

  @Field()
  @prop({ required: true })
  username: string;

  @Field({ nullable: true })
  @prop({ required: true })
  password: string;

  @Field()
  @prop({ required: true })
  email: string;

  @Field()
  @prop({ required: true })
  birthDate: string;

  @Field()
  @prop({ required: true })
  contact: string;

  @Field()
  @prop({ required: true })
  type: string;
}

export const UserModel = getModelForClass(User);
