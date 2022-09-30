// Import ApolloServer and graphQL

const { ApolloServer, gql } = require("apollo-server");

// Set typeDefs

const typeDefs = gql`
  type Book {
    title: String
    author: String
  }

  type Query {
    books: [Book]
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
    author: "Paul Auster",
  },
];

//Create resolver for ApolloServer

const resolvers = {
  Query: {
    books: () => books,
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
