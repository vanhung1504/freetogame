import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  loading: true,
};

export const loadGameDetail = createAsyncThunk(
  "gameDetail",
  async (id, thunkApi) => {
    const response = await fetch(
      "https://free-to-play-games-database.p.rapidapi.com/api/game?id=" + id,
      {
        method: "GET",
        headers: {
          "X-RapidAPI-Key":
            "749e33ac78msh7ddd1b23539a3dep123ba4jsn5f8055dc7426",
          "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
        },
      }
    );
    const data = await response.json();

    return data;
  }
);

const gameDetailSlice = createSlice({
  name: "gameDetail",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loadGameDetail.pending, (state, action) => {
      return {
        ...initialState,
      };
    });
    builder.addCase(loadGameDetail.fulfilled, (state, action) => {
      return {
        data: action.payload,
        loading: false,
      };
    });
  },
});

export const gameDetailReducer = gameDetailSlice.reducer;
export const gameDetailSelector = (state) => ({
  data: state.gameDetail.data,
  loading: state.gameDetail.loading,
});
