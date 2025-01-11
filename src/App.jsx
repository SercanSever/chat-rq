import "./App.css";
import Chat from "./components/chat/chat";
import List from "./components/list/list";
import Detail from "./components/detail/detail";
import Login from "./components/login/login";
import Notification from "./components/notification/notification";

function App() {
  const user = false;
  return (
    <div className="container">
      {!user ? (
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
