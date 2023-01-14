import "./ChatBox.css";
import InputBox from "./InputBox";
import MessageBox from "./MessageBox";

const ChatBox = () => {
  return (
    <div id="chat-box">
      <MessageBox />
      <InputBox />
    </div>
  );
};

export default ChatBox;
