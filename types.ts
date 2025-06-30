import { OptionalId } from "mongodb";

export type BibliotecaModel =  OptionalId<{
    name:string,
    address:string,
    city:string,
    country:string,
    phone:string,
    latitude:string,
    longitude:string,
}>

export type countryAPI = {name:string}
export type tempAPI = {temp:number}
export type localtimeAPI = {datetime:string}
export type cityDataAPI = Array<{latitude:string, longitude:string, country:string}>
export type verifyphoneAPI = {is_valid: boolean}