# GraphQL API
### Implemented for needs of recruitment

# Requirements
This task is for demonstrating understanding of HTTP, GraphQL, Node.js and general API practices.

1. Implement a Node.js-based server with raw `http`, Koa or Express.
2. Add a `/graphql` endpoint serving the apollo-server or any other GraphQL implementation.
3. Schema must be able to return proper response for the following public query:

```graphql
{
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
}
```

4. Add support for the following mutation:
```graphql
mutation createUser($username: String!, $password: String!) {
  createUser(username: $username, password: $password) {
    token
    user {
      id
      name
    }
  }
}
```

5. To expand on the number four, add a mutation-based authentication that accepts:
```graphql
mutation login($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    token
    user {
      id
      name
    }
  }
}
```

6. Authenticated users may request additional fields for the query used earlier. New `secret_rating` field must return the a random string between 5.0-9.0:

```graphql
{
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
}
```

7. `/graphql` must be accessible for external clients.

8. End.

# Instructions
### Introduction
To implement task requirements I used:
- [graphql-yoga](https://github.com/prisma/graphql-yoga)
- [graphql-shield](https://github.com/maticzav/graphql-shield)
- [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)
- [Not a Real DB](https://github.com/mirkonasato/notarealdb)
- [TypeGraphQL](https://typegraphql.ml/)
- [Mocha](https://mochajs.org/)
- [SuperTest](https://github.com/visionmedia/supertest)

I implemented unit tests and used TypeScript and TSLint.

### Runing the API
1. Install dependencies and build using `npm install`.
2. Run API using `npm start`.
3. GraphQL Playground will be available on [http://localhost:4000](http://localhost:4000). API will be available for external clients on [http://localhost:4000/graphql](http://localhost:4000/graphql).
4. To build API use `npm run build`.

### Unit test
1. To run unit tests execute `npm test`

### Notes:
1. I added exclamation mark to types in mutations because username and password are required fields.
2. GraphQL will be created when API will be started. In case of issues I copied it to "schema-backup" directory and added to repository.
