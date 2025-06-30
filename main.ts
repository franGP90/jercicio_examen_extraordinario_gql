import { ApolloServer } from "@apollo/server";
import { typeDefs } from "./schema.ts";
import { MongoClient } from "mongodb";
import { BibliotecaModel } from "./types.ts";
import { startStandaloneServer } from "@apollo/server/standalone";
import { resolvers } from "./resolvers.ts";

const MONGO_URL = "mongodb+srv://fgonzalezp3:fgonzalezp3@kikoc.v6p0n.mongodb.net/?retryWrites=true&w=majority&appName=kikoC";

if(!MONGO_URL){
  throw new Error("Mongo url is not defined");
}


const mongoClient = new MongoClient(MONGO_URL);
try{await mongoClient.connect;}catch{throw new Error("Fallo al conectarse al cliente")}


const mongodb = mongoClient.db("bdbibliotecas");

const BibliotecasCollection = mongodb.collection<BibliotecaModel>("Biblioteca");

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  context: async () => ({ BibliotecasCollection }), 
});

console.info(`Server ready at ${url}`);


