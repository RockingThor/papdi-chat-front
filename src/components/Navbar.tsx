import { BellIcon } from "lucide-react";
import { Input } from "./ui/input";
import "../styles/navbar.css";
import { useEffect, useState } from "react";
import SearchPerson from "./SearchPerson";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Profile from "./Profile";

const Navbar = () => {
  const [input, setInput] = useState("");
  const [closed, setClosed] = useState(true);

  useEffect(() => {
    if (input.length > 0) {
      setClosed(false);
    } else {
      setClosed(true);
    }
  }, [input]);
  return (
    <nav>
      <div className="header-container">
        <div className="search-bar">
          <Input
            placeholder="Search for a person"
            onChange={(e) => setInput(e.target.value)}
            value={input}
          />
        </div>
        <div className="title">
          <h2>Papdi Chat</h2>
        </div>
        <div className="notification-profile">
          <div className="notification">
            <BellIcon />
          </div>
          <div className="">
            <Sheet>
              <SheetTrigger>
                <div className="profile"></div>
              </SheetTrigger>
              <SheetContent className="w-[400px] sm:w-[540px]">
                <SheetHeader>
                  <SheetTitle>Profile</SheetTitle>
                  <SheetDescription>
                    Here is your profile details. Please edit them if you think
                    something is wrong
                  </SheetDescription>
                </SheetHeader>
                <Profile />
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
      {!closed && (
        <div className="absolute">
          <SearchPerson searchQuery={input} setSearchQuery={setInput} />
        </div>
      )}
    </nav>
  );
};

export default Navbar;
