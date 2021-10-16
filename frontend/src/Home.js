import React from 'react'
import Video from "../src/video/bg-video.mp4"
import { Link } from 'react-router-dom';
import "./Home.css"

function Home({ currentUser }) {
    return (
        <section className="home">
            {currentUser
                ?
                <Link className="get-started" to="/hobbies">Go To Hobbies</Link>
                :
                <></>
            }

        </section>
    );
}

export default Home;