export const typeDefs = `#graphql
type Biblioteca{
    id:ID!
    name:String!
    address:String!
    localtime:String!
    temperature:String!
    phone:String!
}

type Query{
    getBibliotecas(city:String!):[Biblioteca!]!
    getBiblioteca(id:ID!): Biblioteca
}

type Mutation{
    addBiblioteca(name:String!, address:String!, city:String!, phone:String!): Biblioteca
    deleteBiblioteca(id:ID!):Boolean!
}

`;