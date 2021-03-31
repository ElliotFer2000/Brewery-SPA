import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'breweries',
  initialState: {
     results: {},
     favorites: []
  },
  reducers: {
    addPageResult: (state, action) => {

      console.log("Updating the store")
      console.log(action.payload)
   
      if(state.results[action.payload.term]){
        state.results[action.payload.term] = [...action.payload.results,...state.results[action.payload.term]]
        
      }else{
        state.results[action.payload.term] = [...action.payload.results]
      }
    },
    addFavorite: (state, action) => {
      state.favorites = [...action.payload.favorites]
    }
  },
});

const selectResults = (state) =>state.brewery.results
const selectFavorites = (state) => state.brewery.favorites

const breweryReducer = slice.reducer
const actions = slice.actions

export { breweryReducer,actions,selectFavorites,selectResults }