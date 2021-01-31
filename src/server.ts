import 'reflect-metadata';
require('dotenv').config();

import express, { Request, Response } from 'express';
import path from 'path';
import { ApolloServer } from 'apollo-server-express';
import mongoose from 'mongoose';
import { ObjectId } from 'mongodb';
import { buildSchema } from 'type-graphql';
import { ServerContext } from './serverContext';
import { UserResolver } from './resolvers/UserResolver';
import { ObjectIdScalar } from './ObjectIdScalar';

const DB_URI = process.env.MR_P_DB!;

async function serverStart() {
  try {
    const app = express();
    await mongoose.connect(DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: true,
    });
    const server = new ApolloServer({
      schema: await buildSchema({
        resolvers: [UserResolver],
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
