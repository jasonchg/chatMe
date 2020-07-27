import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Dialog,
  DialogContent,
  Button,
  DialogActions,
  TextField,
} from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
import { useHistory, Redirect } from "react-router-dom";
import db from "../firebase";
import firebase from "firebase";

const NavBar = ({ title, goBack, position, createRoom }) => {
  let history = useHistory();

  const [open, setOpen] = useState(false);

  const [roomName, setRoomName] = useState("");
  const [roomDesc, setRoomDesc] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = (e) => {
    e.preventDefault();
    var roomId = roomName;

    roomId = roomId.replace(/\s+/g, "-").toLowerCase();

    if (roomName !== "" && roomDesc !== "") {
      db.collection("rooms").doc(roomId).set({
        roomName: roomName,
        roomDesc: roomDesc,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });

      setRoomName("");
      setRoomDesc("");
    }

    setOpen(false);
  };

  return (
    <>
      <AppBar position={position}>
        <Toolbar>
          {goBack && (
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => history.push("/")}
            >
              <ArrowBackIosIcon />
            </IconButton>
          )}

          <Typography variant="h6">{title}</Typography>
          {createRoom && (
            <IconButton edge="end" color="inherit" onClick={handleClickOpen}>
              <PlaylistAddIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <form>
            <TextField
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
              label="Room Name"
            />{" "}
            <TextField
              value={roomDesc}
              onChange={(e) => setRoomDesc(e.target.value)}
              label="Room Description"
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button
            disabled={!roomName && !roomDesc}
            onClick={handleClose}
            color="primary"
            autoFocus
          >
            Create Room
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default NavBar;
