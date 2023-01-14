import ReactDOMServer from "react-dom/server";
import { MessageItemForCurUser, MessageItemForOtherUser } from "./MessageItem";

const insertMessagesToMessageBox = (
  messages,
  appendOrPrepend,
  userName,
  messageBox
) => {
  if (appendOrPrepend === "append") {
    for (let i = 0; i < messages.length; i++) {
      insertMessageToMessageBox(messages[i], messageBox, "append", userName);
    }
  } else {
    for (let i = messages.length - 1; i >= 0; i--) {
      insertMessageToMessageBox(messages[i], messageBox, "prepend", userName);
    }
  }
};

const insertMessageToMessageBox = (
  message,
  messageBox,
  appendOrPrepend,
  userName
) => {
  const messageDiv = document.createElement("div");
  messageDiv.style.float = message.name === userName ? "right" : "left";
  messageDiv.className = "message-outer-div";
  messageDiv.innerHTML = ReactDOMServer.renderToStaticMarkup(
    message.name === userName ? (
      <MessageItemForCurUser message={message} />
    ) : (
      <MessageItemForOtherUser message={message} />
    )
  ).toString();
  appendOrPrepend === "append"
    ? messageBox.appendChild(messageDiv)
    : messageBox.prepend(messageDiv);
};

export default insertMessagesToMessageBox;

export { insertMessageToMessageBox };
