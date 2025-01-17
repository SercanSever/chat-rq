import { useImageStore } from "../../stores/image-store";
import "./check-image.css";
import React from "react";

const CheckImage = () => {
  const { storedImage, removeStoredImage } = useImageStore();
  return (
    <div className="checkImage">
      <div className="close" onClick={removeStoredImage}>
        <img src="/close.png" alt="" />
      </div>
      <img src={storedImage} alt="" />
    </div>
  );
};

export default CheckImage;
