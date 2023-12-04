import React from 'react';
import './notFound.module.scss';

const NotFound = () => {
    return (
        <div className="container">
            <div className="mars"></div>
            <img src="https://assets.codepen.io/1538474/404.svg" alt="" className="logo404 " />
            <img src="https://assets.codepen.io/1538474/meteor.svg" alt="" className="meteor" />
            <p className="title">Oh no!!</p>
            <p className="subtitle">
                You’re either misspelling the URL <br /> or requesting a page that's no longer here.
            </p>
            <div style={{ textAlign: "center" }} >
                <a className="btnBack" href="/home">Back to previous page</a>
            </div>
            <img src="https://assets.codepen.io/1538474/astronaut.svg" alt="" className="astronaut" />
            <img src="https://assets.codepen.io/1538474/spaceship.svg" alt="" className="spaceship" />
        </div>
    )
}

export default NotFound;