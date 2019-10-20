import * as TG from "type-graphql";

@TG.ObjectType()
export default class User {
  @TG.Field(() => String)
  public id: string;

  @TG.Field()
  public username: string;

  @TG.Field()
  public password: string;
}
