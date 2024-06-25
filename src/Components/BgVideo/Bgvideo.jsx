import React from "react";
import video from "../../../public/bgvideo/Comp 1_1.mp4";
function BgVideo() {
  return (
    <div
      className="fixed left-0 top-0  w-full h-[300px] "
      style={{
        zIndex: -1,
        backgroundColor: "rgba(7, 7, 7, 0.7)",
      }}
    >
      <video
        autoPlay
        loop
        muted
        playsInline
        controls={false}
        className="w-full h-full object-cover "
      >
        <source src={video} type="video/mp4" />
      </video>

      {/* <video
        autoPlay
        loop
        muted
        controls={false}
        playsInline
        className="w-full h-full object-cover hidden sm:block"
      >
        <source src="/bgVideo/video_ landscape.mp4" type="video/mp4" />
      </video> */}
    </div>
  );
}

export default BgVideo;
