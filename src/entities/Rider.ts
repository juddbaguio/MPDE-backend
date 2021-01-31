import { prop, getModelForClass } from '@typegoose/typegoose';
import { ObjectId } from 'mongodb';
import { ObjectType, Field } from 'type-graphql';

@ObjectType()
export class Rider {
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

  @Field()
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
  plateNumber: string;
}

export const RiderModel = getModelForClass(Rider);
