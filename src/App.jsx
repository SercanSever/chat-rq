import "./App.css";
import Chat from "./components/chat/chat";
import List from "./components/list/list";
import Detail from "./components/detail/detail";
import Login from "./components/login/login";
import Notification from "./components/notification/notification";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./lib/firebase";
import { useUserStore } from "./stores/user-store.jsx";

function App() {
  const { currentUser, isLoading, fetchUserInfo } = useUserStore();
  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchUserInfo(user.uid);
      } else {
        fetchUserInfo(null);
      }

      return () => {
        unSub();
      };
    });
  }, [fetchUserInfo]);

  if (isLoading) return <div className="loading">Loading...</div>;
  return (
    <div className="container">
      {!currentUser ? (
        <Login />
      ) : (
        <>
          <List />
          <Chat />
          <Detail />
        </>
      )}
      <Notification />
    </div>
  );
}

export default App;
