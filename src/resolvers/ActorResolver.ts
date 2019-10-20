import * as TG from "type-graphql";
import { directors, IActor, IDirector } from "../db";
import Actor from "../schemas/Actor";
import Director from "../schemas/Director";

@TG.Resolver(() => Actor)
export default class {
    @TG.FieldResolver(() => [Director])
    public directors(@TG.Root() root: IActor): IDirector[] {
        return directors.list().filter((item) => root.directorsIds.includes(item.id));
    }
}
