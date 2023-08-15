const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');
const dotenv = require('dotenv')

const PORT = 8080

// Apollo Server
// typeDefs: GraphQL Type Definitions
// resolvers: How do we resolve queries/mutations

dotenv.config()

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');

const server = new ApolloServer({
    typeDefs,
    resolvers
});

mongoose.connect(process.env.MONGODB_URL, {useNewUrlParser: true})
    .then(() => {
        console.log("MongoDB Connection Successful");
        return server.listen({port: PORT})
    })
    .then((res) => {
        console.log(`Server is running at ${res.url}`)
    })