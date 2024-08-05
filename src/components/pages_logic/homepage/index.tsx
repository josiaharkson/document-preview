import React from "react";
import Preview from "@/components/blocks/Preview";
import "./homepage.css";
function Homepage() {
  const extension = "mp4";
  const src =
    "https://shekel-bucket.s3.amazonaws.com/uploads/1721898499-whats-app-video-2024-03-05-at-121906-pm.mp4";
  return (
    <div>
      <Preview extension={extension} src={src} />
    </div>
  );
}

export default Homepage;
