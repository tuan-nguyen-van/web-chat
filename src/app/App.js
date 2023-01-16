import { useSelector } from "react-redux";
import ChatBox from "./ChatBox";
import OpenDialog from "./OpenDialog";

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
