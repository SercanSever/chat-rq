import { useEffect, useRef, useState } from "react";
import "./chat.css";
import EmojiPicker from "emoji-picker-react";
import { db } from "../../lib/firebase.jsx";
import {
  arrayUnion,
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { useChatStore } from "../../stores/chat-store.jsx";
import { useUserStore } from "../../stores/user-store.jsx";
import { format } from "timeago.js";
import { uploadChatFileCloudinary } from "../../lib/upload-cloudinary.jsx";
import CheckImage from "../check-image/check-image.jsx";
import {
  useCaptureImageStore,
  useImageStore,
} from "../../stores/image-store.jsx";
import ImageCapture from "./image-capture/image-capture.jsx";
import { use } from "react";

const Chat = () => {
  const [openEmoji, setOpenEmoji] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const lastMessageRef = useRef(true);
  const [chat, setChat] = useState([]);
  const [img, setImg] = useState([]);
  const { chatId, user } = useChatStore();
  const { currentUser } = useUserStore();
  const [isScrolling, setIsScrolling] = useState(false);
  const centerRef = useRef();
  const { storedImage, addImageToStore } = useImageStore();
  const { isOpen, changeIsOpen, capturedImage, removeCapturedImage } =
    useCaptureImageStore();

  const handleEmoji = (e) => {
    setInputValue((prev) => prev + e.emoji);
    setOpenEmoji(false);
  };

  const handleImage = async (e) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));
    setImg(newImages);
  };

  const handleSendMessage = async () => {
    if (inputValue === "" && img.length === 0 && !capturedImage) return;

    try {
      let uploadChatFile = [];
      if (img.length > 0) {
        const uploadPromises = img.map(async (imgItem) => {
          const url = await uploadChatFileCloudinary(imgItem.file, chatId);
          return url;
        });
        uploadChatFile = await Promise.all(uploadPromises);
      }

      if (capturedImage) {
        const url = await uploadChatFileCloudinary(capturedImage, chatId);
        uploadChatFile.push(url);
      }

      const text = inputValue.trim();
      await updateDoc(doc(db, "chats", chatId), {
        messages: arrayUnion({
          senderId: currentUser.id,
          text: text,
          createdAt: new Date(),
          images: uploadChatFile,
        }),
      });

      const userIds = [currentUser.id, user.id];

      userIds.forEach(async (id) => {
        const userCHatRef = doc(db, "userChats", id);
        const userChatsSnapshot = await getDoc(userCHatRef);
        if ((await userChatsSnapshot).exists()) {
          const userChatsData = userChatsSnapshot.data();
          const chatIndex = userChatsData.chats.findIndex(
            (x) => x.chatId === chatId
          );
          userChatsData.chats[chatIndex].lastMessage = text;
          userChatsData.chats[chatIndex].isSeen = id === currentUser.id;
          userChatsData.chats[chatIndex].updatedAt = new Date();

          await updateDoc(userCHatRef, {
            chats: userChatsData.chats,
          });
        }
      });
    } catch (error) {
      console.log(error);
    }
    setImg([]);
    setInputValue("");
    removeCapturedImage();
  };

  const handleRemoveImage = (url) => {
    setImg((image) => image.filter((x) => x.url !== url));
  };

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chat]);

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", chatId), (res) => {
      setChat(res.data());
    });

    return () => {
      unSub();
    };
  }, [chatId]);

  useEffect(() => {
    const centerElement = centerRef.current;
    let timeout;

    const handleScroll = () => {
      setIsScrolling(true);
      clearTimeout(timeout);
      timeout = setTimeout(() => setIsScrolling(false), 1000);
    };

    centerElement.addEventListener("scroll", handleScroll);

    return () => {
      centerElement.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {storedImage && <CheckImage />}
      {isOpen && <ImageCapture />}
      <div className="chat">
        <div className="top">
          <div className="user">
            <img src={user.avatar || "/avatar.png"} alt="" />
            <div className="texts">
              <span>{user.username}</span>
              <p>Lorem ipsum dolor sit amet, consectetur</p>
            </div>
          </div>
          <div className="icons">
            <img src="/phone.png" alt="" />
            <img src="/video.png" alt="" />
            <img src="/info.png" alt="" />
          </div>
        </div>
        <div
          className="center"
          ref={centerRef}
          style={{
            scrollbarWidth: isScrolling ? "thin" : "none", // Firefox
            overflowY: isScrolling ? "scroll" : "auto", // Webkit tabanlı tarayıcılar
          }}
        >
          {chat?.messages?.map((message) => {
            return (
              <div
                className={
                  currentUser.id !== message.senderId
                    ? "message"
                    : "message own"
                }
                key={message?.createdAt}
              >
                <div className="texts">
                  <div className="messageImages">
                    {message.images &&
                      message.images.map((item) => (
                        <img
                          src={item}
                          key={item}
                          alt=""
                          onClick={() => addImageToStore(item)}
                        />
                      ))}
                  </div>
                  <p>{message?.text}</p>
                  <span>{format(message?.createdAt?.toDate())}</span>
                </div>
              </div>
            );
          })}
          <div ref={lastMessageRef}></div>
        </div>

        {(img.length > 0 || capturedImage) && (
          <div className="textImage">
            {img.map((imgItem) => (
              <div className="imgItem" key={imgItem.url}>
                <img
                  className="closeBtn"
                  src="/close.png"
                  alt=""
                  onClick={() => handleRemoveImage(imgItem.url)}
                />
                <img src={imgItem.url} alt="" />
              </div>
            ))}
            {capturedImage && (
              <div className="imgItem">
                <img
                  className="closeBtn"
                  src="/close.png"
                  alt=""
                  onClick={() => removeCapturedImage()}
                />
                <img src={capturedImage} alt="" />
              </div>
            )}
          </div>
        )}

        <div className="bottom">
          <div className="icons">
            <label htmlFor="file">
              <img src="/img.png" alt="" />
            </label>
            <input
              type="file"
              id="file"
              style={{ display: "none" }}
              multiple={true}
              onChange={handleImage}
            />
            <img src="/camera.png" alt="" onClick={() => changeIsOpen(true)} />

            <img src="/mic.png" alt="" />
          </div>
          <textarea
            rows={1}
            type="text"
            placeholder="Send a message"
            className="textInput"
            onChange={(e) => setInputValue(e.target.value)}
            value={inputValue}
          />
          <div className="emoji">
            {openEmoji && (
              <div className="picker">
                <EmojiPicker onEmojiClick={handleEmoji} />
              </div>
            )}
            <img
              src="/emoji.png"
              alt=""
              onClick={() => setOpenEmoji((prev) => !prev)}
            />
          </div>
          <button className="sendButton" onClick={handleSendMessage}>
            Send
          </button>
        </div>
      </div>
    </>
  );
};

export default Chat;
