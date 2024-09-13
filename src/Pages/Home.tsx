import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import "../styles/home.css";
import Login from "@/components/Login";
import Signup from "@/components/Signup";
const Home = () => {
  return (
    <div className="home__container">
      <Tabs defaultValue="login" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="signup">Signup</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <Login />
        </TabsContent>
        <TabsContent value="signup">
          <Signup />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Home;
