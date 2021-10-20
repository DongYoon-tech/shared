import React, { useState, useEffect } from "react";
import { Switch, Route, Redirect, BrowserRouter } from "react-router-dom";

import jwt from "jsonwebtoken";
import Home from "./Home";
import Login from "./Login";
import SignUp from "./SignUp";
import Hobbies from "./Hobbies";
import Profile from "./Profile";
import SharedApi from "./Api";
import NavBar from "./NavBar";
import useLocalStorage from "./useLocalStorage";
import { useHistory } from "react-router-dom";

function Shared() {

    const [token, setToken] = useLocalStorage("shared-token")
    const [currentUser, setCurrentUser] = useState(null)
    const [hobbyList, setHobbyList] = useState([])
    const [userData, setUserData] = useState({})

    const history = useHistory()

    useEffect(() => {
        async function getCurrentUser() {
            if (token) {
                try {
                    let { username } = jwt.decode(token)
                    SharedApi.token = token;
                    let currentUser = await SharedApi.getCurrentUser(username)
                    console.log(currentUser)
                    setCurrentUser(currentUser)
                } catch (e) {
                    console.error("Problem Loading", e)
                }
            }
        }
        getCurrentUser()
    }, [token, setCurrentUser, setUserData])

    useEffect(() => {
        async function getAllHobbies() {
            let hobby = await SharedApi.getAllHobby();
            console.log("runnuing")
            setHobbyList(hobby)
        }
        getAllHobbies();
    }, [setHobbyList]) //meetcoord

    // useEffect(() => {
    //     async function getUserHobbies() {
    //         let userInfo = await SharedApi.getCurrentUser(currentUser.username)
    //         setUserData(userInfo)
    //         console.log("userInfo", userInfo)
    //     }
    //     // console.log("userData", userData)
    //     getUserHobbies();
    // }, [setUserData])

    const addHobby = async (data) => {
        let res = await SharedApi.createHobby(data)
        setHobbyList(h => [...h, res])
        console.log('res', res)
        console.log('hobbylist', hobbyList)
    }

    const delHobby = async (id) => {
        let res = await SharedApi.deleteHobby(id);
        console.log('res +', res)
        console.log('currentUser -', currentUser)
        let data = currentUser.hobbies.filter(h => h.id !== id)
        let dataHobbies = hobbyList.filter(h => h.id !== id)
        // currentUser.hobbies = data
        setUserData(currentUser.hobbies = data)
        setHobbyList(dataHobbies)
        console.log("userData", userData)
        console.log("data,", data)
        // history.push('/profile')
        // setCurrentUser(currentUser.hobbies.filter(item => item.id !== id))
        // console.log('currentUser +', currentUser)
        // setHobbyList(h => h.id !== id)
        // console.log('hobbylist-del', hobbyList)

    }

    const signup = async (data) => {
        try {
            let signupToken = await SharedApi.signup(data);
            setToken(signupToken)
            return { success: true }
        } catch (errors) {
            console.error("Signing failed")
            return { success: false, errors }
        }
    }

    const login = async (data) => {
        try {
            let loginToken = await SharedApi.login(data);
            setToken(loginToken)
            return { success: true }
        } catch (errors) {
            console.error("Login failed")
            return { success: false, errors }
        }
    }

    const LogOut = () => {
        setCurrentUser(null)
        setToken("")
    }

    return (
        <BrowserRouter>
            <NavBar
                LogOut={LogOut}
                currentUser={currentUser}
            />
            <Switch>
                <Route exact path="/">
                    <Home
                        currentUser={currentUser}
                        setCurrentUser={setCurrentUser} />
                </Route>
                <Route exact path="/login">
                    <Login login={login} />
                </Route>
                <Route exact path="/signup">
                    <SignUp signup={signup} />
                </Route>
                <Route exact path="/hobbies">
                    <Hobbies
                        currentUser={currentUser}
                        hobbyList={hobbyList}
                        addHobby={addHobby}
                    />
                </Route>
                <Route exact path="/profile">
                    <Profile
                        currentUser={currentUser}
                        delHobby={delHobby}
                        setUserData={setUserData}
                        userData={userData}
                    />
                </Route>
                <Redirect to="/" />
            </Switch>
        </BrowserRouter>
    )
}

export default Shared;