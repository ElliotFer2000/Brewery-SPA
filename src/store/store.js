import { configureStore } from '@reduxjs/toolkit'
import { breweryReducer } from '../actions/brewerySlice'

const store = configureStore({
    reducer: {
        brewery: breweryReducer
    }
})

export default store