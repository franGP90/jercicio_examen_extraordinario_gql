import { tempAPI, verifyphoneAPI, localtimeAPI, cityDataAPI, countryAPI } from "./types.ts";



export const getCountryName = async(
    name:string
):Promise<string>=>{
    const API_KEY = "fvnsynmnoJGgoY7r5cLH2w==qPZBPBN0FtBPbnQI"
    const url = `https://api.api-ninjas.com/v1/country?name=${name}`
    const response = await fetch(url,{
        headers:{
            "X-Api-Key":API_KEY
        }
    })

    if(!response.ok){
        throw new Error("Failed to fetch response(country)")
    }

    const data:countryAPI = await response.json()
    return data.name
}

export const getCity = async(
    name: string
):Promise<Array<{latitude:String, longitude:string, country:string}>>=>{
    const API_KEY = "fvnsynmnoJGgoY7r5cLH2w==qPZBPBN0FtBPbnQI"
    const url =`https://api.api-ninjas.com/v1/city?name=${name}`

    const response = await fetch(url,{
        headers:{
            "X-Api-Key": API_KEY
        }
    })
    
    if(!response.ok){
        throw new Error("Failed to fetch request")
    }

    const data: cityDataAPI = await response.json()
    const result = await Promise.all(
        data.map(async (city) => {
            const country = await getCountryName(city.country)
            return{latitude:  city.latitude, longitude: city.longitude, country}}
        )
    )

    return result;
}

export const getTemp = async(
    latitude:string,
    longitude:string
): Promise<number>=>{
   const API_KEY = "fvnsynmnoJGgoY7r5cLH2w==qPZBPBN0FtBPbnQI"
   const url = `https://api.api-ninjas.com/v1/weather?lat=${latitude}&lon=${longitude}`
   const response = await fetch(url,{
    headers:{
        "X-Api-Key":API_KEY
    }
   })

   if(!response.ok){
        throw new Error("failed to fetch response(weather)")
   }

   const data:tempAPI = await response.json()
   return data.temp
}

export const getLocalTime = async(
    latitude:string,
    longitude:string
):Promise<string>=>{
    const API_KEY = "fvnsynmnoJGgoY7r5cLH2w==qPZBPBN0FtBPbnQI"
    const url = `https://api.api-ninjas.com/v1/worldtime?lat=${latitude}&lon=${longitude}`

    const response = await fetch(url,{
        headers:{
            "X-Api-Key":API_KEY
        }
    })

    const data:localtimeAPI = await response.json()
    return data.datetime
}

export const phoneIsVAlid = async(
    phone:string
):Promise<boolean>=>{
    const API_KEY = "fvnsynmnoJGgoY7r5cLH2w==qPZBPBN0FtBPbnQI"
    const url = `https://api.api-ninjas.com/v1/validatephone?nmber=${phone}`

    const response = await fetch(url,{
        headers:{
            "X-Api-Key":API_KEY
        }
    })

    if(!response.ok){ throw new Error("Failed to fetch response(valid number)")}

    const data:verifyphoneAPI = await response.json()
    return data.is_valid
}