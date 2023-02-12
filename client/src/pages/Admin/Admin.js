import React, { useEffect } from "react";
import { Button, Container, Feed, Grid, Header, Segment } from "semantic-ui-react";
import { socket } from "../../BitHoldem";

const Admin = () => {
  const [ feed, setFeed ] = React.useState([]);
  const [ roomInfo, setRoomInfo ] = React.useState({});

  socket.on("Room::Update", (room) => {
    setRoomInfo(room);
  });

  socket.on("Room::Feed", (msg) => {
    setFeed([...feed, msg]);
  });

  useEffect(() => {
    return async () => {
      const response = await socket.timeout(1000).emitWithAck("Room::Fetch", {});
      setRoomInfo(response.data);
    };
  }, []);

  const onClickStart = async () => {
    const response = await socket.timeout(1000).emitWithAck("Admin::StartGame", {});
    setRoomInfo(response.data);
  };

  const onClickNext = async () => {
    const response = await socket.timeout(1000).emitWithAck("Admin::NextState", {});
    setRoomInfo(response.data);
  };

  return (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: "450px" }}>
        <Header as="h2" textAlign="center">Events</Header>
        <Segment style={{ height: "12rem", overflowY: "scroll" }}>
          <Feed>
            {feed.map(item => (
              <Feed.Event>
                <Feed.Content>
                  <Feed.Summary>
                    { item }
                  </Feed.Summary>
                </Feed.Content>
              </Feed.Event>
            ))}
          </Feed>
        </Segment>
        <Header as="h2" textAlign="center">Console</Header>
        <Segment>
          <Container textAlign="left">
            <b>Room:</b> {roomInfo.id}
            <br/>
            <b>Status:</b> {roomInfo.status}
            <br/>
            <b>Pool:</b> {120}
            <br/>
            <b>Calling:</b> {20}
            <br/>
            {/* u: allin, b: current, s: fold */}
            {/* <b>Players:</b> <u>{"Alex"}</u>, <i>{"Bob"}</i>, <b>{"Cindy"}</b>, Dong, <s>Emily</s> */}
          </Container>
          <br />
          <Container>
            <Button disabled={ !roomInfo || roomInfo.status !== "INIT" } onClick={onClickStart}>Start</Button>
            <Button disabled={ !roomInfo || roomInfo.status === "INIT" } onClick={onClickNext}>Next</Button>
          </Container>
        </Segment>
      </Grid.Column>
    </Grid>
  );
};

export default Admin;
