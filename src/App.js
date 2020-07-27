import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// screens
import ChatRoom from "./ChatRoom";
import Lobby from "./Lobby";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Lobby} />
        <Route path="/chatroom/:id" component={ChatRoom} />

        <Route path="*" component={Lobby} />
      </Switch>
    </Router>
  );
};

export default App;
