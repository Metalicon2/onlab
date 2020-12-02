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
import Autocomplete from "@material-ui/lab/Autocomplete";
import { connect } from "react-redux";
import { setLocationAction } from "../redux/actions";
import Notification from "../components/Notification";

//TODO: implement save location into redux

const useStyles = makeStyles(() => ({
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
    "& > div": {
      width: "100%",
    },
  },
  input: {
    margin: 0,
    "& label.Mui-focused": {
      color: "white",
    },
    "& label": {
      color: "white",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "blue",
    },
    "& .MuiInputBase-input": {
      color: "white",
    },
    "& .MuiOutlinedInput-root": {
      "& svg": {
        color: "white",
      },
      "& fieldset": {
        borderColor: "white",
      },
      "&:hover fieldset": {
        borderColor: "white",
      },
      "&.Mui-focused fieldset": {
        borderColor: "white",
      },
    },
  },
}));

const Home = ({ coords, isGeolocationEnabled, setLocationAction }) => {
  const classes = useStyles();

  const [locationVal, setLocationVal] = useState("");
  const [currentLocation, setCurrentLocation] = useState(null);
  const [viewport, setViewport] = useState({
    longitude: 19.077416,
    latitude: 47.51477875,
    zoom: 12,
    width: "100%",
    height: "100%",
    pitch: 40,
  });
  const [optionsArr, setOptionsArr] = useState([]);
  const [timer, setTimer] = useState(null);
  const [notiProps, setNotiProps] = useState({
    isOpen: false,
    severity: null,
    msg: null
  });

  useEffect(() => {
    if (isGeolocationEnabled) {
      autoFetchAddress();
    }
  }, [isGeolocationEnabled]);

  //https://stackoverflow.com/questions/18883601/function-to-calculate-distance-between-two-coordinates
  const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1); // deg2rad below
    var dLon = deg2rad(lon2 - lon1);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d;
  };

  const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
  };

  const autoFetchAddress = async () => {
    const res = await axios.get("https://api.geoapify.com/v1/geocode/reverse", {
      params: {
        lat: coords.latitude,
        lon: coords.longitude,
        apiKey: process.env.GEOAPIFY_ACCESS_TOKEN,
      },
    });
    if (res.status === 200) {
      if (
        getDistanceFromLatLonInKm(
          47.51477875,
          19.077416,
          coords.latitude,
          coords.longitude
        ) <= 5
      ) {
        setCurrentLocation({
          longitude: coords.longitude,
          latitude: coords.latitude,
          description: res.data.features[0].properties.formatted,
          selected: false,
        });
      } else {
        setCurrentLocation(null);
      }
    } else {
      setNotification(true);
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
    if (
      resAttempt.data.features.length > 0 &&
      resAttempt.data.features[0].properties.rank.confidence > 0.5
    ) {
      setCurrentLocation({
        longitude: resAttempt.data.features[0].properties.lon,
        latitude: resAttempt.data.features[0].properties.lat,
        description: resAttempt.data.features[0].properties.formatted,
        selected: false,
      });
    } else {
      setCurrentLocation(null);
      setNotification(true);
    }
  };

  const onEnterPressed = (e) => {
    if (e.keyCode == 13) {
      fetchAddress();
    }
  };

  const saveLocation = (description) => {
    setNotiProps({isOpen: false});
    setLocationAction(description);
    setNotiProps({isOpen: true, severity: "success", msg: "Saved your location!"});
  }

  const onChange = (value) => {
    setLocationVal(value);
    clearTimeout(timer);
    if (value.length >= 0) {
      setTimer(
        setTimeout(() => {
          (async () => {
            const res = await axios.get(
              `https://api.geoapify.com/v1/geocode/autocomplete?text=${locationVal}&apiKey=${process.env.GEOAPIFY_ACCESS_TOKEN}`
            );
            setOptionsArr(
              res.data.features.map((item) => item.properties.formatted)
            );
          })();
        }, 1000)
      );
    } else {
      setOptionsArr([]);
    }
    return () => clearTimeout(timer);
  };

  return (
    <Container className={classes.container}>
      <Notification {...notiProps} />
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
              <h1>
                Sorry, we don't deliver to your location, or you didn't give us
                any information yet!
              </h1>
              <SentimentVeryDissatisfiedIcon
                style={{ fontSize: 50, color: "red" }}
              />
            </>
          )}
        </div>
        <div className={classes.inputContainer}>
          <Autocomplete
            id="combo-box-demo"
            options={optionsArr}
            getOptionLabel={(option) => option}
            filterOptions={(x) => x}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                margin="normal"
                fullWidth
                className={classes.input}
                value={locationVal}
                onChange={(e) => onChange(e.target.value)}
                onKeyDown={(e) => onEnterPressed(e)}
              />
            )}
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
                <Fab color="primary">
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
                        onClick={() =>
                          saveLocation(currentLocation.description)
                        }
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
      <Carousel
        images={[
          "/static/images/pizza1.jpg",
          "/static/images/slideTwo.webp",
          "/static/images/slideThree.jpg",
        ]}
        isIndexPage
      />
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    location: state.location,
  };
};

const mapDispatchToProps = {
  setLocationAction: setLocationAction,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  geolocated({
    positionOptions: {
      enableHighAccuracy: true,
    },
    isOptimisticGeolocationEnabled: false,
  })(Home)
);
