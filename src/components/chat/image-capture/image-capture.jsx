import { useRef } from "react";
import Webcam from "react-webcam";
import { useCaptureImageStore } from "../../../stores/image-store.jsx";
import "./image-capture.css";

const ImageCapture = () => {
  const webcamRef = useRef(null);
  const { addCapturedImage, changeIsOpen } = useCaptureImageStore();

  const capturePhoto = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    addCapturedImage(imageSrc);
    changeIsOpen(false);
  };

  const handleClose = () => {
    changeIsOpen(false);
  };

  return (
    <div className="imageCapture">
      <img src="/close.png" alt="" onClick={handleClose} />
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        style={{ width: "100%", height: "auto" }}
        className="webcam"
      />
      <button onClick={capturePhoto}>Capture Photo</button>
    </div>
  );
};

export default ImageCapture;
