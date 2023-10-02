import { io } from "socket.io-client";
export const socket = io("/", {
  withCredentials: true,
  reconnection: true,
});

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store.js";

import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Navigate,
} from "react-router-dom";
import PollPage from "./Pages/PollPage/PollPage.jsx";
import LoginPage from "./Pages/LoginPage/LoginPage.jsx";
import SignupPage from "./Pages/SignupPage/SignupPage.jsx";
import HomePage from "./Pages/HomePage/HomePage.jsx";
import ProfilePage from "./Pages/ProfilePage/ProfilePage.jsx";
import ProfilePollViewer from "./Components/ProfilePollViewer/ProfilePollView.jsx";
import ProfilePollCreatePage from "./Pages/ProfilePage/ProfilePollCreatePage/ProfilePollCreatePage.jsx";
import ProfilePollListPage from "./Pages/ProfilePage/ProfilePollsPage/ProfilePollsPage.jsx";

const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App socket={socket} />}>
      <Route index={true} path="/" element={<HomePage />}></Route>
      <Route path="/login" element={<LoginPage />}></Route>
      <Route path="/signup" element={<SignupPage />}></Route>
      <Route path="/test" element={<h1>test</h1>}></Route>
      <Route path="/profile" element={<ProfilePage />}>
        <Route path="create" element={<ProfilePollCreatePage />}></Route>
        <Route path="polls" index element={<ProfilePollListPage />}></Route>
        <Route path="polls/:pollId" element={<ProfilePollViewer />} />
        <Route path="" element={<Navigate to={"polls"} />}></Route>
        <Route path="*" element={<Navigate to={"/profile"} />}></Route>
      </Route>
      <Route path="/poll/:id" element={<PollPage socket={socket} />}></Route>
      <Route path="*" element={<Navigate to={"/"} />}></Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={routes} />
  </Provider>
);
