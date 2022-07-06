import React, { useEffect, useState } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import StaggerAnimation from "../StaggerAnimation";
// import { getGeocode, getLatLng } from "use-places-autocomplete";

const GoogleMapComponent = (props) => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "",
    // googleMapsApiKey: "",
  });

  const [, setMap] = useState(null);
  const [cordinate, setCordinate] = useState({
    lat: 0,
    lng: 0,
  });
  const [flag, setFlag] = useState(true);
  const [zoom, setZoom] = useState(0);
  const [address, setAddress] = useState("");
  useEffect(() => {
    if (props.address) {
      setAddress(props.address);
      setFlag(false);
    }
  }, [props.address]);

  useEffect(() => {
    const parameter = {
      address: address,
    };

    // getGeocode(parameter)
    //   .then((results) => getLatLng(results[0]))
    //   .then((latLng) => {
    //     setCordinate(latLng);
    //   })
    //   .catch((error) => {
    //     console.log("Error: ", error);
    //   });
  }, [address]);
  setTimeout(() => {
    setZoom(15);
  }, 1000);

  const onLoad = React.useCallback(
    function callback(map) {
      const bounds = new window.google.maps.LatLngBounds();
      map.fitBounds(bounds);
      setMap(map);
      const parameter = {
        address: address,
      };

      //   getGeocode(parameter)
      //     .then((results) => getLatLng(results[0]))
      //     .then((latLng) => {
      //       setCordinate(latLng);
      //     })
      //     .catch((error) => {
      //       console.log("Error: ", error);
      //     });
    },
    [address]
  );

  const onUnmount = React.useCallback(function callback() {
    setMap(null);
  }, []);
  return isLoaded ? (
    flag ? (
      <StaggerAnimation />
    ) : (
      <GoogleMap
        mapContainerStyle={{
          width: props.width,
          height: props.height,
        }}
        center={cordinate}
        zoom={zoom}
        onLoad={onLoad}
        options={{ disableDefaultUI: true }}
        onUnmount={onUnmount}
      >
        {props.isMarkerShown && <Marker position={cordinate} />}
      </GoogleMap>
    )
  ) : (
    <></>
  );
};

export default React.memo(GoogleMapComponent);
