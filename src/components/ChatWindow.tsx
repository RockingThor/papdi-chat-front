import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Loader } from "./ui/loader";
import { api } from "@/lib/axios";

const ChatWindow = () => {
  const [loading, setLoading] = useState(true);
  const [chatSelected, setChatSelected] = useState(false);

  const location = useLocation();

  async function fetchChats(id: number) {
    try {
      setLoading(true);
      const response = await api.get(`/chat/one-to-one`, {
        params: {
          partnerId: id,
        },
      });
      console.log(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    if (
      searchParams.get("receiver") &&
      Number(searchParams.get("receiver")) ===
        Number(searchParams.get("receiver"))
    ) {
      setChatSelected(true);
    } else {
      setChatSelected(false);
    }
  }, [location.pathname]);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    console.log(searchParams.get("receiver"));
  }, [location.pathname]);

  if (!chatSelected) {
    return (
      <div className="relative top-1/2 left-1/2">
        Please Selct a person to chat
      </div>
    );
  }

  if (loading) {
    return (
      <div className="relative top-1/2 left-1/2">
        <Loader />
      </div>
    );
  }
  return <div>ChatWindow</div>;
};

export default ChatWindow;
