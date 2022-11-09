import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { fetchPosts } from './postsAPI';

export interface PostI {
   userId: number;
   id: number;
   title: string;
   body: string;  
}

export interface PostsState {
  data: PostI[];
  currentPostId: number;
  loading: boolean;
  error: string | null;
}

const initialState: PostsState = {
  data: [],
  currentPostId: 0,
  loading: false,
  error: null
};

export const getPostsAsync = createAsyncThunk(
  'posts/fetchPosts',
  async () => {
    const response = await fetchPosts();
    return response;
  }
);

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setCurrentPostId: (state,  action: PayloadAction<number>) => {
      state.currentPostId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPostsAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPostsAsync.fulfilled, (state, action: PayloadAction<PostI[]>) => {
        state.loading = false;
        state.error = null;
        state.data = action.payload;
      })
      .addCase(getPostsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to load posts';
      });
  },
});

export const { setCurrentPostId } = postsSlice.actions;

export const selectPosts = (state: RootState) => state.posts;
export const selectCurrentPost = (state: RootState) => state.posts.currentPostId;

export default postsSlice.reducer;
