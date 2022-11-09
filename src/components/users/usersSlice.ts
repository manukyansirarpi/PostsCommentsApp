import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { fetchUsers } from './usersAPI';

export interface AddressI {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: {
    lat: string;
    lng: string
  }
}

interface CompanyI {
    name: string;
    catchPhrase: string;
    bs: string;
}

export interface UserI {
  id: number;
  name: string;
  username: string;
  email: string;
  address?: AddressI;
  phone?: string;
  website?: string;
  company?: CompanyI;
}

export interface UsersState {
  data: UserI[];
  currentUser: UserI;
  loading: boolean;
  error: string | null;
}

const initialState: UsersState = {
  data: [],
  loading: false,
  error: null,
  currentUser: {
    id: 0,
    name: '',
    username: '',
    email: ''
  }
};

export const getUsersAsync = createAsyncThunk(
  'users/fetchUsers',
  async () => {
    const response = await fetchUsers();
    return response;
  }
);

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsersAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUsersAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.data = action.payload;
        // assuming current user is first one
        state.currentUser = action.payload[0];
      })
      .addCase(getUsersAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to load users';
      });
  },
});

export const selectUsers = (state: RootState) => state.users.data;
export const selectCurrentUser = (state: RootState) => state.users.currentUser;

export default usersSlice.reducer;
