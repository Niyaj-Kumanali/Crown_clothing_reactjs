import { createSlice, createSelector } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    currentUser: null,
  },
  reducers: {
    setCurrentUser(state, action) {
      state.currentUser = action.payload;
    },
  },
});

export const { setCurrentUser } = userSlice.actions;

export const selectCurrentUser = (state) => state.user.currentUser;

export const selectIsUserAuthenticated = createSelector(
  [selectCurrentUser],
  (user) => !!user
);

export default userSlice.reducer;
