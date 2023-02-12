import React from "react";
import { Button, Container, Feed, Grid, Header, Input, Segment } from "semantic-ui-react";
import { socket } from "../../BitHoldem";

const Play = ({ room }) => {
  const [ feed, setFeed ] = React.useState([]);
  const [ assets, setAssets ] = React.useState(0.0);

  socket.on("Room::Event", (msg) => {
    setFeed([...feed, msg]);
  });

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
          <Container>
            Status: Pre-flop
          </Container>
          <br />
          <Container>
            <Input label={`Max: ${assets}`} labelPosition="right"></Input>
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
