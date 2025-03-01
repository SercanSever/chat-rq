import "./add-user.css";
import { db } from "../../../../lib/firebase";
import { useUserStore } from "../../../../stores/user-store.jsx";
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  serverTimestamp,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { useState } from "react";

const AddUser = () => {
  const { currentUser } = useUserStore();
  const [user, setUser] = useState(null);
  const handleSearch = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const { username } = Object.fromEntries(formData);

    if (!username) setUser(null);

    try {
      const userRef = collection(db, "users");
      const q = query(userRef, where("username", "==", username));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
          setUser(doc.data());
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddUser = async () => {
    const chatRef = collection(db, "chats");
    const userChatsRef = collection(db, "userChats");
    try {
      const newChatRef = doc(chatRef);
      await setDoc(newChatRef, {
        createdAt: serverTimestamp(),
        messages: [],
      });

      await updateDoc(doc(userChatsRef, user.id), {
        chats: arrayUnion({
          chatId: newChatRef.id,
          lastMessage: "",
          reveiverId: currentUser.id,
          updatedAt: Date.now(),
        }),
      });

      await updateDoc(doc(userChatsRef, currentUser.id), {
        chats: arrayUnion({
          chatId: newChatRef.id,
          lastMessage: "",
          reveiverId: user.id,
          updatedAt: Date.now(),
        }),
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="addUser">
      <form onSubmit={handleSearch}>
        <input type="text" placeholder="Username" name="username" />
        <button>Search</button>
      </form>
      {user && (
        <div className="user">
          <div className="detail">
            <img src={user.avatar || "/chat-rq-logo-background.png"} alt="" />
            <p>{user.username}</p>
          </div>
          {user && <button onClick={handleAddUser}>Add User</button>}
        </div>
      )}
    </div>
  );
};

export default AddUser;
