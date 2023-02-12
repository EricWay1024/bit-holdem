export const RoomEvents = {
    /**
     * Room::Create
     * 
     * Client -> Server:
     * {}
     * 
     * Server -> Client:
     * {
     *   "errno": Number,
     *   "message": String,
     *   "data": {
     *     "id": String,
     *   }
     * }
     */
    "Create": "Room::Create",
    "Join": "Room::Join",
    "Quit": "Room::Quit",
    "Fetch": "Room::Fetch",
    "Update": "Room::Update",
    "Feed": "Room::Feed",
};

export const PlayEvents = {
    "Call": "Play::Call",
    "Fold": "Play::Fold",
    "Raise": "Play::Raise",
    "AllIn": "Play::AllIn",
};

export const AdminEvents = {
    "StartGame": "Admin::StartGame",
    "NextState": "Admin::NextState",
    "SetAdmin": "Admin::SetAdmin",
    "SetAssets": "Admin::SetAssets",
    "RemovePlayer": "Admin::RemovePlayer",
    "SetPlayerOrder": "Admin::SetPlayerOrder",
};

export const RoomStatus = {
    "INIT": "INIT",
    "PREFLOP": "PREFLOP",
    "FLOP": "FLOP",
    "TURN": "TURN",
    "RIVER": "RIVER",
    "SHOWDOWN": "SHOWDOWN",
};

export const RoomPrototype = {
    "id": String,
    "admin": String,
    "status": String,
    "button": String,
    "players": Array, // { "id": String, "name": String, "isInGame": Boolean, "isAllIn": Boolean }
    "queue": Array,
    "pool": Number,
};

// export const UserPrototype = {
//     "id": String,
//     "assets": Number,
// };
