import { createSlice, createSelector } from '@reduxjs/toolkit';

const categoriesSlice = createSlice({
  name: 'categories',
  initialState: {
    categories: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    setCategories(state, action) {
      state.categories = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    setIsLoading(state, action) {
      state.isLoading = action.payload;
    },
    setCategoriesError(state, action) {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

export const {
  setCategories,
  setIsLoading,
  setCategoriesError,
} = categoriesSlice.actions;

// ─── Selectors ───────────────────────────────────────────────────────────────

const selectCategoriesState = (state) => state.categories;

export const selectCategories = createSelector(
  [selectCategoriesState],
  (slice) => slice.categories
);

export const selectCategoriesIsLoading = createSelector(
  [selectCategoriesState],
  (slice) => slice.isLoading
);

export const selectCategoriesError = createSelector(
  [selectCategoriesState],
  (slice) => slice.error
);

export const selectCategoriesMap = createSelector(
  [selectCategories],
  (categories) =>
    categories.reduce((acc, { title, items }) => {
      acc[title.toLowerCase()] = items;
      return acc;
    }, {})
);

export default categoriesSlice.reducer;
