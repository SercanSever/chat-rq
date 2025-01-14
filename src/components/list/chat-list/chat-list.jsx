// import { useState } from "react";
import { useEffect, useRef, useState } from "react";
import "./chat-list.css";
import AddUser from "./add-user/add-user";
import { useUserStore } from "../../../stores/user-store.jsx";
import { db } from "../../../lib/firebase.jsx";
import { doc, getDoc, onSnapshot } from "firebase/firestore";

const ChatList = () => {
  const [addMode, setAddMode] = useState(false);
  const [chats, setChats] = useState([]);
  const { currentUser } = useUserStore();

  const handleAddMode = () => {
    setAddMode(!addMode);
  };

  const addUserRef = useRef(null);
  const addModeButtonRef = useRef(null);
  const handleClickOutside = (event) => {
    if (
      addUserRef.current &&
      !addUserRef.current.contains(event.target) &&
      !addModeButtonRef.current.contains(event.target)
    ) {
      setAddMode(false);
    }
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
          <div className="item" key={chat.id}>
            <img src={chat.user.avatar || "/avatar.png"} alt="" />
            <div className="texts">
              <span>{chat.user.username}</span>
              <p>{chat.lasMessage}</p>
            </div>
          </div>
        ))}
      {addMode && (
        <div ref={addUserRef}>
          <AddUser />
        </div>
      )}
    </div>
  );
};

export default ChatList;
