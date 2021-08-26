import axios from "axios"

// const URL = 'https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary'


export const getPlaceData = async (type,bound) => {
  // console.log(bound);
  const URL = `https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`
  try {
    const { data: { data } } = await axios.get(URL,
      {
        params: {
          bl_latitude: bound.sw.lat,
          tr_latitude: bound.ne.lat,
          bl_longitude: bound.sw.lng,
          tr_longitude: bound.ne.lng,
        },
        headers: {
          'x-rapidapi-key': process.env.REACT_APP_RAPIDAPI_TRAVEL_API_KEY,
          'x-rapidapi-host': 'travel-advisor.p.rapidapi.com'
        }
      })
      // console.log(data);
      return data;
  } catch (error) {
    console.log(error)
  }
}

export const getWeatherData = async(lat,lng) => {
  try {
    const { data } = await axios.get('https://community-open-weather-map.p.rapidapi.com/find',{
    params: {
      lon: lng,lat: lat,
    },
    headers: {
      'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com',
      'x-rapidapi-key': process.env.REACT_APP_RAPIDAPI_WEATHER_API_KEY,
    }
  })
  return data;
  } catch (error) {
    console.log(error);
  }
}