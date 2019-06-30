import React from 'react';
import './Home.css';
import video from '../../media/kiting.mp4';
import GitHub from '../../media/GitHub.png';
import Email from '../../media/Email.png';

export default() => {
    return (
        <div className="Home">
            <div className="bg-video">
                <video className="content" autoPlay muted loop playbackrate={.75}>
                    <source src={video} type="video/mp4"/>
                    Your browser is not supported!
                </video>
            </div>
            <div className="info">
                <h1>William Connatser</h1>
                <div className="sub-title">
                    Full Stack Engineering
                </div>
                <a href="https://www.github.com/WilliamConnatser">
                    <img src={GitHub} className="github" alt="Github Link"/>
                </a>
                <a href="mailto:me@williamconnatser.com">
                    <img src={Email} className="github" alt="Email Link"/>
                </a>
            </div>

        </div>
    )
}
