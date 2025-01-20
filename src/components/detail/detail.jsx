import { useEffect, useRef, useState } from "react";
import { auth, db } from "../../lib/firebase";

import "./detail.css";
import { useChatStore } from "../../stores/chat-store";
import { useUserStore } from "../../stores/user-store";
import {
  arrayRemove,
  arrayUnion,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { useImageStore } from "../../stores/image-store";
import CheckImage from "../check-image/check-image";
const Detail = () => {
  const [isScrolling, setIsScrolling] = useState(false);
  const infoRef = useRef();
  const { user, isCurrentUserBlocked, isReceiverBlocked, changeBlock } =
    useChatStore();
  const { currentUser } = useUserStore();
  const { chatId } = useChatStore();
  const { storedImage, addImageToStore } = useImageStore();
  const [images, setImages] = useState();
  const [showFiles, setShowFiles] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showChatSettings, setShowChatSettings] = useState(false);

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

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", chatId), (res) => {
      const data = res.data();
      if (data && Array.isArray(data.messages)) {
        const allImages = data.messages.flatMap(
          (message) => message.images || []
        );
        setImages(allImages);
      }
    });

    return () => {
      unSub();
    };
  }, [chatId, setImages]);

  return (
    <>
      {storedImage && <CheckImage />}
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
              <img
                src={showChatSettings ? "/arrowDown.png" : "/arrowUp.png"}
                alt=""
                onClick={() => setShowChatSettings(!showChatSettings)}
              />
            </div>
            {showChatSettings && (
              <div className="content">
                <p>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Perspiciatis, optio. Architecto accusamus nemo voluptatibus
                  provident. Ullam, dignissimos dolore. Nemo quo velit
                  laboriosam laborum dolores tempore earum praesentium voluptas
                  temporibus porro.
                </p>
              </div>
            )}
          </div>

          <div className="option">
            <div className="title">
              <span>Privacy & Help</span>
              <img
                src={showPrivacy ? "/arrowDown.png" : "/arrowUp.png"}
                alt=""
                onClick={() => setShowPrivacy(!showPrivacy)}
              />
            </div>

            {showPrivacy && (
              <div className="content">
                <p>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Perspiciatis, optio. Architecto accusamus nemo voluptatibus
                  provident. Ullam, dignissimos dolore. Nemo quo velit
                  laboriosam laborum dolores tempore earum praesentium voluptas
                  temporibus porro.
                </p>
              </div>
            )}
          </div>

          <div className="option">
            <div className="title">
              <span>Shared Files</span>
              <img
                src={showFiles ? "/arrowDown.png" : "/arrowUp.png"}
                alt=""
                onClick={() => setShowFiles(!showFiles)}
              />
            </div>
            <div className={showFiles ? "photos open" : "photos close"}>
              {images &&
                showFiles &&
                images.map((image, index) => (
                  <div
                    className="photoItem"
                    key={index}
                    onClick={() => addImageToStore(image)}
                  >
                    <div className="photoDetail">
                      <img
                        src={image.endsWith(".webm") ? "/audio.png" : image}
                        alt=""
                      />
                    </div>
                  </div>
                ))}
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
    </>
  );
};

export default Detail;
