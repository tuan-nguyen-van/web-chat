import "./ChatBox.css";

const ChatBox = () => {
  return (
    <div id="chat-box">
      <div id="input-box">
        <div id="message-send-box">
          <input type="text" placeholder="Enter your message" />
          <button>Send</button>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
