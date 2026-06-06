// src/App.jsx
import React, { useState } from "react";
import { MainMenu } from "./components/MainMenu";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState("MAIN_MENU");

  const handleNewGame = () => {
    // This transitions you directly into your client-side character set up screen!
    setCurrentScreen("SETUP_PLAYERS");
  };

  return (
    <div className="w-full min-h-screen bg-slate-950">
      {currentScreen === "MAIN_MENU" && (
        <MainMenu
          onNewGame={handleNewGame}
          onOpenSettings={() => console.log("Open Settings Modal")}
        />
      )}

      {currentScreen === "SETUP_PLAYERS" && (
        <div className="p-6 text-white font-mono">
          <h1 className="text-2xl">Configuration Screen</h1>
          <button
            onClick={() => setCurrentScreen("MAIN_MENU")}
            className="mt-4 text-red-400"
          >
            ← Return to Main Office
          </button>
        </div>
      )}
    </div>
  );
}
