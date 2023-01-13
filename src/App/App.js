import ChatBox from "./ChatBox";
import OpenDialog from "./OpenDialog";
import { useSelector } from "react-redux";

const App = () => {
  const userName = useSelector((state) => state.userName.name);
  return (
    <>
      <OpenDialog />
      {userName && <ChatBox />}
    </>
  );
};

export default App;
