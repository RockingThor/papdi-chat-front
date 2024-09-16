import { chatState } from "@/context/ChatProvider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ProfileEdit from "./ProfileEdit";

const Profile = () => {
  const { user } = chatState();
  console.log(user);
  return (
    <div className="flex flex-col items-center mt-4">
      <div className="profile-image">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>User</AvatarFallback>
        </Avatar>
      </div>
      <div className="name mt-2 ">
        <h1>
          Name {" : "}
          {user?.name}
        </h1>
      </div>
      <div className="email mt-2">
        <h1>
          Email {" : "}
          {user?.email}
        </h1>
      </div>
      {/* TODO: Implement Delete Account */}
      {/* <div className="user-since"></div>
          <div className="delete-account"></div> */}
      <ProfileEdit />
    </div>
  );
};

export default Profile;
