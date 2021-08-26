import React,{useEffect,useState} from 'react'
import {CssBaseline,Grid} from '@material-ui/core'

import Header from "./components/Header/Header"
import List from "./components/List/List"
import Map from "./components/Map/Map"
import {getPlaceData, getWeatherData} from "./api/index"

const App = () => {
    const [weatherData, setWeatherData] = useState([])
    const [data, setData] = useState([]);
    const [coordinate,setCoordinate] = useState()
    const [bound, setBound] = useState(null)
    const [childClick, setChildClick] = useState(null)
    const [isLoading, setIsLoading] = useState(false);
    const [type, setType] = useState("restaurants");
    const [rating, setRating] = useState(0);
    const [filterPlace, setFilterPlace] = useState([])
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(({coords:{latitude,longitude}}) => {
            // console.log(latitude,longitude)
            setCoordinate({lat:latitude,lng:longitude});
        })
    }, [])

    useEffect(() => {
        const fil = data.filter((place) => place.rating >= rating)
        setFilterPlace(fil);
        // console.log(filterPlace)
    },[rating])
    useEffect(() => {
        if(bound){
            setIsLoading(true)
            getWeatherData(coordinate.lat,coordinate.lng).then((data)=> setWeatherData(data))
            getPlaceData(type,bound).then((data)=>{
                // console.log(data);
                // console.log(bound)
                setData(data?.filter((place) => place.name && place.num_reviews > 0));
                setFilterPlace([]);
                setIsLoading(false);
            })
        }
    }, [coordinate,bound,type])
    return(
        <>
            <CssBaseline />
            <Header setCoordinate={setCoordinate}/>
            <Grid container spacing={3} style={{width:'100%',height:'200px'}}>
                <Grid item xs={12} md={4} >
                    <List 
                          places={filterPlace.length ? filterPlace : data}
                          childClick={childClick}
                          isLoading={isLoading}
                          type={type}
                          setType={setType}
                          rating={rating}
                          setRating={setRating}
                    />
                </Grid>
                <Grid item xs={12} md={8} >
                    <Map 
                        setCoordinate = {setCoordinate}
                        setBound = {setBound}
                        coordinate = {coordinate}
                        places={filterPlace.length ? filterPlace : data}
                        setChildClick={setChildClick}
                        weatherData={weatherData}
                    />
                </Grid>
            </Grid>
        </>
    )
}

export default App;

