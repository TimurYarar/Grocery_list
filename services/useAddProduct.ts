import {useMutation, useQueryClient} from '@tanstack/react-query';
import {TAddProduct} from '../types';
import {axiosInstance} from './axios';

const addProduct = async (newProduct: TAddProduct) => {
  const response = await axiosInstance.post('products', newProduct);
  return response.data;
};

export const useAddProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['products']});
    },
  });
};
