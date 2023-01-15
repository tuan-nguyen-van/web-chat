const MessageItemForCurUser = ({ message }) => (
  <>
    <div className="message-item message-item-right">
      <div>{message.value}</div>
    </div>
    <div className="triangle-right"></div>
    <div
      className="message-avatar"
      style={{ marginRight: "7px", backgroundColor: "#e6e6e6" }}
    >
      <span>You</span>
    </div>
  </>
);

const MessageItemForOtherUser = ({ message }) => (
  <>
    <div
      className="message-avatar"
      style={{ marginLeft: "7px", backgroundColor: "#805ceb" }}
    >
      <span>User</span>
    </div>
    <div className="triangle-left"></div>
    <div className="message-item message-item-left">
      <div>{message.name}:</div>
      <div>{message.value}</div>
    </div>
  </>
);

export { MessageItemForCurUser, MessageItemForOtherUser };
