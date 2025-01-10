import { useState } from "react";
import "./login.css";

const Login = () => {
  const [userAvatar, setUserAvatar] = useState({
    file: null,
    url: "",
  });

  const handleUserAvatar = (e) => {
    if (!e.target.files[0]) return;
    const file = e.target.files[0];
    const url = URL.createObjectURL(file);
    setUserAvatar({ file, url });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    var form = new FormData(e.target);
    var { email, password } = Object.fromEntries(form);
    console.log(email, password);
  };

  return (
    <div className="login">
      <div className="item">
        <h2>Welcome</h2>
        <form action="" onSubmit={handleLogin}>
          <input type="text" name="email" placeholder="Email" />
          <input type="password" name="password" placeholder="Password" />
          <button>Login</button>
        </form>
      </div>
      <div className="seperator"></div>
      <div className="item">
        <h2>Create an Account</h2>
        <form action="">
          <label htmlFor="file">
            <img src={userAvatar.url || "/avatar.png"} alt="" />
            <p style={userAvatar.url !== "" ? { display: "none" } : {}}>
              Upload Avatar
            </p>
          </label>
          <input
            type="file"
            id="file"
            style={{ display: "none" }}
            onChange={handleUserAvatar}
          />
          <input type="text" name="username" placeholder="Username" />
          <input type="text" name="email" placeholder="Email" />
          <input type="password" name="password" placeholder="Password" />
          <button>Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
