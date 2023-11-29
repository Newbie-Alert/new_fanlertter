import React, { useState } from "react";
import * as St from "./styles";

// MAIN COMPONENT
export default function Banner() {
  // VARIABLES
  const img = ["bg1.jpg", "bg2.jpg", "bg3.jpg", "bg4.jpg", "bg5.jpg"];

  const [position, setPosition] = useState(0);

  const moveNext = () => {
    if (position > -400) setPosition((prev) => prev - 100);
  };
  const movePrev = () => {
    if (position < 0) setPosition((prev) => prev + 100);
  };

  // MAIN RETURN
  return (
    <St.BannerContainer>
      <St.Title>NewJeans</St.Title>
      <St.BannerCarouselContainer $position={position}>
        {img.map((el, index) => {
          return <St.BannerImg key={index} $source={`/assets/${el}`} />;
        })}
      </St.BannerCarouselContainer>
      <St.CarouselBtn onClick={movePrev}>{"<"}</St.CarouselBtn>
      <St.CarouselBtn onClick={moveNext}>{">"}</St.CarouselBtn>
    </St.BannerContainer>
  );
}
