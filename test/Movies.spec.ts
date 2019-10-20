import { expect } from "chai";
import request from "supertest";

describe("Movies", () => {
  const req = request("http://localhost:4000");
  const graphqlPath = "/graphql";

  it("query, movies without secret_rating, unauthorized", async () => {
    const res = await req.post(graphqlPath)
      .send({
        query: `{
        movies {
          title
          year
          rating
          actors {
            name
            birthday
            country
            directors {
              name
              birthday
              country
            }
          }
        }
      }` })
      .expect(200);

    expect(res.body.data.movies).to.eql(require("./data/query-movies-response.json"));
  });

  it("query, movies WITH secret_rating, unauthorized", async () => {
    const res = await req.post(graphqlPath)
      .send({
        query: `{
        movies {
          secret_rating
          title
          year
          rating
          actors {
            name
            birthday
            country
            directors {
              name
              birthday
              country
            }
          }
        }
      }` })
      .expect(200);

    expect(res.body.errors).to.have.lengthOf(1);
    expect(res.body.errors[0].message).to.equal("Not Authorised!");
    expect(res.body.errors[0].path).to.contain("secret_rating");
  });
  it("query, movies WITH secret_rating, authorized", async () => {
    const user = {
      password: "password",
      username: "username",
    };

    const createUserRes = await req.post(graphqlPath)
      .send({
        query: `
        mutation createUser($username: String!, $password: String!) {
          createUser(username: $username, password: $password) {
            token
            user {
              id
              name
            }
          }
        }
       `,
        variables: user,
      })
      .expect(200)
      .then((res) => res.body.data.createUser);

    const moviesRes = await req.post(graphqlPath)
      .set("Authorization", createUserRes.token)
      .send({
        query: `{
        movies {
          secret_rating
          title
          year
          rating
          actors {
            name
            birthday
            country
            directors {
              name
              birthday
              country
            }
          }
        }
      }` })
      .expect(200);

    const {secret_rating, ...movieWithoutSR} =  moviesRes.body.data.movies[0];
    expect(movieWithoutSR).to.eql(require("./data/query-movies-response.json")[0]);
    expect(parseFloat(secret_rating))
      .to.be.greaterThan(5)
      .to.be.lessThan(9);
  });
  it("query, movies, cannot query field", async () => {
    const errors = await req.post(graphqlPath)
      .send({ query: "{ movies { title year content } }" })
      .expect(400)
      .then((res) => res.body.errors);

    expect(errors).to.have.lengthOf(1);
    expect(errors[0].message).to.equal(`Cannot query field "content" on type "Movie".`);
  });
});
