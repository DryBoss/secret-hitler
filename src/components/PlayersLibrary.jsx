import React, { useState, useEffect } from "react";
import defaultAvatar from "./../assets/player-portrait-default.svg";

// 1. Define the hidden SVG filter outside or inside your component
const VintageFilterDef = () => (
  <svg width="0" height="0" style={{ position: "absolute" }}>
    <filter id="vintage-posterize">
      <feComponentTransfer>
        <feFuncR type="discrete" tableValues="0 0.2 0.4 0.6 0.8 1" />
        <feFuncG type="discrete" tableValues="0 0.2 0.4 0.6 0.8 1" />
        <feFuncB type="discrete" tableValues="0 0.2 0.4 0.6 0.8 1" />
      </feComponentTransfer>
    </filter>
  </svg>
);

export function PlayersLibrary({ onBack }) {
  // --- PERSISTENCE: LOAD STATE ---
  const [players, setPlayers] = useState(() => {
    const savedData = localStorage.getItem("secretHitlerPlayers");
    if (savedData) {
      try {
        return JSON.parse(savedData);
      } catch (error) {
        console.error("Failed to load players from storage:", error);
        return [];
      }
    }
    return [];
  });

  const [currentView, setCurrentView] = useState("LIST");
  const [editingPlayer, setEditingPlayer] = useState(null);
  const [editName, setEditName] = useState("");
  const [editAvatar, setEditAvatar] = useState(null);

  // --- PERSISTENCE: SAVE STATE ---
  useEffect(() => {
    localStorage.setItem("secretHitlerPlayers", JSON.stringify(players));
  }, [players]);

  const cardFilterStyle = {
    filter: "url(#vintage-posterize) sepia(80%) contrast(150%)",
  };

  // --- NAVIGATION & ACTIONS ---
  const openNewPlayer = () => {
    setEditingPlayer({ id: Date.now(), isNew: true });
    setEditName("");
    setEditAvatar(null);
    setCurrentView("EDIT");
  };

  const openEdit = (player) => {
    setEditingPlayer(player);
    setEditName(player.name);
    setEditAvatar(player.avatar || null);
    setCurrentView("EDIT");
  };

  const closeEdit = () => {
    setEditingPlayer(null);
    setCurrentView("LIST");
  };

  const savePlayer = () => {
    if (!editName.trim()) {
      closeEdit();
      return;
    }
    if (editingPlayer.isNew) {
      setPlayers([
        ...players,
        { id: editingPlayer.id, name: editName.trim(), avatar: editAvatar },
      ]);
    } else {
      setPlayers(
        players.map((p) =>
          p.id === editingPlayer.id
            ? { ...p, name: editName.trim(), avatar: editAvatar }
            : p,
        ),
      );
    }
    closeEdit();
  };

  const removePlayer = () => {
    setPlayers(players.filter((p) => p.id !== editingPlayer.id));
    closeEdit();
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // --- VIEW 1: THE LIBRARY LIST ---
  if (currentView === "LIST") {
    return (
      <>
        <VintageFilterDef />
        <div className="h-screen bg-game-bg text-white font-sans flex flex-col selection:bg-game-primary/40">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-4 bg-game-surface border-b-[4px] border-game-surface-border shadow-md z-10">
            <div className="flex items-center">
              <button
                onClick={onBack}
                className="p-2 -ml-2 text-game-primary hover:text-game-primary-hover transition-colors cursor-pointer active:scale-95"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
              </button>
              {/* Added font-special here */}
              <h1 className="text-2xl font-special tracking-wide text-slate-100 ml-4 mt-1">
                Players library
              </h1>
            </div>

            <button
              onClick={openNewPlayer}
              className="p-2 text-game-primary hover:text-game-primary-hover transition-colors active:scale-95"
            >
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </button>
          </div>

          {/* Player List */}
          <div className="flex-1 flex flex-col p-4 gap-3 overflow-y-auto">
            {players.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-white opacity-60 mt-10">
                <p className="font-medium text-lg">No players yet</p>
                <p className="text-sm">Click the + to add someone.</p>
              </div>
            ) : (
              players.map((player) => (
                <div
                  key={player.id}
                  onClick={() => openEdit(player)}
                  className="flex items-center gap-4 p-3 bg-game-surface/50 hover:bg-game-surface rounded-sm border-b-[3px] border-transparent hover:border-game-surface-border cursor-pointer transition-all active:translate-y-[2px]"
                >
                  <div className="w-14 h-14 bg-slate-300 rounded-full flex items-center justify-center border-2 border-slate-400/50 shadow-inner overflow-hidden">
                    <img
                      src={player.avatar || defaultAvatar}
                      alt={player.name}
                      className="w-full h-full object-cover"
                      style={player.avatar ? cardFilterStyle : {}}
                    />
                  </div>
                  {/* Added font-special and increased size for the name list */}
                  <span className="text-2xl font-special text-slate-200 mt-1">
                    {player.name}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </>
    );
  }

  // --- VIEW 2: THE EDIT SCREEN ---
  return (
    <>
      <VintageFilterDef />
      <div className="min-h-screen bg-game-bg text-white font-sans flex flex-col selection:bg-game-primary/40">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-4 bg-game-surface border-b-[4px] border-game-surface-border shadow-md">
          <button
            onClick={closeEdit}
            className="p-2 -ml-2 text-game-primary hover:text-game-primary-hover transition-colors cursor-pointer active:scale-95"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          {/* Added font-special here as well for consistency */}
          <h1 className="text-2xl font-special tracking-wide text-slate-100 mt-1">
            Edit Player
          </h1>
          <button
            onClick={savePlayer}
            className="text-lg font-bold text-game-primary hover:text-game-primary-hover transition-colors px-2 active:scale-95 disabled:opacity-50"
            disabled={!editName.trim()}
          >
            Save
          </button>
        </div>

        <div className="flex flex-col items-center px-6 py-10 w-full max-w-md mx-auto">
          {/* Editable Avatar */}
          <label className="w-40 h-40 bg-slate-300 rounded-full flex items-center justify-center shadow-inner cursor-pointer transition-colors mb-12 overflow-hidden relative group border-4 border-transparent hover:border-game-primary">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />

            <img
              src={editAvatar || defaultAvatar}
              alt="Upload Preview"
              className="w-full h-full object-cover"
              style={editAvatar ? cardFilterStyle : {}}
            />

            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <svg
                className="w-10 h-10 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M4 4h3l2-2h6l2 2h3c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zm8 3c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0 8c-1.65 0-3-1.35-3-3s1.35-3 3-3 3 1.35 3 3-1.35 3-3 3z" />
              </svg>
            </div>
          </label>

          {/* Input Field */}
          <div className="w-full flex flex-col mb-12">
            {/* Added font-special and changed to text-3xl for the input */}
            <input
              type="text"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              maxLength={12}
              placeholder="Player Name"
              autoFocus
              className="w-full bg-transparent text-white text-3xl font-special px-2 py-2 outline-none border-b-2 border-white border-opacity-60 focus:border-game-primary transition-colors placeholder:text-white placeholder:opacity-60 placeholder:font-sans"
            />
            <div className="w-full text-right mt-2 text-sm text-white opacity-60 font-medium">
              {editName.length}/12
            </div>
          </div>

          {/* Remove Button */}
          {!editingPlayer?.isNew && (
            <button
              onClick={removePlayer}
              className="text-game-primary hover:text-game-primary-hover font-medium text-lg tracking-wide transition-colors active:scale-95 px-6 py-2"
            >
              Remove player
            </button>
          )}
        </div>
      </div>
    </>
  );
}
