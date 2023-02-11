import React from "react";
import { Button, Form, Container } from "semantic-ui-react";
import { GameSocket } from "../../BitHoldem";

const Lobby = (setState) => {
  const socket = React.useContext(GameSocket);
  const [isConnected, setIsConnected] = React.useState(socket.connected);

  React.useEffect(() => {
    socket.on('connect', () => {
      setIsConnected(true);
    })

    return () => {
      socket.off('connect');
    }
  });

  const onCreateRoom = async () => {
    try {
      const response = await socket.timeout(1000).emitWithAck("Room::Create", {});
      console.debug(response);
      if (response.errno === 0) {
        // switch to room
      } else {
        // show error message
      }
    } catch (error) {
      // handle error
      console.log(error);
    }
  };

  const onJoinRoom = async () => {
    try {
      const response = await socket.timeout(1000).emitWithAck("Room::Join", {
        "id": "",
      });
      if (response.errno === 0) {
        // switch to room
      } else {
        // show error message
      }
    } catch (error) {
      // handle error
      console.log(error);
    }
  };

  return (
    <div className="BitHoldemApp">
      <Container>
        <div>{isConnected ? 'True' : 'False'}</div>
        <Form onSubmit={onCreateRoom}>
          <Form.Field>
            <label>Your Name</label>
            <input placeholder="Your Name" />
          </Form.Field>
          <Button type="submit">Create Room</Button>
        </Form>
      </Container>
      <Container>
        <Form onSubmit={onJoinRoom}>
          <Form.Field>
            <label>Room Number</label>
            <input placeholder="Room Number" />
          </Form.Field>
          <Form.Field>
            <label>Your Name</label>
            <input placeholder="Your Name" />
          </Form.Field>
          <Button type="submit">Join Room</Button>
        </Form>
      </Container>
    </div>
  );
};

export default Lobby;
