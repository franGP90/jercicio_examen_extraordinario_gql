import { getCity, getCountryName, getLocalTime, getTemp, phoneIsVAlid } from "./utils.ts"
import { BibliotecaModel } from "./types.ts"
import { Collection ,ObjectId} from "mongodb"
import { GraphQLError } from "graphql"
import { ContextualizedQueryLatencyStats } from "../../../../../../AppData/Local/deno/npm/registry.npmjs.org/@apollo/usage-reporting-protobuf/4.1.1/generated/esm/protobuf.d.ts";
//
type Context = {
    BibliotecasCollection:Collection<BibliotecaModel>
}

type addBibliotecaArgs ={
    address:string,
    name:string,
    phone:string,
    city:string,

}

export const resolvers = {
    Biblioteca:{
        id:(parent:BibliotecaModel) => parent._id?.toString(),
        address:(parent:BibliotecaModel) => 
        `${parent.address}, ${parent.city},${parent.country}`,
        temperature:async (parent:BibliotecaModel,_:unknown, ctx:Context)=>{      
            const {latitude, longitude} = parent
           return await getTemp(latitude, longitude)
        },

        localtime: async (parent:BibliotecaModel,_:unknown,ctx:Context) =>{
            const{latitude, longitude} = parent
            return await getLocalTime(latitude,longitude)
        }
    },

    Query:{
        getBibliotecas: async(
            _:unknown,
            {city}:{city:string},
            ctx: Context
        ):Promise<BibliotecaModel[]>=>{
            const bibliotecas = await ctx.BibliotecasCollection.find({city}).toArray()
            return bibliotecas
        },

        getBiblioteca: async(
            _:unknown,
            {id}:{id:string},
            ctx: Context
        ):Promise<BibliotecaModel| null>=>{
            return await ctx.BibliotecasCollection.findOne({_id: new ObjectId(id)})
        },
    },

    Mutation:{
        addBiblioteca: async(
            _:unknown,
            params: addBibliotecaArgs,
            ctx: Context
        ):Promise<BibliotecaModel|null>=>{
            const {name, address, phone, city} = params

            const cityExists = await getCity(city)
            const cityData = cityExists.at(0)
            if(!cityData){throw new Error("No se encuentra la cidad especificada")}
            const {latitude, longitude, country} = cityData

            if(!phoneIsVAlid(phone)){throw new Error("El número de teléfono introducido no es válido")}
            
            const {insertedId} = await ctx.BibliotecasCollection.insertOne({
                name,
                address,
                phone,
                city,
                latitude,
                longitude,
                country
            })

            return {
                _id: insertedId,
                name,
                address,
                phone,
                city,
                latitude,
                longitude,
                country
            }
        },
        
        dleteBiblioteca: async(
            _:unknown,
            {id}: {id: string},
            ctx: Context
        ):Promise<boolean | null>=>{
            const deleted = await ctx.BibliotecasCollection.deleteOne({_id: new ObjectId(id)})
            return deleted.deletedCount === 1;
        }
    }
}