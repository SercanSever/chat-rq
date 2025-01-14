import { useState } from "react";
import "./login.css";
import { toast } from "react-toastify";
import { uploadCloudinary } from "../../lib/upload-cloudinary";
import { auth, db } from "../../lib/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";

const Login = () => {
  const [userAvatar, setUserAvatar] = useState({
    file: null,
    url: "",
  });
  const [loading, setloading] = useState(false);

  const handleUserAvatar = async (e) => {
    if (!e.target.files[0]) return;
    const file = e.target.files[0];
    setUserAvatar({ file, url: URL.createObjectURL(file) });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setloading(true);
    var form = new FormData(e.target);
    var { email, password } = Object.fromEntries(form);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error(error);
      toast.error("Invalid Credentials");
    } finally {
      toast.success("User Logged In Successfully");
      setloading(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setloading(true);
    var form = new FormData(e.target);
    var { username, email, password } = Object.fromEntries(form);

    try {
      const usernameQuery = await getDocs(
        query(collection(db, "users"), where("username", "==", username))
      );

      if (!usernameQuery.empty) {
        toast.error("Username Already In Use");
        setloading(false);
        return;
      }

      const userAuthCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const cloudinaryUrl = await uploadCloudinary({
        file: userAvatar.file,
        userId: userAuthCredentials.user.uid,
      });

      await setDoc(doc(db, "users", userAuthCredentials.user.uid), {
        id: userAuthCredentials.user.uid,
        username,
        email,
        avatar: cloudinaryUrl || "",
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
    } finally {
      setloading(false);
    }
  };

  return (
    <div className="login">
      <div className="item">
        <h2>Welcome</h2>
        <form action="" onSubmit={handleLogin}>
          <input type="text" name="email" placeholder="Email" />
          <input type="password" name="password" placeholder="Password" />
          <button disabled={loading}>{loading ? "Loading..." : "Login"}</button>
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
          <button disabled={loading}>
            {loading ? "Loading..." : "Signup"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
