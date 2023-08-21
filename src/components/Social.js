import React from 'react';
import Post1 from '../img/post1.webp';
import Post2 from '../img/post2.webp';
import Post3 from '../img/post3.webp';
import Post4 from '../img/post4.webp';

function Social() {
  return (
    <div>
        <div id="social">
            <h2>Follow Us! @scaryplaces_</h2>
            <p className="text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.</p>
            <div className="container">
                <div className="insta-post">
                  <a href="/">
                    <img src={Post1} alt="" />
                    <div className="overlay"></div>
                  </a>
                </div>
                <div className="insta-post">
                  <a href="/">
                    <img src={Post2} alt="" />
                    <div className="overlay"></div>
                  </a>
                </div>
                <div className="insta-post">
                  <a href="/">
                    <img src={Post3} alt="" />
                    <div className="overlay"></div>
                  </a>
                </div>
                <div className="insta-post">
                  <a href="/">
                    <img src={Post4} alt="" />
                    <div className="overlay"></div>
                  </a>
                </div>
            </div>
        </div>
    </div>
  );
}

export default Social;