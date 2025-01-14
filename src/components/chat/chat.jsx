import { useEffect, useRef, useState } from "react";
import "./chat.css";
import EmojiPicker from "emoji-picker-react";
import { db } from "../../lib/firebase.jsx";
import { doc, onSnapshot } from "firebase/firestore";

const Chat = () => {
  const [openEmoji, setOpenEmoji] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const lastMessageRef = useRef(true);
  const [chat, setChat] = useState([]);

  const handleEmoji = (e) => {
    setInputValue((prev) => prev + e.emoji);
    setOpenEmoji(false);
  };

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  useEffect(() => {
    const unSub = onSnapshot(
      doc(db, "chats", "oLiPDO4jwOh4OAeBPLfq"),
      (res) => {
        setChat(res.data());
      }
    );

    return () => {
      unSub();
    };
  }, []);

  console.log(chat);
  return (
    <div className="chat">
      <div className="top">
        <div className="user">
          <img src="/avatar.png" alt="" />
          <div className="texts">
            <span>Jane Doe</span>
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
        <div className="message own">
          <div className="texts">
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Saepe
              nesciunt eum natus maiores iste in alias recusandae, omnis
            </p>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="message">
          <img src="/avatar.png" alt="" />
          <div className="texts">
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Saepe
              nesciunt eum natus maiores iste in alias recusandae, omnis
            </p>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="message own">
          <div className="texts">
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Saepe
              nesciunt eum natus maiores iste in alias recusandae, omnis
            </p>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="message">
          <img src="/avatar.png" alt="" />
          <div className="texts">
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Saepe
              nesciunt eum natus maiores iste in alias recusandae, omnis
            </p>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="message own">
          <div className="texts">
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Saepe
              nesciunt eum natus maiores iste in alias recusandae, omnis
            </p>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="message">
          <img src="/avatar.png" alt="" />
          <div className="texts">
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Saepe
              nesciunt eum natus maiores iste in alias recusandae, omnis
            </p>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="message own">
          <div className="texts">
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Saepe
              nesciunt eum natus maiores iste in alias recusandae, omnis
            </p>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="message">
          <img src="/avatar.png" alt="" />
          <div className="texts">
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Saepe
              nesciunt eum natus maiores iste in alias recusandae, omnis
            </p>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="message own">
          <div className="texts">
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Saepe
              nesciunt eum natus maiores iste in alias recusandae, omnis
            </p>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="message">
          <img src="/avatar.png" alt="" />
          <div className="texts">
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Saepe
              nesciunt eum natus maiores iste in alias recusandae, omnis
            </p>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="message own">
          <div className="texts">
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Saepe
              nesciunt eum natus maiores iste in alias recusandae, omnis
            </p>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="message">
          <img src="/avatar.png" alt="" />
          <div className="texts">
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Saepe
              nesciunt eum natus maiores iste in alias recusandae, omnis
            </p>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="message own">
          <div className="texts">
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Saepe
              nesciunt eum natus maiores iste in alias recusandae, omnis
            </p>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="message">
          <img src="/avatar.png" alt="" />
          <div className="texts">
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Saepe
              nesciunt eum natus maiores iste in alias recusandae, omnis
            </p>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="message own">
          <div className="texts">
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Saepe
              nesciunt eum natus maiores iste in alias recusandae, omnis
            </p>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="message">
          <img src="/avatar.png" alt="" />
          <div className="texts">
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Saepe
              nesciunt eum natus maiores iste in alias recusandae, omnis
            </p>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="message own">
          <div className="texts">
            <img src="/bg1.jpg" alt="" />
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Saepe
              nesciunt eum natus maiores iste in alias recusandae, omnis
            </p>
            <span>1 min ago</span>
          </div>
        </div>
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
        <button className="sendButton">Send</button>
      </div>
    </div>
  );
};

export default Chat;
