import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Signin from "./signin/Signin";
import InstaLogin from "./signin/InstaLogin";
import InstaLoginComponent from "./signin/InstaLoginComponent";
import Signup from "./signup/Signup";
import Profile from "./profile/Profile";
import Chat from "./chat/Chat";
import "./App.css";
import Accounts from "./profile/Accounts";


export const AppContext = React.createContext();
const App = (props) => {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" render={(props) => <Profile {...props} />} />
          <Route
            exact
            path="/login"
            render={(props) => <Signin {...props} />}
          />
          <Route
            exact
            path="/signup"
            render={(props) => <Signup {...props} />}
          />
          <Route exact path="/chat" render={(props) => <Chat {...props} />} />
          <Route exact path="/instalogin" render={(props) => <InstaLogin {...props}/>} />
          <Route exact path="/instalogin2" render={() => <InstaLoginComponent />} />
          <Route exact path="/me" render={(props) => <Accounts {...props}/>} />
          {/* <Route exact path="/privacypolicy" render={() => } />
          <Route exact path="/deletedata" render={() => } /> */}
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
