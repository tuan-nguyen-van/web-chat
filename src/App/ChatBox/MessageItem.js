const MessageItemForCurUser = ({ message }) => (
  <>
    <div className="message-item">
      <div>{message.value}</div>
    </div>
    <div className="message-avatar">
      <span>You</span>
    </div>
  </>
);

const MessageItemForOtherUser = ({ message }) => (
  <>
    <div className="message-avatar">
      <span>User</span>
    </div>
    <div className="message-item">
      <div>{message.name}</div>
      <div>{message.value}</div>
    </div>
  </>
);

export { MessageItemForCurUser, MessageItemForOtherUser };
