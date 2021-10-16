import React, { useState, useEffect } from 'react'
import Map from './GoogleMap'
import Geocode from "react-geocode";
import { Grid } from '@material-ui/core'
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {
    CardTitle,
    Button,
    Container,
    Form,
    Input,
    InputGroup,
    Row,
    Col,
    FormGroup,
    Label,
    Card,
    CardBody,
    InputGroupAddon
} from "reactstrap";

import SharedApi from './Api';
import Apikey from "./ApiKey";
import { AiOutlineSearch } from "react-icons/ai";
import { FaUserAlt } from "react-icons/fa";
import "./Hobbies.css"

const Hobbies = ({ currentUser }) => {

    const INITIAL_STATE = {
        lat: 0,
        lng: 0
    }

    const Initial_State_Meet = {
        address: '',
        hobbies: ''
    }

    const Initial_State_Search = {
        address: ''
    }

    const [coordData, setCoordData] = useState(INITIAL_STATE)
    //meet Location
    const [meet, setMeet] = useState(Initial_State_Meet)
    const [meetCoord, setMeetCoord] = useState(INITIAL_STATE)

    //search location
    const [searchLocation, setSearchLocation] = useState(Initial_State_Search)
    const [searchCoord, setSearchCoord] = useState(INITIAL_STATE)

    // get hobbies -- added
    const [hobbyList, setHobbyList] = useState([])
    const [hobbyLocations, setHobbyLocations] = useState([])

    Geocode.setApiKey(Apikey);

    useEffect(() => {
        async function getAllHobbies() {
            let hobby = await SharedApi.getAllHobby();
            setHobbyList(hobby)

            console.log("hobby", hobby)
            console.log("hobbyLocations", hobbyLocations)
        }
        getAllHobbies();
        // think if it needs change instead of meetCoord
    }, [meetCoord])

    // Current location pop up
    useEffect(() => {
        async function getCurrentLocation() {
            // e.preventDefault();
            if (navigator.geolocation) {

                navigator.geolocation.getCurrentPosition(function (position) {
                    setCoordData({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    })
                    console.log("Latitude is :", position.coords.latitude);
                    console.log("Longitude is :", position.coords.longitude);
                })
            } else {
                console.log("Geolocation is not supported by this browser.");
            }
            console.log(coordData);
        }
        getCurrentLocation()
    }, [])

    const handleChange = e => {
        const { name, value } = e.target
        setMeet(data => ({
            ...data,
            [name]: value
        }))
    }

    const handleChangeSearch = e => {
        const { name, value } = e.target
        setSearchLocation(data => ({
            ...data,
            [name]: value
        }))

    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log("handleSubmit", meet.address);
        //review the coordinates are wrong when adding
        let response = await Geocode.fromAddress(meet.address)
        let responseCoord = response.results[0].geometry.location;
        // console.log("lat", lat)
        // console.log("lng", lng)
        console.log("response", responseCoord)
        setMeetCoord(responseCoord)

        let data = {
            "activity": meet.hobbies,
            "meet_address": meet.address,
            "user_username": currentUser.username,
            "lat": responseCoord.lat,
            "lng": responseCoord.lng
        }

        console.log("data", data)

        let res = await SharedApi.createHobby(data)

        console.log("meet", meet)
        setMeet(Initial_State_Meet)
        // setMeetCoord(INITIAL_STATE)

    }

    const handleSearch = async (e) => {
        e.preventDefault();
        console.log("handlesearch", e)
        Geocode.fromAddress(searchLocation.address).then(
            (res) => {
                const { lat, lng } = res.results[0].geometry.location;
                console.log("search coord", lat, lng)
                setSearchCoord({
                    lat: lat,
                    lng: lng
                })
                console.log("setSearchCoord", lat, lng)
                // console.log("setSearchCoord")
            },
            (err) => {
                console.error(err)
            }
        )
        console.log("searchLocation", searchLocation)
        setSearchLocation(Initial_State_Search)
    }


    return (
        <div>
            <Container >
                <Form className="search-form" onSubmit={handleSearch}>
                    <Input
                        id="search"
                        type="text"
                        name="address"
                        className="search-input"
                        value={searchLocation.address}
                        onChange={handleChangeSearch}
                    />
                    <Button className="search-btn" color="primary"><AiOutlineSearch /></Button>
                </Form>
            </Container>

            <Grid container spacing={2} style={{ width: '100%' }}>
                {/* <Grid item xs={12} md={4}> */}
                <Grid item xs={4}>

                    {currentUser
                        ?
                        <div className="left-container">
                            <Card className="hobby-card">
                                <CardBody>
                                    {/* <CardTitle className="card-title">Add Hobby/Location</CardTitle> */}
                                    <Form onSubmit={handleSubmit}>
                                        <FormGroup>
                                            <Label>Hobby:</Label>
                                            <Input
                                                id="hobbies"
                                                type="text"
                                                name="hobbies"
                                                value={meet.hobbies}
                                                onChange={handleChange}

                                            />
                                            <Label>Meet Location:</Label>
                                            <Input
                                                id="address"
                                                type="text"
                                                name="address"
                                                value={meet.address}
                                                onChange={handleChange}
                                            />

                                        </FormGroup>
                                        <Button color="primary">Submit</Button>
                                    </Form>
                                </CardBody>
                            </Card>

                            <div className="hobbies-list-container">
                                <p className="hobbies-list">Hobbies List</p>
                                <>
                                    {hobbyList.map(h => (
                                        <ul>
                                            {
                                                h.user_username == currentUser.username
                                                    ?
                                                    <div className="list">
                                                        {h.activity}
                                                        <div>
                                                            <FaUserAlt />{h.user_username}
                                                        </div>
                                                    </div>
                                                    :
                                                    <div>{h.activity}</div>
                                            }
                                        </ul>
                                    ))}
                                </>
                            </div>
                        </div>
                        :
                        <>
                        </>
                    }
                </Grid>
                {/* <Grid item xs={12} md={8}> */}
                <Grid item xs={8} container
                    direction="row" justifyContent="center"
                    alignItems="center"
                >
                    <Map
                        coordData={coordData}
                        // meetCoord changed to searchCoord
                        searchCoord={searchCoord}
                        hobbyList={hobbyList}
                        currentUser={currentUser}
                    />
                </Grid>
            </Grid>
        </div >
    )
}

export default Hobbies
