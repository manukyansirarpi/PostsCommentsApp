import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface TagI {
  id: number;
  text: string;
}

export interface TagsState {
  data: TagI[];
  loading: boolean;
  error: string | null;
}

const initialState: TagsState = {
  data: [],
  loading: false,
  error: null
};

export const tagsSlice = createSlice({
  name: 'tags',
  initialState,
  reducers: {
    addTag: (state, action: PayloadAction<TagI>) => {
      if(!state.data.some(t => t.text === action.payload.text)){
        state.data.push(action.payload);
      }
    }
  }
});

export const selectTags = (state: RootState) => state.tags.data;

export const { addTag } = tagsSlice.actions;

export default tagsSlice.reducer;
