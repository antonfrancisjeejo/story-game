import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import {
  CreatedGame,
  CreateGame,
  GameCreator,
  GameResult,
  Home,
  JoinGame,
  Login,
  OldStories,
  PlayGame,
  Signup,
  StartGame,
  Welcome,
} from "./Pages";
import userReducer from "./store/reducers/auth";
import storyReducer from "./store/reducers/story";
import { Provider } from "react-redux";
import { createStore, combineReducers, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";

const rootReducer = combineReducers({
  auth: userReducer,
  storyData: storyReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/result" element={<GameResult />} />
          <Route path="/play" element={<PlayGame />} />
          <Route path="/start/:id" element={<StartGame />} />
          <Route path="/join" element={<JoinGame />} />
          <Route path="/created-game/:id" element={<CreatedGame />} />
          <Route path="/game-creator/:id" element={<GameCreator />} />
          <Route path="/create" element={<CreateGame />} />
          <Route path="/oldstories" element={<OldStories />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route exact path="/home" element={<PrivateRoute />}>
            <Route exact path="/home" element={<Home />} />
          </Route>
          <Route path="/" element={<Welcome />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
