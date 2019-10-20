import { Field, Int, ObjectType } from "type-graphql";

@ObjectType()
export default class Director {
  @Field((type) => String)
  public id: string;

  @Field()
  public name: string;

  @Field()
  public birthday: string;

  @Field()
  public country: string;
}
