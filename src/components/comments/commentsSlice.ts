import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { fetchComments } from './commentsAPI';

export interface CommentI {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}

export interface PostsComments {
  [key: number]: CommentI[];
}

export interface CommentsState {
  data: PostsComments;
  loading: boolean;
  error: string | null;
}

const initialState: CommentsState = {
  data: [],
  loading: false,
  error: null
};

export const getCommentsAsync = createAsyncThunk(
  'comments/fetchComments',
  async (postId: number) => {
    const response = await fetchComments(postId);
    return response;
  }
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCommentsAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCommentsAsync.fulfilled, (state, action: PayloadAction<CommentI[]>) => {
        state.loading = false;
        state.error = null;
        state.data[action.payload[0].postId] = action.payload
      })
      .addCase(getCommentsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to load comments';
      });
  },
});

export const selectComments = (state: RootState) => state.comments;

export default commentsSlice.reducer;
