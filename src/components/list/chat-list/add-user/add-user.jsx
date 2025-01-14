import "./add-user.css";
import { db } from "../../../../lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useState } from "react";

const AddUser = () => {
  const [user, setUser] = useState(null);
  const handleSearch = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const { username } = Object.fromEntries(formData);

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

  const handleAddUser = () => {};

  return (
    <div className="addUser">
      <form onSubmit={handleSearch}>
        <input type="text" placeholder="Username" name="username" />
        <button>Search</button>
      </form>
      <div className="user">
        {user && (
          <div className="detail">
            <img src={user.avatar || "/avatar.png"} alt="" />
            <p>{user.username}</p>
          </div>
        )}
        {user && <button onClick={handleAddUser}>Add User</button>}
      </div>
    </div>
  );
};

export default AddUser;
