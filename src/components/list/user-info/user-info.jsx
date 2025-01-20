import "./user-info.css";
import { useUserStore } from "../../../stores/user-store.jsx";
import { auth, db } from "../../../lib/firebase.jsx";
import { useChatStore } from "../../../stores/chat-store.jsx";
import { useEffect, useRef, useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
const UserInfo = () => {
  const { currentUser } = useUserStore();
  const { chatId } = useChatStore();
  const [nameChangeControl, setNameChangeControl] = useState(false);
  const inputRef = useRef(null);

  const handleNameChange = () => {
    setNameChangeControl(!nameChangeControl);
  };

  const handleUserNameUpdate = async () => {
    const inputValue = inputRef.current.value;

    if (inputValue === currentUser.username) {
      setNameChangeControl(false);
      return;
    }

    const userRef = doc(db, "users", currentUser.id);
    await updateDoc(userRef, {
      username: inputValue,
    });
    currentUser.username = inputValue;
  };

  useEffect(() => {
    if (nameChangeControl && inputRef.current) {
      inputRef.current.focus();
    }
  }, [nameChangeControl]);

  return (
    <div className="userInfo">
      <div className="user">
        <img
          src={currentUser.avatar || "/chat-rq-logo-background.png"}
          alt=""
        />
        {!nameChangeControl ? (
          <h4>{currentUser.username}</h4>
        ) : (
          <input
            type="text"
            ref={inputRef}
            defaultValue={currentUser.username}
          />
        )}
        {!chatId && (
          <button className="logout" onClick={() => auth.signOut()}>
            <img src="/switch.png" alt="" />
          </button>
        )}
      </div>
      <div className="icons">
        {!nameChangeControl ? (
          <>
            <img src="/more.png" alt="" />
            <img src="/edit.png" alt="" onClick={handleNameChange} />
          </>
        ) : (
          <img
            src="/check.png"
            alt=""
            className="yesIcon"
            onClick={handleUserNameUpdate}
          />
        )}
      </div>
    </div>
  );
};

export default UserInfo;
