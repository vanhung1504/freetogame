import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import App from "./App";
import GameDetail from "./pages/gameDetail/GameDetail";
import Home from "./pages/home/Home";
import store from "./store";

const routes = createRoutesFromElements(
  <Route element={<App />}>
    <Route path="/" element={<Home />} />
    <Route path="/game/:id" element={<GameDetail />} />
    <Route path="*" element={<div>404 | Page Not Found</div>} />
  </Route>
);

const router = createBrowserRouter(routes, {
  basename: "/freetogame/",
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
