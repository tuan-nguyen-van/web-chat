import { useState } from "react";
import { useSelector } from "react-redux";
import { insertMessageToMessageBox } from "./insertMessagesToMessageBox";

const InputBox = () => {
  const userName = useSelector((state) => state.user.name);
  const [message, setMessage] = useState("");
  const messagesString = process.env.REACT_APP_LOCAL_STORAGE_MESSAGES;

  const handleSend = () => {
    const messageBox = document.getElementById(
      process.env.REACT_APP_MESSAGE_BOX_ID
    );
    if (message.length) {
      const newMessageObj = {
        name: userName,
        value: message,
      };
      const localStorageMessagesString = localStorage.getItem(messagesString);
      const localStorageMessagesArray = localStorageMessagesString
        ? JSON.parse(localStorageMessagesString)
        : [];
      localStorageMessagesArray.push(newMessageObj);
      localStorage.setItem(
        messagesString,
        JSON.stringify(localStorageMessagesArray)
      );

      // Set the lastMessageSavedAt key inside local storage to detect new messages
      // based on the lastMessageSavedAt timestamp.
      localStorage.setItem(
        process.env.REACT_APP_LAST_MESSAGE_SAVED_AT,
        Date.now()
      );

      insertMessageToMessageBox(newMessageObj, messageBox, "append", userName);
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
          id="message-input"
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default InputBox;
