import React from "react"
import GoogleMapReact from "google-map-react";
import { Typography, Paper, useMediaQuery } from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined"
import useStyle from "./style"
import {mapStyles} from "./mapStyle"

const Map = ({ setCoordinate, setBound, coordinate, places, setChildClick,weatherData}) => {
    const classes = useStyle();
    const isDestop = useMediaQuery('(min-width:600px)')
    // const c = {lat:28,lng:77};
    return (
        <div className={classes.mapContainer}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
                defaultCenter={coordinate}
                center={coordinate}
                defaultZoom={14}
                margin={[50, 50, 50, 50]}
                options={{disableDefaultUI:true,zoomControl:true, styles:mapStyles}}
                onChange={(e) => {
                    // console.log(e);
                    setCoordinate({ lat: e.center.lat, lng: e.center.lng });
                    setBound({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
                }}
                onChildClick={(child) => setChildClick(child)}
            >
                {places?.map((place, i) => (
                    <div
                        className={classes.markerContainer}
                        lat={Number(place.latitude)}
                        lng={Number(place.longitude)}
                        key={i}
                    >
                        {
                            !isDestop ? (
                                <LocationOnOutlinedIcon color="primary" fontSize="large" />
                            ) : (
                                <Paper elevation={3} className={classes.paper}>
                                    {/* {console.log(place.name)} */}
                                    <Typography gutterBottom variant="subtitle2" className={classes.typography}>
                                        {place.name}
                                    </Typography>
                                    <img
                                        className={classes.pointer}
                                        src={place.photo ? place.photo.images.large.url : "https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg"}
                                        alt={place.name}
                                    />
                                    <Rating size="small" value={Number(place.rating)} readOnly/>
                                </Paper>
                            )
                        }
                    </div>
                ))}
                {weatherData?.list?.map((data,i)=> (
                    <div key={i} lat={data.coord.lat} lng={data.coord.log}>
                        <img height={75} src={`https://openweathermap.org/img/w/${data.weather[0].icon}.png`} alt={data.name}/>
                    </div>
                ))}
            </GoogleMapReact>
        </div>
    )
}

export default Map