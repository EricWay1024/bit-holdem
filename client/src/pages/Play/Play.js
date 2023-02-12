import React, { useEffect } from "react";
import { Button, Container, Feed, Grid, Header, Input, Segment } from "semantic-ui-react";
import { socket } from "../../BitHoldem";

const Play = () => {
  const [ feed, setFeed ] = React.useState([]);
  const [ assets, setAssets ] = React.useState(0.0);
  const [ roomInfo, setRoomInfo ] = React.useState({});

  socket.on("Room::Update", (room) => {
    setRoomInfo(room);
  });

  socket.on("Room::Event", (msg) => {
    setFeed([...feed, msg]);
  });

  useEffect(() => {
    return async () => {
      const response = await socket.timeout(1000).emitWithAck("Room::Fetch", {});
      setRoomInfo(response.data);
    };
  }, []);

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
            <b>Pool:</b> {0}
            <br/>
            <b>Calling:</b> {0}
            <br/>
            {/* u: allin, i: dealer, b: current, s: fold */}
            <b>Players:</b> <u>{"Alex"}</u>, <i>{"Bob"}</i>, <b>{"Cindy"}</b>, Dong, <s>Emily</s>
          </Container>
          <br />
          <Container>
            <b>Min:</b> {0}, <b>Max:</b> {0}
            <br/>
            <Input label={`/ ${assets}`} labelPosition="right"></Input>
          </Container>
          <br />
          <Container>
            <Button disabled>Fold</Button>
            <Button disabled>Call</Button>
            <Button disabled>Raise</Button>
            <Button disabled>All In</Button>
          </Container>
        </Segment>
      </Grid.Column>
    </Grid>
  );
};

export default Play;
