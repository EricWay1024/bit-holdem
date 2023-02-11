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
    "Update": "Room::Update"
};

export const PlayEvents = {
    "Call": "Play::Call",
    "Fold": "Play::Fold",
    "Raise": "Play::Raise",
    "AllIn": "Play::AllIn",
};

export const AdminEvents = {
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
    "players": Array,
    "queue": Array,
};

export const UserPrototype = {
    "id": String,
    "assets": Number,
};
