import * as jwt from "jsonwebtoken";
import * as TG from "type-graphql";
import { IUser, users } from "../db";
import TokenWithUser from "../schemas/TokenWithUser";
import User from "../schemas/User";

const jwtSecret = Buffer.from("Zn8Q5tyZ/G1MHltc4F/gTkVJMlrbKiZt", "base64");

function getTokenWithUser(user: User): TokenWithUser {
  const token = jwt.sign(user.id, jwtSecret);

  return {
      token,
      user,
  };
}

@TG.Resolver(() => User)
export default class {
  @TG.Mutation(() => TokenWithUser)
  public createUser(@TG.Arg("username") username: string, @TG.Arg("password") password: string): TokenWithUser {
    const userId = users.create({
      password,
      username,
    });

    const user = users.get(userId);

    return getTokenWithUser(user);
  }

  @TG.Mutation(() => TokenWithUser)
  public login(@TG.Arg("username") username: string, @TG.Arg("password") password: string): TokenWithUser {
    const user = users.list().find((item) =>  item.username === username);
    if (!(user && user.password === password)) {
       throw new Error("Error: No user with that username or password is incorrect");
    }

    return getTokenWithUser(user);
  }

  @TG.FieldResolver(() => String)
  public name(@TG.Root() root: IUser): string {
    return root.username;
  }
}
