import ChatBox from "./ChatBox";
import OpenDialog from "./OpenDialog";
import { useSelector } from "react-redux";

const App = () => {
  const userName = useSelector((state) => state.user.name);
  return (
    <>
      <OpenDialog />
      {userName && <ChatBox />}
    </>
  );
};

export default App;
