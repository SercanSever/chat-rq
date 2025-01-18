import "./user-info.css";
import { useUserStore } from "../../../stores/user-store.jsx";
import { auth } from "../../../lib/firebase.jsx";
import { useChatStore } from "../../../stores/chat-store.jsx";
const UserInfo = () => {
  const { currentUser } = useUserStore();
  const { chatId } = useChatStore();

  return (
    <div className="userInfo">
      <div className="user">
        <img
          src={currentUser.avatar || "/chat-rq-logo-background.png"}
          alt=""
        />
        <h3>{currentUser.username}</h3>
        {!chatId && (
          <button className="logout" onClick={() => auth.signOut()}>
            <img src="/switch.png" alt="" />
          </button>
        )}
      </div>
      <div className="icons">
        <img src="/more.png" alt="" />
        <img src="/video.png" alt="" />
        <img src="/edit.png" alt="" />
      </div>
    </div>
  );
};

export default UserInfo;
