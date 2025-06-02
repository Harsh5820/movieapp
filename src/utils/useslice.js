import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: null,
    status: false,
    bearerToken:'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZTc2ZTc4OGMwOGRlODgyZDUwZWEwZDc4MDlmZGYzNCIsIm5iZiI6MTc0MzQwMDk0MC4xMTAwMDAxLCJzdWIiOiI2N2VhMmZlYzk4M2YxYWVmYzdlNTU0ZGMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.Fj8MhzwkRSJiOASbCNigpi009Rr2E34qm-qSYqcgTZM',
    movieInWatchlistId: []
};

const userSlice = createSlice({
    name: "user",
    initialState, 
    reducers: {
        login: (state, action) => {
            state.status = true;
            state.data = action.payload;
        },

        replaceMoviesInWatchlist : (state, action) => {
            state.movieInWatchlistId = action.payload
        }
    }
});

export const { login, replaceMoviesInWatchlist } = userSlice.actions;
export default userSlice.reducer;
