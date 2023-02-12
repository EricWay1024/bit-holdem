import React from "react";
import { Button, Container, Feed, Grid, Header, Segment } from "semantic-ui-react";
import { socket } from "../../BitHoldem";

const Admin = ({ room }) => {
  const [ feed, setFeed ] = React.useState([]);

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
            Status: Initial
          </Container>
          <br />
          <Container>
            <Button disabled>Start</Button>
          </Container>
        </Segment>
      </Grid.Column>
    </Grid>
  );
};

export default Admin;
