import React from "react";
import io from 'socket.io-client';

import Lobby from "./pages/Lobby/Lobby";

const socket = io();

export const GameSocket = React.createContext(null);

export const BitHoldem = () => {
  const [state, setState] = React.useState("LOBBY");

  return (
    <GameSocket.Provider value={socket}>
        {state === "LOBBY" && <Lobby setState={setState} />}
    </GameSocket.Provider>
  );
};
