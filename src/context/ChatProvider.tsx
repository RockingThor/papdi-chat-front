import { createContext, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const ChatContext = createContext({});

export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState();
  const history = useHistory();

  useEffect(() => {
    let logedUser = JSON.parse(localStorage.getItem("user") || "{}");
    if (!logedUser) {
      history.push("/");
    }
    setUser(logedUser);
  }, [history]);

  return (
    <ChatContext.Provider value={{ user, setUser }}>
      {children}
    </ChatContext.Provider>
  );
};

export const chatState = () => {
  return useContext(ChatContext);
};
