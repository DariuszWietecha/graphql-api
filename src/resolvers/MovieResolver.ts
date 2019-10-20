
import * as TG from "type-graphql";
import { actors, IActor, IMovie, movies } from "../db";
import Actor from "../schemas/Actor";
import Movie from "../schemas/Movie";

function getRandomInclusive(min: number, max: number): string {
    min = Math.ceil(min);
    max = Math.floor(max);
    const random = Math.random() * (max - min) + min;
    return random.toPrecision(2).toString();
}

@TG.Resolver(() => Movie)
export default class {
    @TG.Query(() => [Movie])
    public movies(): IMovie[] {
        return movies.list();
    }

    @TG.FieldResolver(() => [Actor])
    public actors(@TG.Root() root: IMovie): IActor[] {
        return actors.list().filter((item) => root.actorsIds.includes(item.id));
    }

    @TG.FieldResolver(() => String)
    public secret_rating() {
        return getRandomInclusive(5, 9);
    }
}
