import "./user-info.css";
import { useUserStore } from "../../../stores/user-store.jsx";
import { auth } from "../../../lib/firebase.jsx";
const UserInfo = () => {
  const { currentUser } = useUserStore();

  return (
    <div className="userInfo">
      <div className="user">
        <img
          src={currentUser.avatar || "/chat-rq-logo-background.png"}
          alt=""
        />
        <h3>{currentUser.username}</h3>
      </div>
      <button className="logout" onClick={() => auth.signOut()}>
        Logout
      </button>
      <div className="icons">
        <img src="/more.png" alt="" />
        <img src="/video.png" alt="" />
        <img src="/edit.png" alt="" />
      </div>
    </div>
  );
};

export default UserInfo;
