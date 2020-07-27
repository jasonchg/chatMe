import React, { useState, useEffect } from "react";
import NavBar from "./components/NavBar";
import { List, ListItem } from "@material-ui/core";

import db from "./firebase";
import ListRoom from "./components/ListRoom";
const Lobby = () => {
  const [rooms, setRooms] = useState([]);
  const ListLink = (props) => {
    return <ListItem button component="a" {...props} />;
  };

  // get data from firebase database
  useEffect(() => {
    // get the specific collection from database
    db.collection("rooms").onSnapshot((snapshot) => {
      // snapshot == documents
      setRooms(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          room: doc.data(),
        }))
      );
    });
  }, []);

  return (
    <>
      <NavBar title={"Lobby"} position="static" createRoom />

      <List>
        {rooms.map(({ id, room }) => (
          <ListLink href={`/chatroom/${id}`} key={id}>
            <ListRoom room={room} />
          </ListLink>
        ))}
      </List>
    </>
  );
};

export default Lobby;
