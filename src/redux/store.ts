import { configureStore } from '@reduxjs/toolkit';
import rootReducer, { RootState } from './root-reducer';

const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type { RootState };

export default store;