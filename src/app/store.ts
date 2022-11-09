import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import usersSlice from '../components/users/usersSlice';
import postsSlice from '../components/posts/postsSlice';
import commentsSlice from '../components/comments/commentsSlice';

export const store = configureStore({
  reducer: {
    users: usersSlice,
    posts: postsSlice,
    comments: commentsSlice
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
