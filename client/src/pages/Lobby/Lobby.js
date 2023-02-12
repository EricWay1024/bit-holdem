import React from "react";
import { Button, Form, Grid, Segment, Header, Message, Divider } from "semantic-ui-react";
import { ClientState } from "../../consts";
import { socket } from "../../BitHoldem";

const Lobby = ({ setState }) => {
  const [errorCreateRoom, setErrorCreateRoom] = React.useState(null);
  const [errorJoinRoom, setErrorJoinRoom] = React.useState(null);
  const [room, setRoom] = React.useState(null);
  const [name, setName] = React.useState(null);

  const onCreateRoom = async () => {
    try {
      const response = await socket.timeout(1000).emitWithAck("Room::Create", {});
      console.debug(response);
      if (response.errno === 0) {
        setState(ClientState.ADMIN);
      } else {
        setErrorCreateRoom(response.message.toString());
      }
    } catch (error) {
      setErrorCreateRoom(error.toString());
    }
  };

  const onJoinRoom = async () => {
    try {
      const response = await socket.timeout(1000).emitWithAck("Room::Join", {
        "id": room,
        "name": name,
      });
      if (response.errno === 0) {
        setState(ClientState.PLAY);
      } else {
        setErrorJoinRoom(response.message.toString());
      }
    } catch (error) {
      setErrorJoinRoom(error.toString());
    }
  };

  return (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Form size="large" error={ errorCreateRoom !== null } onSubmit={ onCreateRoom }>
          <Segment>
            <Header as="h2" textAlign="center">Create a room</Header>
            <Button fluid color="teal" size="large" type="submit">Create</Button>
            <Message error header="Error" content={ errorCreateRoom }></Message>
          </Segment>
        </Form>
        <Divider horizontal>Or</Divider>
        <Form size="large" error={ errorJoinRoom !== null } onSubmit={ onJoinRoom }>
          <Segment>
            <Header as="h2" textAlign="center">Join a room</Header>
            <Form.Input fluid placeholder="Room" onChange={(e, { value }) => { setRoom(value) }}></Form.Input>
            <Form.Input fluid placeholder="Name" onChange={(e, { value }) => { setName(value) }}></Form.Input>
            <Button fluid color="teal" size="large" type="submit">Join</Button>
            <Message error header="Error" content={ errorJoinRoom }></Message>
          </Segment>
        </Form>
      </Grid.Column>
    </Grid>
  );
};

export default Lobby;
