import { useState } from "react";
import { useSelector } from "react-redux";
import { insertMessageToMessageBox } from "./insertMessagesToMessageBox";

const InputBox = () => {
  const userName = useSelector((state) => state.userName.name);
  const [message, setMessage] = useState("");
  const handleSend = () => {
    const messageBox = document.getElementById("message-box");
    if (message.length) {
      const newMessageObj = {
        name: userName,
        value: message,
      };
      const localStorageMessagesString = localStorage.getItem("messages");
      const localStorageMessagesArray = localStorageMessagesString
        ? JSON.parse(localStorageMessagesString)
        : [];
      localStorageMessagesArray.push(newMessageObj);
      localStorage.setItem(
        "messages",
        JSON.stringify(localStorageMessagesArray)
      );
      insertMessageToMessageBox(
        { name: userName, value: message },
        messageBox,
        "append",
        userName
      );
      // scroll to the bottom of the message box.
      messageBox.scrollTo(0, messageBox.scrollHeight);
      setMessage("");
    }
  };

  return (
    <div id="input-box">
      <div id="message-send-box">
        <input
          type="text"
          placeholder="Enter your message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default InputBox;
