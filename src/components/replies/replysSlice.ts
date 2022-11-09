import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface ReplyI {
  id: number;
  commentId: number;
  name: string;
  text: string;
}

export interface CommentReplies {
  [key: number]: ReplyI[];
}

export interface RepliesState {
  data: CommentReplies;
  loading: boolean;
  error: string | null;
}

const initialState: RepliesState = {
  data: {},
  loading: false,
  error: null
};

export const repliesSlice = createSlice({
  name: 'replies',
  initialState,
  reducers: {
    replyToComment: (state, action: PayloadAction<ReplyI[]>) => {
      const replies = state.data[action.payload[0].commentId];
      state.data[action.payload[0].commentId] = replies? [...replies, ...action.payload] : action.payload
    },
    deleteReply: (state, action: PayloadAction<{id: number, commentId: number}>) => {
        state.data[action.payload.commentId] = state.data[action.payload.commentId].filter((repl) => repl.id !== action.payload.id);
    }
  }
});

export const selectReplies = (state: RootState) => state.replies.data;

export const { replyToComment, deleteReply } = repliesSlice.actions;

export default repliesSlice.reducer;
