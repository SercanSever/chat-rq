import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Notification = () => {
  return (
    <div className="notification">
      <ToastContainer position="top-center" />
    </div>
  );
};

export default Notification;
