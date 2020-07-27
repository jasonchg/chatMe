import React, { forwardRef } from "react";
import { Card, Typography, CardContent } from "@material-ui/core";

import styled from "styled-components";
const StylesMe = styled.div`
  .message {
    padding: 10px;
    margin: 10px;
    width: fit-content !important;
  }
  .message__user {
    margin-left: auto;
    color: white;
    text-align: left !important;
  }
  .message__userCard {
    background-color: #0074f1 !important;
  }
  .message__guestCard {
    background-color: #e9e9eb !important;
  }
`;

// forwardRef - higher order function, wrapping the existing function and keep track what is moving or update itself

const Message = forwardRef(({ username, message }, ref) => {
  const isUser = username === message.username;

  return (
    <StylesMe>
      <div ref={ref} className={`message ${isUser && "message__user"}`}>
        {(!isUser && message.username) || "Unknown User"}
        <Card className={isUser ? "message__userCard" : "message__guestCard"}>
          <CardContent>
            <Typography color="white" variant="h5" component="h2">
              {message.message}
            </Typography>
          </CardContent>
        </Card>
      </div>
    </StylesMe>
  );
});

export default Message;
