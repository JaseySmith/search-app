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
              value: 80,
              density: {
                enable: true,
                value_area: 800,
              },
            },
            color: {
              value: ["#c8c8c8", "#a0a0a0", "#808080", "#606060", "#a278ff", "#8b5cf6", "#7c3aed"], 
            },
            shape: {
              type: "circle",
            },
            opacity: {
              value: 0.2175,
              random: true,
              anim: {
                enable: true,
                speed: 0.3,
                opacity_min: 0.1095,
                opacity_max: 0.654,
                sync: false,
              },
            },
            size: {
              value: 3,
              random: true,
              anim: {
                enable: true,
                speed: 0.5,
                size_min: 1,
                size_max: 6,
                sync: false,
              },
            },
            links: {
              enable: false,
            },
            move: {
              enable: true,
              speed: 0.55,
              direction: "none",
              random: true,
              straight: false,
              out_mode: "out",
              bounce: false,
              drift: {
                enable: true,
                drift_x: 2.75,
                drift_y: 1.1,
              },
            },
            twinkle: {
              particles: {
                enable: true,
                frequency: 0.05,
                opacity: 1,
              },
            },
          },
          interactivity: {
            detect_on: "canvas",
            events: {
              onhover: {
                enable: false,
              },
              onclick: {
                enable: false,
              },
              resize: true,
            },
          },
          retina_detect: true,
        }}         
      /> 
    </div> 
  ); 
}; 
export default Background;