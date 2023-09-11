import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { UserProvider } from "./context/ContextUser.tsx";
import { AudioProvider } from "./context/ContextPodcastAudio.tsx";
import { PodcastProvider } from "./context/ContextPodcast.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <UserProvider>
    <PodcastProvider>
      <AudioProvider>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </AudioProvider>
    </PodcastProvider>
  </UserProvider>
);
