// import { useState } from "react";
import { useEffect, useRef, useState } from "react";
import "./chat-list.css";
import AddUser from "./add-user/add-user";
const ChatList = () => {
  const [addMode, setAddMode] = useState(false);

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
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
      <div className="item">
        <img src="/avatar.png" alt="" />
        <div className="texts">
          <span>Jane Doe</span>
          <p>Hello friend!</p>
        </div>
      </div>
      <div className="item">
        <img src="/avatar.png" alt="" />
        <div className="texts">
          <span>Jane Doe</span>
          <p>Hello friend!</p>
        </div>
      </div>
      <div className="item">
        <img src="/avatar.png" alt="" />
        <div className="texts">
          <span>Jane Doe</span>
          <p>Hello friend!</p>
        </div>
      </div>
      <div className="item">
        <img src="/avatar.png" alt="" />
        <div className="texts">
          <span>Jane Doe</span>
          <p>Hello friend!</p>
        </div>
      </div>
      <div className="item">
        <img src="/avatar.png" alt="" />
        <div className="texts">
          <span>Jane Doe</span>
          <p>Hello friend!</p>
        </div>
      </div>
      <div className="item">
        <img src="/avatar.png" alt="" />
        <div className="texts">
          <span>Jane Doe</span>
          <p>Hello friend!</p>
        </div>
      </div>
      <div className="item">
        <img src="/avatar.png" alt="" />
        <div className="texts">
          <span>Jane Doe</span>
          <p>Hello friend!</p>
        </div>
      </div>
      <div className="item">
        <img src="/avatar.png" alt="" />
        <div className="texts">
          <span>Jane Doe</span>
          <p>Hello friend!</p>
        </div>
      </div>
      <div className="item">
        <img src="/avatar.png" alt="" />
        <div className="texts">
          <span>Jane Doe</span>
          <p>Hello friend!</p>
        </div>
      </div>
      <div className="item">
        <img src="/avatar.png" alt="" />
        <div className="texts">
          <span>Jane Doe</span>
          <p>Hello friend!</p>
        </div>
      </div>
      {addMode && (
        <div ref={addUserRef}>
          <AddUser />
        </div>
      )}
    </div>
  );
};

export default ChatList;
