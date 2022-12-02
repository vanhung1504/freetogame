import { configureStore } from "@reduxjs/toolkit";
import { gameDetailReducer } from "./features/gameDetail/gameDetail.slice";
import { gamesReducer } from "./features/games/games.slice";

const store = configureStore({
  reducer: {
    games: gamesReducer,
    gameDetail: gameDetailReducer,
  },
});

export default store;
