import ChatPeople from "@/components/ChatPeople";
import ChatWindow from "@/components/ChatWindow";
import Navbar from "@/components/Navbar";
import { Loader } from "@/components/ui/loader";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { validateToken } from "@/lib/validateToken";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const Chat = () => {
  const [validationStatus, setValidationStatus] = useState(false);
  const history = useHistory();
  useEffect(() => {
    validateToken().then((result) => {
      if (result) {
        setValidationStatus(true);
      } else {
        history.push("/");
      }
    });
  }, []);

  if (!validationStatus) {
    return (
      <div className="flex justify-center mt-10">
        <Loader />
      </div>
    );
  }
  return (
    <div>
      <Navbar />
      <div className="resizable-area">
        <ResizablePanelGroup
          direction="horizontal"
          className="min-h-[92vh] max-w-[100vw] rounded-lg border mt-2"
        >
          <ResizablePanel defaultSize={25}>
            <ChatPeople />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={75}>
            <ChatWindow />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
};

export default Chat;
