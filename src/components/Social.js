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
            <p className="text">Follow us on Instagram for bone-chilling visuals, haunting stories, and a journey into the unknown.</p>
            <div className="container">
                <div className="insta-post">
                  <a href="https://www.instagram.com/p/BuPtonNFjFN/?utm_source=ig_web_copy_link&igshid=MzRlODBiNWFlZA==" target="_blank" rel="noreferrer">
                    <img src={Post1} alt="" />
                    <div className="overlay"></div>
                  </a>
                </div>
                <div className="insta-post">
                  <a href="https://www.instagram.com/p/BxgBlWXFVuD/?utm_source=ig_web_copy_link&igshid=MzRlODBiNWFlZA==" target="_blank" rel="noreferrer">
                    <img src={Post2} alt="" />
                    <div className="overlay"></div>
                  </a>
                </div>
                <div className="insta-post">
                  <a href="https://www.instagram.com/p/BuW_jPIlVKj/?utm_source=ig_web_copy_link&igshid=MzRlODBiNWFlZA==" target="_blank" rel="noreferrer">
                    <img src={Post3} alt="" />
                    <div className="overlay"></div>
                  </a>
                </div>
                <div className="insta-post">
                  <a href="https://www.instagram.com/p/BvfZk71l3mo/?utm_source=ig_web_copy_link" target="_blank" rel="noreferrer">
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