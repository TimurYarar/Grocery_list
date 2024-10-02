import {useMutation, useQueryClient} from '@tanstack/react-query';
import {axiosInstance} from './axios';

const deleteProduct = async (id: string) => {
  const response = await axiosInstance.delete(`products/${id}`);
  return response.data;
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['products']});
    },
  });
};
