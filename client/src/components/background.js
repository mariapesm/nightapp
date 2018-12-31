import React, { Component } from 'react';

class Background extends Component {

  componentDidMount() {
    var vid = document.getElementById("bgvid");

    if (window.matchMedia('(prefers-reduced-motion)').matches) {
      vid.removeAttribute("autoplay");
      vid.pause();
    }

    function vidFade() {
      vid.classList.add("stopfade");
    }

    vid.addEventListener('ended', function () {
      // only functional if "loop" is removed 
      vid.pause();
      // to capture IE10
      vidFade();
    });

  }

  render() {
    return (

      <video poster="https://storage.googleapis.com/cover_video/Snapshots/The-DJ.jpg" id="bgvid" playsInline autoPlay muted>
        <source src="https://storage.googleapis.com/cover_video/MP4/The-DJ.mp4" type="video/mp4" />
        <source src="https://storage.googleapis.com/cover_video/WEBM/The-DJ.webm" type="video/webm" />
      </video>

    );
  }
}

export default Background;
