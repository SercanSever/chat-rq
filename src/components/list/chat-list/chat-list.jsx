// import { useState } from "react";
import { useEffect, useRef, useState } from "react";
import "./chat-list.css";
import AddUser from "./add-user/add-user";
import { useUserStore } from "../../../stores/user-store.jsx";
import { db } from "../../../lib/firebase.jsx";
import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { useChatStore } from "../../../stores/chat-store.jsx";

const ChatList = () => {
  const [addMode, setAddMode] = useState(false);
  const [chats, setChats] = useState([]);
  const addUserButtonRef = useRef(null);
  const addModeButtonRef = useRef(null);
  const { currentUser } = useUserStore();
  const { changeChat } = useChatStore();

  const handleAddMode = () => {
    setAddMode(!addMode);
  };

  const handleClickOutside = (event) => {
    if (
      addUserButtonRef.current &&
      !addUserButtonRef.current.contains(event.target) &&
      !addModeButtonRef.current.contains(event.target)
    ) {
      setAddMode(false);
    }
  };

  const handleSelect = async (chat) => {
    const userChats = chats.map((item) => {
      // eslint-disable-next-line no-unused-vars
      const { user, ...rest } = item;
      return rest;
    });

    const chatIndex = userChats.findIndex((x) => x.chatId === chat.chatId);
    userChats[chatIndex].isSeen = true;

    const userChatsRef = doc(db, "userChats", currentUser.id);
    try {
      await updateDoc(userChatsRef, {
        chats: userChats,
      });
    } catch (error) {
      console.error("Error updating document: ", error);
    }

    changeChat(chat.chatId, chat.user);
  };

  useEffect(() => {
    const unSub = onSnapshot(
      doc(db, "userChats", currentUser.id),
      async (res) => {
        const items = res.data().chats;

        const promises = items.map(async (item) => {
          const userDocRef = doc(db, "users", item.reveiverId);
          const userDocSnap = await getDoc(userDocRef);
          const user = userDocSnap.data();

          return { ...item, user };
        });

        const chatData = await Promise.all(promises);
        setChats(chatData.sort((a, b) => b.updatedAt - a.updatedAt));
      }
    );
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      unSub();
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [currentUser.id]);

  return (
    <div className="chatList">
      <div className="search">
        <div className="searchBar">
          <img src="/search.png" alt="" />
          <input type="text" placeholder="Search for friends" />
        </div>
        <img
          src={addMode ? "/minus.png" : "/plus.png"}
          alt="plus"
          className="add"
          onClick={handleAddMode}
          ref={addModeButtonRef}
        />
      </div>
      {chats &&
        chats.map((chat) => (
          <div
            className="item"
            key={chat.chatId}
            onClick={() => handleSelect(chat)}
            style={{
              backgroundColor: chat.isSeen
                ? "transparent"
                : "rgba(255, 213, 0, 0.3)",
            }}
          >
            <img src={chat.user.avatar || "/avatar.png"} alt="" />
            <div className="texts">
              <span>{chat.user.username}</span>
              <p>{chat.lasMessage}</p>
            </div>
          </div>
        ))}
      {addMode && (
        <div ref={addUserButtonRef}>
          <AddUser />
        </div>
      )}
    </div>
  );
};

export default ChatList;
