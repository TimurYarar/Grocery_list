import {useInfiniteQuery} from '@tanstack/react-query';
import {axiosInstance} from './axios';

const fetchProducts = async ({pageParam = 1}) => {
  const response = await axiosInstance.get(
    `products?_page=${pageParam}&_per_page=20`,
  );
  return response.data;
};

export const useProducts = () => {
  return useInfiniteQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length === 10 ? allPages.length + 1 : undefined;
    },
  });
};
