import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  loading: true,
  filter: {
    platform: [],
    categories: [],
  },
  currentPage: 0,
  pageSize: 10,
};

export const loadGames = createAsyncThunk("games", async (args, thunkApi) => {
  const response = await fetch(
    "https://free-to-play-games-database.p.rapidapi.com/api/games",
    {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "749e33ac78msh7ddd1b23539a3dep123ba4jsn5f8055dc7426",
        "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
      },
    }
  );
  const data = await response.json();

  return data;
});

const gamesSlice = createSlice({
  name: "games",
  initialState,
  reducers: {
    pageChanged: (state, action) => {
      return { ...state, currentPage: action.payload };
    },
    filterChanged: (state, action) => {
      return {
        ...state,
        currentPage: 0,
        filter: {
          ...state.filter,
          ...action.payload,
        },
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadGames.fulfilled, (state, action) => {
      return {
        ...state,
        data: action.payload,
        loading: false,
      };
    });
  },
});
export const { pageChanged, filterChanged } = gamesSlice.actions;
export const gamesReducer = gamesSlice.reducer;
export const gamesSelector = (state) => {
  const { platform, categories } = state.games.filter;
  let data;

  if (platform.length === 0 && categories.length === 0) {
    data = state.games.data;
  } else if (platform.length === 0) {
    data = state.games.data.filter((game) =>
      state.games.filter.categories.includes(game.genre.toLowerCase())
    );
  } else if (categories.length === 0) {
    const statePlatform = state.games.filter.platform;
    data = state.games.data.filter((game) => {
      let result = false;
      const gamePlatform = game.platform.split(",");
      gamePlatform.forEach((platform) => {
        if (statePlatform.includes(platform.trim())) {
          result = true;
        }
      });
      return result;
    });
  } else {
    const firstFilterData = state.games.data.filter((game) =>
      state.games.filter.categories.includes(game.genre.toLowerCase())
    );

    const statePlatform = state.games.filter.platform;

    data = firstFilterData.filter((game) => {
      let result = false;
      const gamePlatform = game.platform.split(",");
      gamePlatform.forEach((platform) => {
        if (statePlatform.includes(platform.trim())) {
          result = true;
        }
      });
      return result;
    });
  }

  const total = data.length;
  const totalPage = Math.ceil(total / state.games.pageSize);

  const gamesByPage = data.slice(
    state.games.currentPage * state.games.pageSize,
    (state.games.currentPage + 1) * state.games.pageSize
  );

  return {
    data: gamesByPage,
    loading: state.games.loading,
    filter: state.games.filter,
    currentPage: state.games.currentPage,
    totalPage,
    pageChanged,
  };
};
