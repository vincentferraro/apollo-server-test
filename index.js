// Import ApolloServer and graphQL

const { ApolloServer, gql } = require("apollo-server");

// Set typeDefs
const typeDefs = gql`
  type Book {
    title: String
    author: String
  }

  type Author {
    name: String
    books: [Book]
  }
  type Query {
    books: [Book]
    authors: [Author]
  }
  type Mutation {
    addBook(title: String, author: String): Book
  }

  interface MutationResponse {
    code: String!
    success: Boolean!
    message: String!
  }

  type CreateBookMutationResponse implements MutationResponse {
    code: String!
    success: Boolean!
    message: String!
    book: Book
  }
`;

// Create data

const books = [
  {
    title: "The Awakening",
    author: "Kate Chopin",
  },
  {
    title: "City of glass",
    author: "Henry Ford",
  },
  {
    title: "The Awakening 2",
    author: "Kate Chopin",
  },
  {
    title: "City of glass 2",
    author: "Henry Ford",
  },
];

const authors = [
  {
    name: "Kate Chopin",
    books: [
      {
        title: "The Awakening",
      },
      {
        title: "The Awakening 2",
      },
    ],
  },
  {
    name: "Paul Auster",
    books: [{ title: "The Awakening 2" }, { title: "City of glass 2" }],
  },
];

//Create resolver for ApolloServer

const resolvers = {
  Query: {
    books: () => books,
    authors: () => authors,
  },
};

//Create instance of ApolloServer

const {
  ApolloServerPluginLandingPageLocalDefault,
} = require("apollo-server-core");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  csrfPrevention: true,
  cache: "bounded",
  plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })],
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
