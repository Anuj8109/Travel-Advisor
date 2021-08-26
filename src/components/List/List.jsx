import React,{useState, useEffect, createRef} from "react"
import {CircularProgress,Grid,Typography,InputLabel, MenuItem, FormControl, Select} from '@material-ui/core'
import useStyle from "./style"
import PlaceDetails from "../PlaceDetails/PlaceDetails"
const List = ({places,childClick,isLoading,type,setType,rating,setRating}) => {
    
    const classes = useStyle();
    const [elrefs, setElrefs] = useState([]);

    useEffect(() => {
      setElrefs((refs) => Array(places?.length).fill().map((_, i) => refs[i] || createRef()));
    }, [places])
    // console.log({childClick})
    return(
        <div className={classes.container}>
            <Typography variant="h4">
                Hotels,Restaurants & Attractions around you
            </Typography>
            {isLoading ? (
              <div className={classes.loading}>
                  <CircularProgress size="5rem" />
              </div>
            ) : (
              <>
                <FormControl className={classes.formControl}>
                    <InputLabel id="type">Type</InputLabel>
                    <Select id="type" value={type} onChange={(e) => setType(e.target.value)}>
                    <MenuItem value="restaurants">Restaurants</MenuItem>
                    <MenuItem value="hotels">Hotels</MenuItem>
                    <MenuItem value="attractions">Attractions</MenuItem>
                    </Select>
                </FormControl>
                <FormControl className={classes.formControl}>
                  <InputLabel id="rating">Rating</InputLabel>
                  <Select id="rating" value={rating} onChange={(e) => setRating(e.target.value)}>
                    <MenuItem value="0">All</MenuItem>
                    <MenuItem value="3">Above 3.0</MenuItem>
                    <MenuItem value="4">Above 4.0</MenuItem>
                    <MenuItem value="4.5">Above 4.5</MenuItem>
                  </Select>
                </FormControl>
                <Grid container spacing={3} className={classes.list}>
                  {places?.map((place,i)=>(
                    <Grid ref={elrefs[i]} item key={i} xs={12}>
                        <PlaceDetails 
                            selected={Number(childClick) === i} 
                            refProp={elrefs[i]} 
                            place={place} 
                        />
                    </Grid>
                  ))}
                </Grid>
              </>
            )}
        </div>
    )
}

export default List