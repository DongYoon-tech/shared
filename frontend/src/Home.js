import React from 'react'
import Video from "../src/video/bg-video.mp4"
import { Link } from 'react-router-dom';
import "./Home.css"

function Home({ currentUser }) {
    return (
        <section className="home">
            <div>

                {currentUser
                    ?
                    <div>
                        <h1 className="welcome-user">Welcome {currentUser.username}!</h1>
                        <Link className="get-started" to="/hobbies">Go To Hobbies</Link>
                    </div>
                    :
                    <h1 className="welcome-user">Welcome!!</h1>
                }
            </div>
        </section>
    );
}

export default Home;