import { auth } from "../../lib/firebase";

import "./detail.css";
const Detail = () => {
  return (
    <div className="detail">
      <div className="user">
        <img src="/avatar.png" alt="" />
        <h2>Jane Doe</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing </p>
      </div>
      <div className="info">
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
        <button className="block">Block</button>
      </div>
    </div>
  );
};

export default Detail;
