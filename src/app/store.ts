import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import usersSlice from '../components/users/usersSlice';
import postsSlice from '../components/posts/postsSlice';
import commentsSlice from '../components/comments/commentsSlice';
import replysSlice from '../components/replies/replysSlice';

export const store = configureStore({
  reducer: {
    users: usersSlice,
    posts: postsSlice,
    comments: commentsSlice,
    replies: replysSlice
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
