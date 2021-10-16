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

function Shared() {

    const [token, setToken] = useLocalStorage("shared-token")
    const [currentUser, setCurrentUser] = useState(null)

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
    }, [token, setCurrentUser])

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
                    <Hobbies currentUser={currentUser} />
                </Route>
                <Route exact path="/profile">
                    <Profile currentUser={currentUser} />
                </Route>
                <Redirect to="/" />
            </Switch>
        </BrowserRouter>
    )
}

export default Shared;