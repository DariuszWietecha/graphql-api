//  TODO: change to TG everywhere
//  TODO: review and remove unused dependencies, args - everywhere
import { Field, Int, ObjectType } from "type-graphql";
import Director from "./Director";

@ObjectType()
export default class Actor {
  @Field(() => String)
  public id: string;

  @Field()
  public name: string;

  @Field()
  public birthday: string;

  @Field()
  public country: string;

  @Field(() => [Director])
  public directors: Director[];
}
