import { useEffect, useRef, useState } from "react";
import { auth, db } from "../../lib/firebase";

import "./detail.css";
import { useChatStore } from "../../stores/chat-store";
import { useUserStore } from "../../stores/user-store";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
const Detail = () => {
  const [isScrolling, setIsScrolling] = useState(false);
  const infoRef = useRef();
  const { user, isCurrentUserBlocked, isReceiverBlocked, changeBlock } =
    useChatStore();
  const { currentUser } = useUserStore();

  const handleBlock = async () => {
    if (!user) return;

    const userDocRef = doc(db, "users", currentUser.id);

    try {
      await updateDoc(userDocRef, {
        blocked: isReceiverBlocked ? arrayRemove(user.id) : arrayUnion(user.id),
      });
      changeBlock();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const infoElement = infoRef.current;
    let timeout;
    const handleScroll = () => {
      setIsScrolling(true);
      clearTimeout(timeout);
      timeout = setTimeout(() => setIsScrolling(false), 1000);
    };

    infoElement.addEventListener("scroll", handleScroll);

    return () => {
      infoElement.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="detail">
      <div className="user">
        <img src={user?.avatar || "chat-rq-logo-background.png"} alt="" />
        <h2>{user?.username}</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing </p>
      </div>
      <div
        className="info"
        ref={infoRef}
        style={{
          scrollbarWidth: isScrolling ? "thin" : "none", // Firefox
          overflowY: isScrolling ? "scroll" : "auto", // Webkit tabanlı tarayıcılar
        }}
      >
        <div className="option">
          <div className="title">
            <span>Chat Settings</span>
            <img src="/arrowUp.png" alt="" />
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Chat Settings</span>
            <img src="/arrowUp.png" alt="" />
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Privacy & Help</span>
            <img src="/arrowUp.png" alt="" />
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Shared Photos</span>
            <img src="/arrowDown.png" alt="" />
          </div>
          <div className="photos">
            <div className="photoItem">
              <div className="photoDetail">
                <img src=" " alt="" />
                <span>photo_2024.png</span>
              </div>
              <img src="/download.png" alt="" />
            </div>
            <div className="photoItem">
              <div className="photoDetail">
                <img src=" " alt="" />
                <span>photo_2024.png</span>
              </div>
              <img src="/download.png" alt="" />
            </div>
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Shared Fİles</span>
            <img src="/arrowDown.png" alt="" />
          </div>
          <div className="files">
            <div className="fileItems">
              <div className="fileDetail">
                <img src=" " alt="" />
                <span>file-14-12.png</span>
              </div>
              <img src="/download.png" alt="" />
            </div>
            <div className="fileItems">
              <div className="fileDetail">
                <img src=" " alt="" />
                <span>file-13-04.png</span>
              </div>
              <img src="/download.png" alt="" />
            </div>
            <div className="fileItems">
              <div className="fileDetail">
                <img src=" " alt="" />
                <span>file-13-04.png</span>
              </div>
              <img src="/download.png" alt="" />
            </div>
            <div className="fileItems">
              <div className="fileDetail">
                <img src=" " alt="" />
                <span>file-13-04.png</span>
              </div>
              <img src="/download.png" alt="" />
            </div>
          </div>
        </div>
      </div>
      <div className="buttons">
        <button className="logout" onClick={() => auth.signOut()}>
          Logout
        </button>
        <button className="block" onClick={handleBlock}>
          {isCurrentUserBlocked
            ? "You are blocked"
            : isReceiverBlocked
            ? "Unblock"
            : "Block"}
        </button>
      </div>
    </div>
  );
};

export default Detail;
