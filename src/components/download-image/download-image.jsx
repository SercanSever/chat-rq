import { saveAs } from "file-saver";
import PropTypes from "prop-types";

const DownloadImage = ({ imageUrl }) => {
  const downloadImage = () => {
    saveAs(imageUrl, "image.jpg");
  };

  return (
    <>
      <img src="/download.png" alt="" onClick={downloadImage} />
    </>
  );
};

DownloadImage.propTypes = {
  imageUrl: PropTypes.string.isRequired,
};
export default DownloadImage;
