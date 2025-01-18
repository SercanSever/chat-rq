import { useImageStore } from "../../stores/image-store";
import "./check-image.css";

const CheckImage = () => {
  const { storedImage, removeStoredImage } = useImageStore();
  console.log(storedImage);
  return (
    <div className="checkImage">
      <div className="close" onClick={removeStoredImage}>
        <img src="/close.png" alt="" />
      </div>
      {storedImage.endsWith(".webm") ? (
        <audio controls>
          <source src={storedImage} type="audio/webm" />
        </audio>
      ) : (
        <img src={storedImage} alt="" />
      )}
    </div>
  );
};

export default CheckImage;
