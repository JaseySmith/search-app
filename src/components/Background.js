import React from "react"; 
import Particles from "react-tsparticles"; 
import { loadFull } from "tsparticles"; 
const Background = () => { 
  const particlesInit = async (main) => { 
    console.log(main); 
    // you can initialize the tsParticles instance (main) here, adding custom shapes or presets 
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready 
    // starting from v2 you can add only the features you need reducing the bundle size 
    await loadFull(main); 
  }; 
  const particlesLoaded = (container) => { 
    console.log(container); 
  }; 
  return ( 
    <div className="background"> 
      <Particles 
        id="tsparticles" 
        init={particlesInit} 
        loaded={particlesLoaded} 
        options={{
          fpsLimit: 60,
          fullScreen: {
            enable: false,
            zIndex: -1,
          },
          background: {
            color: {
              value: "transparent",
            },
          },
          particles: {
            number: {
              value: 60,
              density: {
                enable: true,
                value_area: 1000,
              },
            },
            color: {
              value: "#A278FF", 
            },
            shape: {
              type: "circle",
            },
            opacity: {
              value: 0.2,
              random: true,
              anim: {
                enable: true,
                speed: 0.5,
                opacity_min: 0.1,
                sync: false,
              },
            },
            size: {
              value: 2,
              random: true,
              anim: {
                enable: true,
                speed: 1,
                size_min: 0.5,
                sync: false,
              },
            },
            links: {
              enable: true,
              distance: 130,
              color: "#a278ff",
              opacity: 0.3,
              width: 2,
              triangles: {
                enable: true,
                color: ["#a278ff"],
                opacity: 0.03,
              },
            },
            move: {
              enable: true,
              speed: 0.2,
              direction: "none",
              random: true,
              straight: false,
              out_mode: "out",
              bounce: false,
            },
          },
          interactivity: {
            detect_on: "canvas",
            events: {
              onhover: {
                enable: true,
                mode: "grab",
              },
              onclick: {
                enable: true,
                mode: "push",
              },
              resize: true,
            },
            modes: {
              grab: {
                distance: 180,
                line_linked: {
                  opacity: 0.6,
                },
              },
              push: {
                particles_nb: 2,
              },
              repulse: {
                distance: 100,
                duration: 0.4,
              },
            },
          },
          retina_detect: true,
        }}         
      /> 
    </div> 
  ); 
}; 
export default Background;