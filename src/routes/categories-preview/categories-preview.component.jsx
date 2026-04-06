import { memo } from 'react';
import { useSelector } from 'react-redux';

import { selectCategoriesMap, selectCategoriesIsLoading } from '../../store/categories/categories.slice';
import CategoryPreview from '../../components/category-preview/category-preview.component';
import PageLoader from '../../components/page-loader/page-loader.component';

const CategoriesPreview = memo(() => {
  const categoriesMap = useSelector(selectCategoriesMap);
  const isLoading     = useSelector(selectCategoriesIsLoading);

  if (isLoading) return <PageLoader label='Loading categories…' />;

  return (
    <>
      {Object.keys(categoriesMap).map((title) => (
        <CategoryPreview
          key={title}
          title={title}
          products={categoriesMap[title]}
        />
      ))}
    </>
  );
});

CategoriesPreview.displayName = 'CategoriesPreview';

export default CategoriesPreview;
