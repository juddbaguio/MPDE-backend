import 'reflect-metadata';
import dotenv from 'dotenv';
dotenv.config();

import express, { Request, Response } from 'express';
import path from 'path';
import { ApolloServer } from 'apollo-server-express';
import mongoose from 'mongoose';
import { ObjectId } from 'mongodb';
import { buildSchema } from 'type-graphql';
import { ServerContext } from './serverContext';
import { UserResolver } from './resolvers/UserResolver';
import { ObjectIdScalar } from './ObjectIdScalar';
import { RiderResolver } from './resolvers/RiderResolver';

async function serverStart() {
  try {
    const app = express();
    await mongoose.connect(
      'mongodb+srv://admin:ogonpogotoVnosti28@mr-p-delivery-express.djzed.mongodb.net/Mr-P-Delivery-Express?retryWrites=true&w=majority',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    const server = new ApolloServer({
      schema: await buildSchema({
        resolvers: [UserResolver, RiderResolver],
        emitSchemaFile: path.resolve(__dirname, 'schema.gql'),
        scalarsMap: [{ type: ObjectId, scalar: ObjectIdScalar }],
      }),
      context: (req: Request, res: Response): ServerContext => ({ req, res }),
    });

    server.applyMiddleware({
      app,
    });

    const PORT = process.env.PORT || 3000;

    app.listen(PORT, () => {
      console.log(
        `try running GQL server at http://localhost:${PORT}${server.graphqlPath}`
      );
    });
  } catch (error) {
    console.log(error);
  }
}

serverStart();
