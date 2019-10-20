import * as TG from "type-graphql";
import Actor from "./Actor";

@TG.ObjectType()
export default class Movie {
  @TG.Field(() => String)
  public id: string;

  @TG.Field()
  public title: string;

  @TG.Field()
  public year: string;

  @TG.Field()
  public rating: string;

  @TG.Field()
  // tslint:disable-next-line:variable-name
  public secret_rating: string;

  @TG.Field(() => Actor)
  public actors: Actor[];
}
