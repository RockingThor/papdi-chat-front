import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "@/styles/globals.css";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "./components/ui/toaster.tsx";
import { ChatProvider } from "./context/ChatProvider.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <ChatProvider>
    <BrowserRouter>
      <App />
      <Toaster />
    </BrowserRouter>
  </ChatProvider>
);
