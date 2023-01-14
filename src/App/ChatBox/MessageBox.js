import { useEffect } from "react";
import { useSelector } from "react-redux";
import insertMessagesToMessageBox from "./insertMessagesToMessageBox";

// I chose to load the each message by vanilla javascript appendChild or prepend method for
// each message instead of letting react manage the state 'messages' because if we
// load huge amount of messages (25 each time) then react re-render and recalculate
// every messages again.
// Let javascript prepend method for this problem is much much better and simpler
// than with react.
const MessageBox = () => {
  const userName = useSelector((state) => state.userName.name);
  const savedMessages = JSON.parse(localStorage.getItem("messages"));
  const limit = 25;

  // Show the first limit amount of messages when the dom finished loading.
  useEffect(() => {
    const messageBox = document.getElementById("message-box");
    const showMessages = savedMessages
      ? savedMessages.splice(Math.max(0, savedMessages.length - limit))
      : [];
    insertMessagesToMessageBox(showMessages, "append", userName, messageBox);
    // Scroll to the bottom at the end of the loop
    messageBox.scrollTo(0, messageBox.scrollHeight);
  }, []);

  // When the user scroll to the top load 'limit' more messages.
  // And prepend new messages to messageBox.
  useEffect(() => {
    const messageBox = document.getElementById("message-box");
    messageBox.onscroll = () => {
      if (messageBox.scrollTop === 0 && savedMessages.length) {
        const messageBoxPreHeight = messageBox.scrollHeight;
        const prependMessages = savedMessages.splice(
          Math.max(0, savedMessages.length - limit)
        );
        insertMessagesToMessageBox(
          prependMessages,
          "prepend",
          userName,
          messageBox
        );
        // Scroll back down to the previous height for user to still seeing the current
        // message instead of seeing the latest new loaded message.
        messageBox.scrollTo(0, messageBox.scrollHeight - messageBoxPreHeight);
      }
    };
  }, []);

  return <div id="message-box"></div>;
};

export default MessageBox;
