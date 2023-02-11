import React from "react";
import { Button, Form, Container } from "semantic-ui-react";
import io from 'socket.io-client';

const socket = io('http://localhost:3010');

const BitHoldemApp = () => {
  const [isConnected, setIsConnected] = React.useState(socket.connected);

  React.useEffect(() => {
    socket.on('connect', () => {
      setIsConnected(true);
    })

    

    return () => {
      socket.off('connect');
    }
  }, []);

  return (
    <div className="BitHoldemApp">
      <Container>
        <div>{isConnected ? 'True' : 'False'}</div>
        <Form>
          <Form.Field>
            <label>Your Name</label>
            <input placeholder="Your Name" />
          </Form.Field>
          <Button type="submit">Create Room</Button>
        </Form>
      </Container>
      <Container>
        <Form>
          <Form.Field>
            <label>Room Number</label>
            <input placeholder="Room Number" />
          </Form.Field>
          <Form.Field>
            <label>Your Name</label>
            <input placeholder="Your Name" />
          </Form.Field>
          <Button type="submit">Enter Room</Button>
        </Form>
      </Container>
    </div>
  );
};

export default BitHoldemApp;
