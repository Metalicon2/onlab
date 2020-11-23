import Carousel from "../components/Carousel";
import { Container } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { useState, useEffect } from "react";
import { geolocated } from "react-geolocated";
import axios from "axios";
import LinearProgress from "@material-ui/core/LinearProgress";
import mapboxgl from "mapbox-gl/dist/mapbox-gl";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    position: "relative",
    height: "100%",
  },
  form: {
    zIndex: 1,
    background: "rgba(0,0,0, 0.5)",
    border: "1px solid rgba(255,255,255, 0.2)",
    borderRadius: "25px",
    padding: "20px",
    height: "80%",
    display: "flex",
    flexDirection: "column",
    "& > h1": {
      color: "white",
    },
  },
  inputContainer: {
    display: "flex",
    marginBottom: "10px",
  },
  input: {
    margin: 0,
    flexGrow: 1,
    "& label.Mui-focused": {
      color: "white",
    },
    "& label": {
      color: "white",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "yellow",
    },
    "& .MuiInputBase-input": {
      color: "white",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "white",
      },
      "&:hover fieldset": {
        borderColor: "white",
      },
      "&.Mui-focused fieldset": {
        borderColor: "yellow",
      },
    },
  },
}));

const Home = ({ coords, isGeolocationEnabled }) => {
  const classes = useStyles();

  //initalize markers
  const restaurantMarker = new mapboxgl.Marker({color: "green"});
  const userMarker = new mapboxgl.Marker({color: "red"});
  const restaurantPos = [19.077416, 47.51477875];

  const [locationVal, setLocationVal] = useState("");
  const [location, setLocation] = useState({
    longitude: null,
    latitude: null,
    city: null,
  });
  const [map, setMap] = useState(null);

  useEffect(() => {
    setupMap();
    if (isGeolocationEnabled) {
      autoFetchAddress();
    }
  }, [isGeolocationEnabled]);

  const setupMap = () => {
    if(!map){
      setMap(
        new mapboxgl.Map({
          accessToken: process.env.MAPBOX_ACCESS_TOKEN,
          container: "map",
          style: "mapbox://styles/mapbox/streets-v11",
          center: restaurantPos,
          zoom: 12,
          pitch: 45,
        })
      );
    }
  };

  const autoFetchAddress = async () => {
    //https://api.geoapify.com/v1/geocode/reverse?lat=47.51477875&lon=19.077416&apiKey=YOUR_API_KEY
    const res = await axios.get(
      "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=47.510780&longitude=19.033356&localityLanguage=hu"
    );
    if (res.status === 200) {
      setLocation({
        longitude: coords.longitude,
        latitude: coords.latitude,
        city: res.data.city,
      });
      restaurantMarker.setLngLat(restaurantPos).addTo(map);
      userMarker.setLngLat([coords.longitude, coords.latitude]).addTo(map);
    } else {
      window.alert("failed to fetch address!");
    }
  };

  const fetchAddress = async () => {
    restaurantMarker.setLngLat(restaurantPos).addTo(map);
    const resAttempt = await axios.get(
      `https://api.geoapify.com/v1/geocode/search?text=${locationVal}&filter=circle:19.077416,47.51477875,4000&apiKey=84ee5c97f44248a7b59cdb583177b3ad`
    );
    console.log(resAttempt);
    if(resAttempt.data.features.length > 0 && resAttempt.data.features[0].properties.rank.confidence > 0.8){
      map.removeLayer(userMarker);
      userMarker.setLngLat([resAttempt.data.features[0].properties.lon, resAttempt.data.features[0].properties.lat]).addTo(map);
      console.log(resAttempt.data.features[0].properties.lat);
      console.log(resAttempt.data.features[0].properties.lon);
    }else{
      window.alert("Sorry, we are not delivering to your address :(!");
    }
  };

  return (
    <Container className={classes.container}>
      <div className={classes.form}>
        <h1>Please enter your location</h1>
        <div className={classes.inputContainer}>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="location"
            label="Location"
            name="location"
            autoComplete="location"
            autoFocus
            className={classes.input}
            value={locationVal}
            onChange={(e) => setLocationVal(e.target.value)}
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={() => fetchAddress()}
          >
            Locate me!
          </Button>
        </div>
        <div style={{ height: "100%" }}>
          <div id="map" style={{ width: "100%", height: "100%" }} />
        </div>
      </div>
      <Carousel />
    </Container>
  );
};

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
  isOptimisticGeolocationEnabled: false,
})(Home);

/*
map.addControl(
        new mapboxgl.GeolocateControl({
          positionOptions: {
            enableHighAccuracy: true,
          },
          trackUserLocation: true,
        })
      );
*/
