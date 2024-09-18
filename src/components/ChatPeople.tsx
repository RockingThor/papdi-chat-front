import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { api } from "@/lib/axios";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface People {
  id: number;
  name: string;
  imageUrl?: string;
  sentAt: string;
  message: string;
}

const ChatPeople = () => {
  const [people, setPeople] = useState<People[]>([]);
  useEffect(() => {
    async function getPeople() {
      try {
        const response = await api.get("/chat/chats");
        setPeople(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    getPeople();
  }, []);
  return (
    <ScrollArea className="w-full h-full">
      <div className="m-1 border rounded">
        {people.map((p) => (
          <div key={p.id} className="cursor-pointer">
            <PeopleCard people={p} />
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};

const PeopleCard = ({ people }: { people: People }) => {
  return (
    <div className="flex">
      <Avatar>
        <AvatarImage src={people.imageUrl} />
        <AvatarFallback>User</AvatarFallback>
      </Avatar>
      <div>{people.name}</div>
      <div className="flex flex-col">
        <div>{people.message}</div>
        <div>{people.sentAt}</div>
      </div>
    </div>
  );
};

export default ChatPeople;
