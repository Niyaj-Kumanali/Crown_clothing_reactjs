import cartReducer, {
  addItemToCart,
  removeItemFromCart,
  clearItemFromCart,
  setIsCartOpen,
  selectCartCount,
  selectCartTotal,
} from '../cart.slice';

const mockProduct = { id: 1, name: 'Crown Hat', price: 35, imageUrl: '' };
const mockProduct2 = { id: 2, name: 'Crown Jacket', price: 120, imageUrl: '' };

describe('Cart Slice — Reducer', () => {
  it('returns the initial state', () => {
    const state = cartReducer(undefined, { type: '@@INIT' });
    expect(state).toEqual({ isCartOpen: false, cartItems: [] });
  });

  it('adds a new product to an empty cart', () => {
    const state = cartReducer(undefined, addItemToCart(mockProduct));
    expect(state.cartItems).toHaveLength(1);
    expect(state.cartItems[0]).toMatchObject({ ...mockProduct, quantity: 1 });
  });

  it('increments quantity when the same product is added again', () => {
    let state = cartReducer(undefined, addItemToCart(mockProduct));
    state = cartReducer(state, addItemToCart(mockProduct));
    expect(state.cartItems).toHaveLength(1);
    expect(state.cartItems[0].quantity).toBe(2);
  });

  it('adds different products as separate cart items', () => {
    let state = cartReducer(undefined, addItemToCart(mockProduct));
    state = cartReducer(state, addItemToCart(mockProduct2));
    expect(state.cartItems).toHaveLength(2);
  });

  it('decrements quantity when removeItemFromCart is called', () => {
    let state = cartReducer(undefined, addItemToCart(mockProduct));
    state = cartReducer(state, addItemToCart(mockProduct));     // qty = 2
    state = cartReducer(state, removeItemFromCart(mockProduct)); // qty = 1
    expect(state.cartItems[0].quantity).toBe(1);
  });

  it('removes item entirely when quantity reaches 0', () => {
    let state = cartReducer(undefined, addItemToCart(mockProduct)); // qty = 1
    state = cartReducer(state, removeItemFromCart(mockProduct));    // removed
    expect(state.cartItems).toHaveLength(0);
  });

  it('clears an item regardless of its quantity', () => {
    let state = cartReducer(undefined, addItemToCart(mockProduct));
    state = cartReducer(state, addItemToCart(mockProduct)); // qty = 2
    state = cartReducer(state, clearItemFromCart(mockProduct));
    expect(state.cartItems).toHaveLength(0);
  });

  it('only clears the matching item, leaving others intact', () => {
    let state = cartReducer(undefined, addItemToCart(mockProduct));
    state = cartReducer(state, addItemToCart(mockProduct2));
    state = cartReducer(state, clearItemFromCart(mockProduct));
    expect(state.cartItems).toHaveLength(1);
    expect(state.cartItems[0].id).toBe(mockProduct2.id);
  });

  it('toggles isCartOpen', () => {
    let state = cartReducer(undefined, setIsCartOpen(true));
    expect(state.isCartOpen).toBe(true);
    state = cartReducer(state, setIsCartOpen(false));
    expect(state.isCartOpen).toBe(false);
  });
});

describe('Cart Slice — Selectors', () => {
  const stateWith2Hats = {
    cart: { isCartOpen: false, cartItems: [{ ...mockProduct, quantity: 2 }] },
  };

  it('selectCartCount returns total number of items', () => {
    expect(selectCartCount(stateWith2Hats)).toBe(2);
  });

  it('selectCartTotal returns correct price total', () => {
    // 2 hats × $35 = $70
    expect(selectCartTotal(stateWith2Hats)).toBe(70);
  });
});
