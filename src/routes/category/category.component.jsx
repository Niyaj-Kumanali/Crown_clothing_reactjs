import { useState, useEffect, memo } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import ProductCard from '../../components/product-card/product-card.component';
import PageLoader from '../../components/page-loader/page-loader.component';

import {
  selectCategoriesMap,
  selectCategoriesIsLoading,
} from '../../store/categories/categories.slice';

import { CategoryContainer, Title } from './category.styles';

const Category = memo(() => {
  const { category } = useParams();
  const categoriesMap = useSelector(selectCategoriesMap);
  const isLoading     = useSelector(selectCategoriesIsLoading);
  const [products, setProducts] = useState(categoriesMap[category]);

  useEffect(() => {
    setProducts(categoriesMap[category]);
  }, [category, categoriesMap]);

  if (isLoading) return <PageLoader label={`Loading ${category}…`} />;

  return (
    <>
      <Title>{category.toUpperCase()}</Title>
      <CategoryContainer>
        {products &&
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </CategoryContainer>
    </>
  );
});

Category.displayName = 'Category';

export default Category;
