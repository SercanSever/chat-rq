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

const Chat = () => {
  const [openEmoji, setOpenEmoji] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const lastMessageRef = useRef(true);
  const [chat, setChat] = useState([]);
  const { chatId, user } = useChatStore();
  const { currentUser } = useUserStore();

  const handleEmoji = (e) => {
    setInputValue((prev) => prev + e.emoji);
    setOpenEmoji(false);
  };

  const handleSendMessage = async () => {
    if (inputValue === "") return;

    try {
      const text = inputValue.trim();
      await updateDoc(doc(db, "chats", chatId), {
        messages: arrayUnion({
          senderId: currentUser.id,
          text: text,
          createdAt: new Date(),
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

    setInputValue("");
  };

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", chatId), (res) => {
      setChat(res.data());
    });

    return () => {
      unSub();
    };
  }, [chatId]);
  return (
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
      <div className="center">
        {chat?.messages?.map((message) => {
          return (
            <div
              className={
                currentUser.id !== message.senderId ? "message" : "message own"
              }
              key={message?.createdAt}
            >
              <div className="texts">
                {/* {message.img && <img src={message.img} alt="" />} */}
                <p>{message?.text}test</p>
                <span>{format(message?.createdAt?.toDate())}</span>
              </div>
            </div>
          );
        })}
        <div ref={lastMessageRef}></div>
      </div>
      <div className="bottom">
        <div className="icons">
          <img src="/img.png" alt="" />
          <img src="/camera.png" alt="" />
          <img src="/mic.png" alt="" />
        </div>
        <input
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
  );
};

export default Chat;
