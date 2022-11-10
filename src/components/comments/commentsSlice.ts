import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { fetchComments } from './commentsAPI';

export interface CommentI {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
  tagIds: number[] 
}

export interface PostsComments {
  // key is post Id
  // value is comments data per post id
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
    addTagToComment: (state, action: PayloadAction<{tagId: number, comment: CommentI}>) => {
      state.data[action.payload.comment.postId] = state.data[action.payload.comment.postId].map(c=> {
        if (c.id === action.payload.comment.id) {
          if(!c.tagIds) c.tagIds = [];
          c.tagIds.push(action.payload.tagId);
          return c;
        } else return c;
      })
    },
    deleteTagFromComment: (state, action: PayloadAction<{tagId: number, comment: CommentI}>) => {
      state.data[action.payload.comment.postId] = state.data[action.payload.comment.postId].map(c=> {
        if (c.id === action.payload.comment.id) {
          c.tagIds = c.tagIds.filter(t => t !== action.payload.tagId);
          return c;
        } else return c;
      })
    }
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

export const { addTagToComment, deleteTagFromComment } = commentsSlice.actions;
export const selectComments = (state: RootState) => state.comments;

export default commentsSlice.reducer;
