import { Route } from "react-router-dom";
import Home from "./Pages/Home";
import Chat from "./Pages/Chat";

function App() {
  return (
    <div className="app">
      <Route path={"/"} component={Home} exact />
      <Route path={"/chat"} component={Chat} />
    </div>
  );
}

export default App;
