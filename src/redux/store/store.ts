import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";


import JobListing from "../reducers/JobListingSlice";



const rootReducer = combineReducers({
  JobListing,
 
});


const store = configureStore({
  reducer: rootReducer,
 
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch =typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
export { store };
