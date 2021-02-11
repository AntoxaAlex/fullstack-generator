import React, {useEffect} from "react"
//Styles
import "./index.css"
import "bootstrap/dist/css/bootstrap.min.css"
//Router
import {BrowserRouter as Router, Route,Switch} from "react-router-dom";
import PrivateRoute from "./components/routing/PrivateRoute";
//Redux
import {Provider} from "react-redux";
import store from "./store";
import setAuthToken from "./utils/setAuthToken";
import {loadUser} from "./actions/auth";
//Components
import Alert from "./components/layout/Alert";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import NewProject from "./components/NewProject";
import Project from "./components/Project";


if(localStorage.token){
    setAuthToken(localStorage.token);
}

function App() {

    useEffect(()=>{
        store.dispatch(loadUser())
    },[])

  return (
      <Provider store={store}>
          <Router>
              <Alert/>
              <Switch>
                  <Route path="/signin" component={Login}/>
                  <Route path="/signup" component={Register}/>
                  <PrivateRoute path="/project/:id" component={Project}/>
                  <PrivateRoute path="/new" component={NewProject}/>
                  <PrivateRoute path="/" component={Home}/>
              </Switch>
          </Router>
      </Provider>
  );
}

export default App;
