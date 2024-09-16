import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import "../styles/home.css";
import Login from "@/components/Login";
import Signup from "@/components/Signup";
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { validateToken } from "@/lib/validateToken";
import { Loader } from "@/components/ui/loader";
const Home = () => {
  const [validationStatus, setValidationStatus] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const logedUser = JSON.parse(localStorage.getItem("user") || "{}");
    if (logedUser) {
      validateToken().then((result) => {
        console.log("result", result);
        if (result) {
          setValidationStatus(true);
          history.push("/chat");
        } else {
          setValidationStatus(true);
        }
      });
    }
  }, [history]);

  if (!validationStatus) {
    return (
      <div className="flex justify-center mt-10">
        <Loader />
      </div>
    );
  }

  return (
    <div className="home__container">
      <Tabs defaultValue="login" className="w-[400px] mt-40">
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
