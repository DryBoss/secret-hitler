// src/App.jsx
import React, { useState } from "react";
import { MainMenu } from "./components/MainMenu";
import { PlayersLibrary } from "./components/PlayersLibrary";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState("MAIN_MENU");

  const handleNewGame = () => {
    setCurrentScreen("SETUP_PLAYERS");
  };

  const handleOpenLibrary = () => {
    setCurrentScreen("LIBRARY");
  };

  return (
    <div className="w-full min-h-screen bg-game-bg selection:bg-game-primary/40">
      {currentScreen === "MAIN_MENU" && (
        <MainMenu onNewGame={handleNewGame} onOpenLibrary={handleOpenLibrary} />
      )}

      {currentScreen === "LIBRARY" && (
        <PlayersLibrary onBack={() => setCurrentScreen("MAIN_MENU")} />
      )}

      {currentScreen === "SETUP_PLAYERS" && (
        <div className="p-6 text-white font-sans">
          <h1 className="text-2xl font-bold text-slate-100 mb-4">
            Configuration Screen
          </h1>
          <button
            onClick={() => setCurrentScreen("MAIN_MENU")}
            className="text-game-primary hover:text-game-primary-hover font-bold transition-colors"
          >
            ← Return to Main Menu
          </button>
        </div>
      )}
    </div>
  );
}
