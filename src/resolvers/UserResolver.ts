import { ObjectId } from 'mongodb';
import { Resolver, Query, Mutation, Arg } from 'type-graphql';
import { UserModel, User } from '../entities/User';
import jsonwebtoken from 'jsonwebtoken';
import {
  DeleteReturnType,
  LoginReturnType,
  RegisterReturnType,
  UpdateReturnType,
} from './ReturnTypes';
import bcrypt from 'bcrypt';

const jwt = jsonwebtoken;

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

  @Mutation(() => RegisterReturnType)
  async RegisterUser(
    @Arg('firstName') firstName: string,
    @Arg('lastName') lastName: string,
    @Arg('username') username: string,
    @Arg('password') password: string,
    @Arg('email') email: string,
    @Arg('birthDate') birthDate: string,
    @Arg('contact') contact: string,
    @Arg('type') type: string
  ): Promise<RegisterReturnType> {
    try {
      const user = await UserModel.findOne({
        username,
      });

      if (user) {
        return {
          exists: true,
          message: `The ${type} already exists.`,
        };
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      console.log(hashedPassword);

      const registerUser = new UserModel({
        firstName,
        lastName,
        username,
        password: hashedPassword,
        email,
        birthDate,
        contact,
        type,
      });

      const res = await registerUser.save();
      return {
        registered: true,
        message: `The ${type} ${res._id} has been registered.`,
      };
    } catch (error) {
      return {
        error: `${error}`,
      };
    }
  }

  @Mutation(() => UpdateReturnType)
  async UpdateUser(
    @Arg('firstName') firstName: string,
    @Arg('lastName') lastName: string,
    @Arg('username') username: string,
    @Arg('email') email: string,
    @Arg('birthDate') birthDate: string,
    @Arg('contact') contact: string,
    @Arg('type') type: string
  ): Promise<UpdateReturnType> {
    try {
      const user = await UserModel.findOneAndUpdate(
        { username, type },
        {
          username,
          firstName,
          lastName,
          email,
          birthDate,
          contact,
        }
      );

      return user
        ? {
            message: `The ${type}'s details has been updated.`,
          }
        : {
            error: `The user/ride does not exist.`,
          };
    } catch (error) {
      return {
        error: `${error}`,
      };
    }
  }

  @Mutation(() => DeleteReturnType)
  async DeleteUser(@Arg('userId') userId: ObjectId): Promise<DeleteReturnType> {
    try {
      const user = await UserModel.findByIdAndDelete(userId, (_err, res) => {
        console.log(res);
      });
      return {
        message: `The ${user?.type} id - ${userId} has been deleted.`,
      };
    } catch (error) {
      return {
        message: `${error}`,
      };
    }
  }

  @Mutation(() => LoginReturnType)
  async LoginUser(
    @Arg('username') username: string,
    @Arg('password') password: string
  ): Promise<LoginReturnType> {
    try {
      const user = await UserModel.findOne({ username });
      if (user) {
        const validPassword = await bcrypt.compare(password, user.password);
        const accessToken = jwt.sign(user.toObject(), 'user_access_token');
        const refreshToken = jwt.sign(user.toObject(), 'user_refresh_token');

        if (validPassword) {
          // res.status(200).cookie('creds', accessToken, {
          //   httpOnly: true,
          // });

          return {
            accessToken,
            refreshToken,
          };
        }

        return {
          error: 'Invalid Password',
        };
      }

      return {
        error: 'Account does not exist',
      };
    } catch (error) {
      return {
        error: `${error}`,
      };
    }
  }
}
