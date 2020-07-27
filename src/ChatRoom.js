import React, { useState, useEffect, useRef } from "react";
import "./ChatRoom.css";
import Message from "./components/Message";
import NavBar from "./components/NavBar";
import { useParams } from "react-router-dom";
import { TextField, FormControl, IconButton } from "@material-ui/core";
import db from "./firebase";
import firebase from "firebase";
import FlipMove from "react-flip-move";
import SendIcon from "@material-ui/icons/Send";

function ChatRoom() {
  const [input, setInput] = useState("");
  const [roomDetail, setRoomDetail] = useState([]);
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState("");
  const { id } = useParams();

  // get room name
  useEffect(() => {
    var getName = db.collection("rooms").doc(id);

    getName.get().then((doc) => {
      setRoomDetail(doc.data());
    });
  }, []);

  // store message object to database
  const sendMessage = (e) => {
    e.preventDefault();
    db.collection("rooms").doc(id).collection("messages").add({
      message: input,
      username,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setInput("");
  };

  // get data from firebase database
  useEffect(() => {
    // get the specific collection from database
    db.collection("rooms")
      .doc(id)
      .collection("messages")
      .orderBy("timestamp", "asc")
      .onSnapshot((snapshot) => {
        // snapshot == documents
        setMessages(
          snapshot.docs.map((doc) => ({ id: doc.id, message: doc.data() }))
        );
      });
  }, []);

  // get username
  useEffect(() => {
    setUsername(prompt("Please Enter Your Username"));
    //setUsername("Dev");
  }, []);

  // scroll to bottom when new message loaded
  const msgRef = useRef(null);
  useEffect(() => {
    msgRef.current.scrollIntoView();
  }, [messages]);

  return (
    <div className="chatroom">
      <NavBar title={roomDetail.roomName} position="fixed" goBack />

      <div className="messages">
        <FlipMove>
          {messages.map(({ id, message }) => (
            <Message key={id} username={username} message={message} />
          ))}
        </FlipMove>
        <div ref={msgRef}></div>
      </div>

      <form onSubmit={sendMessage} className="chatroom__form">
        <FormControl className="chatroom__formControl">
          <TextField
            className="chatroom__input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder=""
            placecholder="Enter your message..."
          />

          <IconButton
            className="chatroom__iconButton"
            variant="contained"
            color="primary"
            type="submit"
            disabled={!input}
          >
            <SendIcon />
          </IconButton>
        </FormControl>
      </form>
    </div>
  );
}

export default ChatRoom;
