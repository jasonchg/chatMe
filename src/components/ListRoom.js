import React from "react";
import ImageIcon from "@material-ui/icons/Image";
import {
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
} from "@material-ui/core";
const ListRoom = ({ room }) => {
  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar>
          <ImageIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary={room.roomName} secondary={room.roomDesc} />
    </ListItem>
  );
};

export default ListRoom;
