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
import UserContext from "./UserContext"
import { useHistory } from "react-router-dom";

function Shared() {

    const [token, setToken] = useLocalStorage("shared-token")
    const [currentUser, setCurrentUser] = useState(null)
    const [infoLoaded, setInfoLoaded] = useState(false);
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
                    setCurrentUser(currentUser)
                } catch (e) {
                    console.error("Problem Loading", e)
                }
            }
            setInfoLoaded(true);
        }
        setInfoLoaded(false);
        getCurrentUser()
    }, [token, setCurrentUser, hobbyList, setHobbyList])

    useEffect(() => {
        async function getAllHobbies() {
            let hobby = await SharedApi.getAllHobby();
            setHobbyList(hobby)
        }
        getAllHobbies();
    }, [setHobbyList]) //meetcoord

    const addHobby = async (data) => {
        let res = await SharedApi.createHobby(data)
        setHobbyList(h => [...h, res])
    }

    const delHobby = async (id) => {
        let res = await SharedApi.deleteHobby(id);
        let data = currentUser.hobbies.filter(h => h.id !== id)
        let dataHobbies = hobbyList.filter(h => h.id !== id)

        setUserData(currentUser.hobbies = data)
        setHobbyList(dataHobbies)
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

    if (!infoLoaded) return <div>Loading...</div>;

    return (
        <BrowserRouter>
            <UserContext.Provider value={{ currentUser }}>
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
                            setCurrentUser={setCurrentUser}
                            delHobby={delHobby}
                            setUserData={setUserData}
                            userData={userData}
                            hobbyList={hobbyList}
                        />
                    </Route>
                    <Redirect to="/" />
                </Switch>
            </UserContext.Provider>
        </BrowserRouter>
    )
}

export default Shared;