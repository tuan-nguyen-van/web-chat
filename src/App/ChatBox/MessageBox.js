import { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import insertMessagesToMessageBox, {
  insertMessageToMessageBox,
} from "./insertMessagesToMessageBox";

// I chose to load the each message by vanilla javascript appendChild or prepend method for
// each message instead of letting react manages the state 'messages' because if we
// load huge amount of messages (25 each time) then react re-render and recalculate
// every messages again.
// Let javascript prepend method for this problem is much much better and simpler
// than with react.
const MessageBox = () => {
  const userName = useSelector((state) => state.user.name);
  const messagesString = process.env.REACT_APP_LOCAL_STORAGE_MESSAGES;
  // Expensive calculation, useMemo here just in case this component re-render
  // So all useEffect(), JSON.parse() will not be re-runned again.
  const savedMessages = useMemo(
    () => JSON.parse(localStorage.getItem(messagesString)),
    [messagesString]
  );
  const limit = process.env.REACT_APP_SHOWED_MESSAGES_LIMIT;
  const messageBoxId = process.env.REACT_APP_MESSAGE_BOX_ID;
  const lastMessageSavedAtString = process.env.REACT_APP_LAST_MESSAGE_SAVED_AT;

  useEffect(() => {
    // Show the latest 25 messages when the dom finished loading.
    const messageBox = document.getElementById(messageBoxId);
    const showMessages = savedMessages
      ? savedMessages.splice(Math.max(0, savedMessages.length - limit))
      : [];
    insertMessagesToMessageBox(showMessages, "append", userName, messageBox);
    // Scroll to the bottom at the end of the loop
    messageBox.scrollTo(0, messageBox.scrollHeight);

    // When the user scroll to the top load older messages.
    // And prepend new messages to messageBox.
    messageBox.onscroll = () => {
      if (messageBox.scrollTop === 0 && savedMessages.length) {
        const messageBoxPreHeight = messageBox.scrollHeight;
        const prependToTopOlderMessages = savedMessages.splice(
          Math.max(0, savedMessages.length - limit)
        );
        insertMessagesToMessageBox(
          prependToTopOlderMessages,
          "prepend",
          userName,
          messageBox
        );
        // Scroll back down to the previous height for user to still seeing the current
        // message instead of seeing the latest new loaded message on top of messageBox.
        messageBox.scrollTo(0, messageBox.scrollHeight - messageBoxPreHeight);
      }
    };
  }, [savedMessages, userName, limit, messageBoxId]);

  // Frequently check the localStorage 'lastMessageSavedAt' to detect if new
  // message just saved there to update the MessageBox without using socket.
  useEffect(() => {
    const messageBox = document.getElementById(messageBoxId);
    let lastMessageSavedAt =
      localStorage.getItem(lastMessageSavedAtString) ?? Date.now();
    setInterval(() => {
      const latestSavedAt = localStorage.getItem(lastMessageSavedAtString);
      if (+latestSavedAt > +lastMessageSavedAt) {
        const allSavedMessages = JSON.parse(
          localStorage.getItem(messagesString)
        );
        // I assume here only have 1 new message. In reality have several.
        const newMessage = allSavedMessages[allSavedMessages.length - 1];
        // If the newMessage.name not equal the current userName then update the messageBox
        // bebauce the messageBox already has function to insert current user's new message.
        if (newMessage.name !== userName) {
          insertMessageToMessageBox(newMessage, messageBox, "append", userName);
        }
        // Scroll to the bottom of the messageBox.
        messageBox.scrollTo(0, messageBox.scrollHeight);
        lastMessageSavedAt = latestSavedAt;
      }
    }, 100);
  }, [lastMessageSavedAtString, userName, messageBoxId, messagesString]);

  return <div id={messageBoxId}></div>;
};

export default MessageBox;
