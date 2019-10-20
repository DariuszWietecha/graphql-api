import { expect } from "chai";
import request from "supertest";

describe("User", () => {
  const req = request("http://localhost:4000");
  const graphqlPath = "/graphql";

  const user = {
    password: "password",
    username: "username",
  };

  it("mutation, createUser", async () => {
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

    expect(createUserRes.token.length)
      .to.be.greaterThan(70)
      .to.be.lessThan(80);
    expect(createUserRes.user.id.length)
    .to.be.greaterThan(8)
    .to.be.lessThan(11);
    expect(createUserRes.user.name).to.eql("username");
  });

  it("mutation, createUser, unknown argument", async () => {
    const errors = await req.post(graphqlPath)
      .send({
        query: `
          mutation createUser($_id: String) {
            createUser(_id: $_id) {
              token
              user {
                id
                name
              }
            }
          }
        ` ,
        variables: user,
      })
      .expect(400)
      .then((res) => res.body.errors);

    expect(errors).to.have.lengthOf(3);
    expect(errors[0].message).to.equal(`Unknown argument "_id" on field "createUser" of type "Mutation".`);
    expect(errors[1].message).to.equal(`Field "createUser" argument "password" of type "String!" is required, but it was not provided.`);
    expect(errors[2].message).to.equal(`Field "createUser" argument "username" of type "String!" is required, but it was not provided.`);
  });
  it("mutation, login", async () => {
    const loginRes = await req.post(graphqlPath)
      .send({
         query: `
          mutation login($username: String!, $password: String!) {
            login(username: $username, password: $password) {
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
      .then((res) => res.body.data.login);

    expect(loginRes.token.length)
      .to.be.greaterThan(70)
      .to.be.lessThan(80);
    expect(loginRes.user.id.length)
    .to.be.greaterThan(8)
    .to.be.lessThan(11);
    expect(loginRes.user.name).to.eql("username");
  });
  it("mutation, login, wrong password", async () => {
    const userWithWrongPass = {
      password: "00000000",
      username: "username",
    };
    const errors = await req.post(graphqlPath)
      .send({
         query: `
          mutation login($username: String!, $password: String!) {
            login(username: $username, password: $password) {
              token
              user {
                id
                name
              }
            }
          }
         `,
         variables: userWithWrongPass,
      })
      .expect(200)
      .then((res) => res.body.errors);

    expect(errors).to.have.lengthOf(1);
    expect(errors[0].message).to.equal(`Error: No user with that username or password is incorrect`);
  });
});
