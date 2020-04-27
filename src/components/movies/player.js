import React from "react";
import ReactPlayer from "react-player";

const player = props => {
  const url = `https://www.youtube.com/watch?v=${props.url}`;
  console.log("url ==>>", url)
  return (
    <ReactPlayer url={url} playing={false} width={"100%"} controls={true} />
  );
};
export default player;
