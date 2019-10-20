import * as TG from "type-graphql";
import User from "./User";

@TG.ObjectType()
export default class TokenWithUser {
    @TG.Field()
    public token: string;

    @TG.Field(() => User)
    public user: User;
}
