import {useMutation, useQueryClient} from '@tanstack/react-query';
import {TProduct} from '../types';
import {axiosInstance} from './axios';

const editProduct = async (updatedProduct: TProduct) => {
  const response = await axiosInstance.put(
    `products/${updatedProduct.id}`,
    updatedProduct,
  );
  return response.data;
};

export const useEditProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: editProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['products']});
    },
  });
};
