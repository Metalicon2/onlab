import Carousel from "../components/Carousel";
import { Container } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Fab from "@material-ui/core/Fab";
import Tooltip from "@material-ui/core/Tooltip";
import { makeStyles } from "@material-ui/core/styles";
import { useState, useEffect } from "react";
import { geolocated } from "react-geolocated";
import axios from "axios";
import Button from "@material-ui/core/Button";
import Map, { Marker, Popup } from "react-map-gl";
import RestaurantIcon from "@material-ui/icons/Restaurant";
import EmojiPeopleIcon from "@material-ui/icons/EmojiPeople";
import SentimentVeryDissatisfiedIcon from "@material-ui/icons/SentimentVeryDissatisfied";
import DoneOutlineRoundedIcon from "@material-ui/icons/DoneOutlineRounded";

//TODO: implement save location into redux
//TODO: implement autoFetch to filter the results correctly

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
    "& > div": {
      "& > h1": {
        color: "white",
      },
      "& > svg": {
        margin: "0 10px",
      },
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

  const [locationVal, setLocationVal] = useState("");
  const [currentLocation, setCurrentLocation] = useState(null);
  const [viewport, setViewport] = useState({
    longitude: 19.077416,
    latitude: 47.51477875,
    zoom: 11,
    width: "100%",
    height: "100%",
  });

  useEffect(() => {
    if (isGeolocationEnabled) {
      autoFetchAddress();
    }
  }, [isGeolocationEnabled]);

  const autoFetchAddress = async () => {
    const res = await axios.get("https://api.geoapify.com/v1/geocode/reverse", {
      params: {
        lat: coords.latitude,
        lon: coords.longitude,
        apiKey: process.env.GEOAPIFY_ACCESS_TOKEN,
      },
    });
    if (res.status === 200) {
      const filterRes = await axios.get(
        "https://api.geoapify.com/v1/geocode/search",
        {
          params: {
            text: res.data.features[0].properties.formatted,
            apiKey: process.env.GEOAPIFY_ACCESS_TOKEN,
            filter: "circle:19.077416,47.51477875,5000",
          },
        }
      );
      if (
        filterRes.status === 200 &&
        filterRes.data.features.length > 0 &&
        filterRes.data.features[0].properties.rank.confidence > 0.8
      ) {
        setCurrentLocation({
          longitude: coords.longitude,
          latitude: coords.latitude,
          description: res.data.features[0].properties.formatted,
          selected: false,
        });
      }else{
        setCurrentLocation(null);
      }
    } else {
      window.alert("Failed to find your address!");
    }
  };

  const fetchAddress = async () => {
    const resAttempt = await axios.get(
      "https://api.geoapify.com/v1/geocode/search",
      {
        params: {
          text: locationVal,
          apiKey: process.env.GEOAPIFY_ACCESS_TOKEN,
          filter: "circle:19.077416,47.51477875,5000",
        },
      }
    );
    console.log(resAttempt);
    if (
      resAttempt.data.features.length > 0 &&
      resAttempt.data.features[0].properties.rank.confidence > 0.4
    ) {
      setCurrentLocation({
        longitude: resAttempt.data.features[0].properties.lon,
        latitude: resAttempt.data.features[0].properties.lat,
        description: resAttempt.data.features[0].properties.formatted,
        selected: false,
      });
    } else {
      setCurrentLocation(null);
    }
  };

  const onEnterPressed = (e) => {
    if (e.keyCode == 13) {
      fetchAddress();
    }
  };

  return (
    <Container className={classes.container}>
      <div
        className={classes.form}
        style={
          currentLocation
            ? { border: "3px solid green" }
            : { border: "3px solid red" }
        }
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          {currentLocation ? (
            <>
              <h1>We deliver to your location!</h1>
              <DoneOutlineRoundedIcon
                style={{ fontSize: 50, color: "green" }}
              />
            </>
          ) : (
            <>
              <h1>Sorry, we don't deliver to your location!</h1>
              <SentimentVeryDissatisfiedIcon
                style={{ fontSize: 50, color: "red" }}
              />
            </>
          )}
        </div>
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
            onKeyDown={(e) => onEnterPressed(e)}
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
          <Map
            {...viewport}
            mapStyle="mapbox://styles/metalicon19/ckhumxvog0fpo19qlpvu300e2"
            mapboxApiAccessToken={process.env.MAPBOX_ACCESS_TOKEN}
            onViewportChange={(viewport) => setViewport(viewport)}
          >
            <Marker latitude={47.51477875} longitude={19.077416}>
              <Tooltip title="Foodster restaurant">
                <Fab color="primary" onClick={() => console.log("lol")}>
                  <RestaurantIcon />
                </Fab>
              </Tooltip>
            </Marker>
            {currentLocation && (
              <>
                <Marker
                  latitude={currentLocation.latitude}
                  longitude={currentLocation.longitude}
                >
                  <Tooltip title="Your location">
                    <Fab
                      color="secondary"
                      onClick={() =>
                        setCurrentLocation({
                          ...currentLocation,
                          selected: !currentLocation.selected,
                        })
                      }
                    >
                      <EmojiPeopleIcon />
                    </Fab>
                  </Tooltip>
                </Marker>
                {currentLocation.selected && (
                  <Popup
                    latitude={currentLocation.latitude}
                    longitude={currentLocation.longitude}
                    onClose={() =>
                      setCurrentLocation({
                        ...currentLocation,
                        selected: false,
                      })
                    }
                    closeOnClick={false}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <b>Info</b>
                      <p>{currentLocation.description}</p>
                      <Button
                        color="secondary"
                        variant="contained"
                        size="small"
                        //implement save to redux here
                        onClick={() => window.alert("asd")}
                      >
                        Save location
                      </Button>
                    </div>
                  </Popup>
                )}
              </>
            )}
          </Map>
          )
        </div>
      </div>
      <Carousel />
    </Container>
  );
};

export default geolocated({
  positionOptions: {
    enableHighAccuracy: true,
  },
  isOptimisticGeolocationEnabled: false,
})(Home);
