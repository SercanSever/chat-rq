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
  const [isScrolling, setIsScrolling] = useState(false);
  const [search, setSearch] = useState("");
  const addUserButtonRef = useRef(null);
  const addModeButtonRef = useRef(null);
  const chatListItemRef = useRef();
  const { currentUser } = useUserStore();
  const { changeChat } = useChatStore();

  const handleAddMode = () => {
    setAddMode(!addMode);
  };

  const handleClickOutside = (event) => {
    if (
      addModeButtonRef.current &&
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

  const filteredChats = chats.filter((chat) =>
    chat.user.username.toLowerCase().includes(search.toLowerCase())
  );

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
  }, [currentUser.id, search]);

  useEffect(() => {
    const chatListElement = chatListItemRef.current;
    let timeout;

    const handleScroll = () => {
      setIsScrolling(true);
      clearTimeout(timeout);
      timeout = setTimeout(() => setIsScrolling(false), 1000);
    };

    chatListElement.addEventListener("scroll", handleScroll);

    return () => {
      chatListElement.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="chatList">
      <div className="search">
        <div className="searchBar">
          <img src="/search.png" alt="" />
          <input
            type="text"
            placeholder="Search for friends"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <img
          src={addMode ? "/minus.png" : "/plus.png"}
          alt="plus"
          className="add"
          onClick={handleAddMode}
          ref={addModeButtonRef}
        />
      </div>
      <div
        className="chatListItem"
        ref={chatListItemRef}
        style={{
          scrollbarWidth: isScrolling ? "thin" : "none", // Firefox
          overflowY: isScrolling ? "scroll" : "auto", // Webkit tabanlı tarayıcılar
        }}
      >
        {filteredChats &&
          filteredChats.map((chat) => (
            <div
              className={`item ${chat.isSeen ? "seen" : "unseen"}`}
              key={chat.chatId}
              onClick={() => handleSelect(chat)}
            >
              <img
                src={chat.user.avatar || "/chat-rq-logo-background.png"}
                alt=""
              />
              <div className="texts">
                <span>{chat.user.username}</span>
                <p>{chat.lastMessage}</p>
              </div>
            </div>
          ))}

        {/* {filteredChats.length === 2 && (
          <div className="empty">
            <h3>Sorry :( No chats found</h3>
            <p>
              Invite your friends and start chatting instantly! Just enter their
              email below and send them an email notification.
            </p>
            <div className="sendEmail">
              <input type="text" />
              <button>Send Invitation</button>
            </div>
          </div>
        )} */}
      </div>
      {addMode && <AddUser />}
    </div>
  );
};

export default ChatList;
