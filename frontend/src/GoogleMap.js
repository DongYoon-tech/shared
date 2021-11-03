import React, { Component, useState } from 'react';
// import { Map, GoogleApiWrapper } from 'google-maps-react';
import { GoogleMap, InfoWindow, Marker, useLoadScript } from "@react-google-maps/api"
import GoogleMapReact from 'google-map-react'
import "./GoogleMap.css"
import Apikey from "./ApiKey"
import { ImUser } from "react-icons/im";
import { IoMdPeople } from "react-icons/io"

const Map = ({ coordData, searchCoord, hobbyList, currentUser }) => {

    const [click, setClick] = useState(false)
    const [selectedPlace, setSelectedPlace] = useState(null)
    const [markerMap, setMarkerMap] = useState({});

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: Apikey
    })

    if (loadError) return "Error loading maps"
    if (!isLoaded) return "Loading  Maps"

    // const coordinates = { lat: 0, lng: 0 };
    //default to LA if there are no coordinates------------
    const LAcoord = {
        lat: 34.05046017623052,
        lng: -118.24620769347275
    }

    if (searchCoord.lat == '' && searchCoord.lng == '') {
        // 34.05046017623052, -118.24620769347275
        // LA coord
        searchCoord.lat = LAcoord.lat
        searchCoord.lng = LAcoord.lng
    }

    const markerLoadHandler = (marker, h) => {
        return setMarkerMap(prevState => {
            return { ...prevState, [h.id]: marker };
        });
    }

    const handleClick = (e, place) => {
        setSelectedPlace(place)

        if (click) {
            setClick(false)
        }
        setClick(true)

    }

    return (
        <>
            <GoogleMap
                // change the style and export from css
                mapContainerStyle={{ width: "50vw", height: "85vh" }}
                zoom={14}
                center={searchCoord}
            >
                {hobbyList.map(h => (

                    <Marker
                        key={h.id}
                        position={{
                            lat: h.lat,
                            lng: h.lng
                        }}
                        onLoad={marker => markerLoadHandler(marker, h)}
                        onClick={e => handleClick(e, h)}
                    />
                ))}
                {click && selectedPlace && (
                    <InfoWindow
                        anchor={markerMap[selectedPlace.id]}
                        onCloseClick={() => setClick(false)}
                    >
                        <div className="message">
                            <p className="username"> <ImUser /> {selectedPlace.user_username}</p>
                            <p className="hobby"> <IoMdPeople /> {selectedPlace.activity}</p>
                        </div>
                    </InfoWindow>
                )}
            </GoogleMap>
        </>
    )
}

export default Map