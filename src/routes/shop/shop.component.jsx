import { Routes, Route } from 'react-router-dom';

import CategoriesPreview from '../categories-preview/categories-preview.component';
import Category from '../category/category.component';
import useProducts from '../../hooks/useProducts';

const Shop = () => {
  // Data fetching + dispatch is fully encapsulated in the hook
  useProducts();

  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=':category' element={<Category />} />
    </Routes>
  );
};

export default Shop;
