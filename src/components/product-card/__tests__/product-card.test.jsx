import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../../../store/cart/cart.slice';
import ProductCard from '../product-card.component';

const mockProduct = {
  id: 42,
  name: 'Testing Hat',
  price: 55,
  imageUrl: 'https://example.com/hat.jpg',
};

const createTestStore = () =>
  configureStore({ reducer: { cart: cartReducer } });

const renderWithStore = (ui, store = createTestStore()) =>
  ({ ...render(<Provider store={store}>{ui}</Provider>), store });

describe('ProductCard', () => {
  it('renders the product name', () => {
    renderWithStore(<ProductCard product={mockProduct} />);
    expect(screen.getByText('Testing Hat')).toBeInTheDocument();
  });

  it('renders the product price with $ prefix', () => {
    renderWithStore(<ProductCard product={mockProduct} />);
    expect(screen.getByText('$55')).toBeInTheDocument();
  });

  it('renders the product image with correct alt text', () => {
    renderWithStore(<ProductCard product={mockProduct} />);
    const img = screen.getByAltText('Testing Hat');
    expect(img).toHaveAttribute('src', mockProduct.imageUrl);
    expect(img).toHaveAttribute('loading', 'lazy');
  });

  it('shows "Add to Cart" button', () => {
    renderWithStore(<ProductCard product={mockProduct} />);
    expect(screen.getByRole('button', { name: /add to cart/i })).toBeInTheDocument();
  });

  it('dispatches addItemToCart when button is clicked', () => {
    const store = createTestStore();
    renderWithStore(<ProductCard product={mockProduct} />, store);

    fireEvent.click(screen.getByRole('button', { name: /add to cart/i }));

    const { cartItems } = store.getState().cart;
    expect(cartItems).toHaveLength(1);
    expect(cartItems[0]).toMatchObject({ id: 42, quantity: 1 });
  });

  it('shows "Added!" briefly after clicking add to cart', () => {
    renderWithStore(<ProductCard product={mockProduct} />);
    fireEvent.click(screen.getByRole('button', { name: /add to cart/i }));
    expect(screen.getByRole('button')).toHaveTextContent('✓ Added!');
  });
});
