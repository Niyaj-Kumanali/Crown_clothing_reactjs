import { useDispatch, useSelector } from 'react-redux';
import {
  selectCartItems,
  selectCartCount,
  selectCartTotal,
  selectIsCartOpen,
  addItemToCart,
  removeItemFromCart,
  clearItemFromCart,
  setIsCartOpen,
} from '../../store/cart/cart.slice';

/**
 * useCart — custom hook that encapsulates all cart state and actions.
 * Components import this instead of wiring useSelector + useDispatch manually.
 */
const useCart = () => {
  const dispatch = useDispatch();

  return {
    cartItems:      useSelector(selectCartItems),
    cartCount:      useSelector(selectCartCount),
    cartTotal:      useSelector(selectCartTotal),
    isCartOpen:     useSelector(selectIsCartOpen),
    addToCart:      (product) => dispatch(addItemToCart(product)),
    removeFromCart: (product) => dispatch(removeItemFromCart(product)),
    clearFromCart:  (product) => dispatch(clearItemFromCart(product)),
    toggleCart:     (bool)    => dispatch(setIsCartOpen(bool)),
  };
};

export default useCart;
