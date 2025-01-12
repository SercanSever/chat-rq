import { useState } from "react";
import "./login.css";
import { toast } from "react-toastify";
import { uploadCloudinary } from "../../lib/upload-cloudinary";
import { auth, db } from "../../lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

const Login = () => {
  const [userAvatar, setUserAvatar] = useState({
    file: null,
    url: "",
  });

  const handleUserAvatar = async (e) => {
    if (!e.target.files[0]) return;
    const file = e.target.files[0];
    setUserAvatar({ file, url: URL.createObjectURL(file) });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    var form = new FormData(e.target);
    var { email, password } = Object.fromEntries(form);
    console.log(email, password);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    var form = new FormData(e.target);
    var { username, email, password } = Object.fromEntries(form);

    try {
      const userAuthCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const cloudinaryResponse = await uploadCloudinary({
        file: userAvatar.file,
        userId: userAuthCredentials.user.uid,
      });

      await setDoc(doc(db, "users", userAuthCredentials.user.uid), {
        id: userAuthCredentials.user.uid,
        username,
        email,
        avatar: cloudinaryResponse,
        blocked: [],
      });

      await setDoc(doc(db, "userChats", userAuthCredentials.user.uid), {
        chats: [],
      });

      toast.success("User Created Successfully");
    } catch (error) {
      console.error(error);
      if (error.code === "auth/email-already-in-use")
        toast.error("Email Already In Use");
      if (error.code === "auth/weak-password") toast.error("Weak Password");
      if (error.code === "auth/invalid-email") toast.error("Invalid Email");
      if (error.code === "auth/operation-not-allowed")
        toast.error("Operation Not Allowed");
    }
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
        <form onSubmit={handleSignup}>
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
