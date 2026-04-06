import { createSlice, createSelector } from '@reduxjs/toolkit';

// ─── Pure helper functions (logic stays identical, now inside reducer) ───────

const addCartItem = (cartItems, productToAdd) => {
  const existing = cartItems.find((item) => item.id === productToAdd.id);
  if (existing) {
    return cartItems.map((item) =>
      item.id === productToAdd.id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
  }
  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (cartItems, itemToRemove) => {
  const existing = cartItems.find((item) => item.id === itemToRemove.id);
  if (existing.quantity === 1) {
    return cartItems.filter((item) => item.id !== itemToRemove.id);
  }
  return cartItems.map((item) =>
    item.id === itemToRemove.id
      ? { ...item, quantity: item.quantity - 1 }
      : item
  );
};

// ─── Slice ───────────────────────────────────────────────────────────────────

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    isCartOpen: false,
    cartItems: [],
  },
  reducers: {
    setIsCartOpen(state, action) {
      state.isCartOpen = action.payload;
    },
    addItemToCart(state, action) {
      state.cartItems = addCartItem(state.cartItems, action.payload);
    },
    removeItemFromCart(state, action) {
      state.cartItems = removeCartItem(state.cartItems, action.payload);
    },
    clearItemFromCart(state, action) {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload.id
      );
    },
  },
});

export const {
  setIsCartOpen,
  addItemToCart,
  removeItemFromCart,
  clearItemFromCart,
} = cartSlice.actions;

// ─── Selectors ───────────────────────────────────────────────────────────────

const selectCartState = (state) => state.cart;

export const selectIsCartOpen = createSelector(
  [selectCartState],
  (cart) => cart.isCartOpen
);

export const selectCartItems = createSelector(
  [selectCartState],
  (cart) => cart.cartItems
);

export const selectCartCount = createSelector([selectCartItems], (cartItems) =>
  cartItems.reduce((total, item) => total + item.quantity, 0)
);

export const selectCartTotal = createSelector([selectCartItems], (cartItems) =>
  cartItems.reduce((total, item) => total + item.quantity * item.price, 0)
);

export default cartSlice.reducer;
