import { Request } from "express-serve-static-core";
import { rule, shield } from "graphql-shield";
import { GraphQLServer } from "graphql-yoga";
import * as jwt from "jsonwebtoken";
import "reflect-metadata";
import { buildSchemaSync } from "type-graphql";
import { users } from "./db";
import ActorResolver from "./resolvers/ActorResolver";
import MovieResolver from "./resolvers/MovieResolver";
import UserResolver from "./resolvers/UserResolver";

const jwtSecret = Buffer.from("Zn8Q5tyZ/G1MHltc4F/gTkVJMlrbKiZt", "base64");
const schema = buildSchemaSync({
  emitSchemaFile: true,
  resolvers: [ActorResolver, MovieResolver, UserResolver],
});

// Authentication
function authenticate(req: { request: Request }) {
  try {
    const authorization = req.request.get("authorization") || "";
    const userId = jwt.verify(authorization.replace("Bearer ", ""), jwtSecret) as string;
    return users.get(userId) !== undefined;
  } catch (e) {
    return false;
  }
}

// Rules
const isAuthenticated = rule()(async (parent, args, ctx) => {
  return ctx.isAuthenticated === true;
});

// Permissions
const permissions = shield(
  {
    Movie: {
      secret_rating: isAuthenticated,
    },
  });

export const server = new GraphQLServer({
  context: (req) => ({
    ...req,
    isAuthenticated: authenticate(req),
  }),
  middlewares: [permissions],
  schema,
});

server.start({ endpoint: "/graphql" }, () => {
  // tslint:disable-next-line: no-console
  console.log("Server is running on http://localhost:4000");
});
