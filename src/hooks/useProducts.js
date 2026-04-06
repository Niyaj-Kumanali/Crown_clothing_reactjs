import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCategoriesAndDocuments } from '../utils/firebase/firebase.utils';
import {
  setCategories,
  setIsLoading,
  setCategoriesError,
  selectCategoriesMap,
  selectCategoriesIsLoading,
  selectCategoriesError,
} from '../store/categories/categories.slice';

/**
 * useProducts — fetches categories from Firestore and keeps Redux in sync.
 * Encapsulates async fetch + dispatch so Shop/CategoriesPreview stay clean.
 */
const useProducts = () => {
  const dispatch = useDispatch();
  const categoriesMap = useSelector(selectCategoriesMap);
  const isLoading     = useSelector(selectCategoriesIsLoading);
  const error         = useSelector(selectCategoriesError);

  useEffect(() => {
    const fetchCategories = async () => {
      dispatch(setIsLoading(true));
      try {
        const data = await getCategoriesAndDocuments('categories');
        dispatch(setCategories(data));
      } catch (err) {
        dispatch(setCategoriesError(err.message));
      }
    };

    fetchCategories();
  }, [dispatch]);

  return { categoriesMap, isLoading, error };
};

export default useProducts;
