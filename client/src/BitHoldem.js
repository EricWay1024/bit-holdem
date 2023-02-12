import React from "react";
import io from 'socket.io-client';
import { ClientState } from "./consts";

import Admin from "./pages/Admin/Admin";
import Lobby from "./pages/Lobby/Lobby";
import Play from "./pages/Play/Play";

export const socket = io();

export const BitHoldem = () => {
  const [state, setState] = React.useState(ClientState.LOBBY);

  return (
    <React.Fragment>
        {state === ClientState.LOBBY && <Lobby setState={setState} />}
        {state === ClientState.PLAY && <Play />}
        {state === ClientState.ADMIN && <Admin />}
    </React.Fragment>
  );
};
