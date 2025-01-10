// import { useState } from "react";
import { useState } from "react";
import "./chat-list.css";
const ChatList = () => {
  const [addMode, setAddMode] = useState(false);
  const handleAddMode = () => {
    setAddMode(!addMode);
  };

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
    </div>
  );
};

export default ChatList;
