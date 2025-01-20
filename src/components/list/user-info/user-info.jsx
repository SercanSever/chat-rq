import "./user-info.css";
import { useUserStore } from "../../../stores/user-store.jsx";
import { auth, db } from "../../../lib/firebase.jsx";
import { useChatStore } from "../../../stores/chat-store.jsx";
import { useEffect, useRef, useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
const UserInfo = () => {
  const { currentUser } = useUserStore();
  const { chatId } = useChatStore();
  const inputRef = useRef(null);
  const dropDownRef = useRef(null);
  const menuRef = useRef(null);
  const [nameChangeControl, setNameChangeControl] = useState(false);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [deleteAccountPopup, setDeleteAccountPopup] = useState(false);

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

  const toggleDropdown = () => {
    setIsDropdownVisible((prev) => !prev);
  };

  const handleDeleteAccount = () => {
    setDeleteAccountPopup(true);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        dropDownRef.current &&
        !dropDownRef.current.contains(e.target) &&
        menuRef.current &&
        !menuRef.current.contains(e.target)
      ) {
        setIsDropdownVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="userInfo">
      {deleteAccountPopup && (
        <div className="deleteAccount">
          <p>Are you sure ?</p>
          <div className="deleteIcons">
            <img src="/letter-x.png" alt="" />
            <img src="/check.png" alt="" />
          </div>
        </div>
      )}
      {!deleteAccountPopup && (
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
      )}
      {!deleteAccountPopup && (
        <div className="icons">
          {!nameChangeControl ? (
            <>
              <img
                src="/more.png"
                alt=""
                onClick={toggleDropdown}
                className="dropdownIcon"
                ref={dropDownRef}
              />
              {isDropdownVisible && (
                <div className="dropdownMenu" ref={menuRef}>
                  <button>Edit Status</button>
                  <button onClick={handleDeleteAccount} className="logout">
                    Delete Account
                  </button>
                  <button onClick={() => auth.signOut()}>Logout</button>
                </div>
              )}
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
      )}
    </div>
  );
};

export default UserInfo;
