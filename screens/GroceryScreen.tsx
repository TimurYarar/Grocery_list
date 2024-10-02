import React, {useCallback, useEffect, useState} from 'react';
import {
  AddButton,
  AddProductModal,
  EditProductModal,
  SwipeableContainer,
} from '../components';
import {ActivityIndicator, FlatList} from 'react-native';
import {
  useAddProduct,
  useDeleteProduct,
  useEditProduct,
  useProducts,
} from '../services';
import {TAddProduct, TProduct} from '../types';
import {Box, Center} from '@gluestack-ui/themed';
import {Spinner} from '@gluestack-ui/themed';

const emptyProduct = {
  id: '',
  title: '',
  amount: 0,
  bought: false,
};

export const GroceryScreen = () => {
  const {mutateAsync: deleteProduct} = useDeleteProduct();
  const {mutateAsync: addProduct} = useAddProduct();
  const {mutateAsync: editProduct} = useEditProduct();
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedProduct, setSelectedProduct] =
    useState<TProduct>(emptyProduct);
  const [localData, setLocalData] = useState<TProduct[]>([]);
  const {
    data,
    fetchNextPage,
    refetch,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useProducts();

  useEffect(() => {
    if (data?.pages) {
      setLocalData(data.pages.flat()[0].data);
    }
  }, [data]);

  const toggleCheckbox = useCallback(
    async (product: TProduct) => {
      const optimisticProduct = {...product, bought: !product.bought};
      const updatedData = localData.map(p =>
        p.id === product.id ? optimisticProduct : p,
      );
      const previousData = localData;
      setLocalData(updatedData);

      try {
        await editProduct(optimisticProduct);
      } catch (error) {
        setLocalData(previousData);
      }
    },
    [editProduct, localData],
  );

  const handleEdit = useCallback((product: TProduct) => {
    setSelectedProduct(product);
    setShowEditModal(true);
  }, []);

  const handleAddProduct = () => {
    setShowAddModal(true);
  };

  const handleAddProductSubmit = useCallback(
    async (newProduct: TAddProduct) => {
      const newData = [...localData, {...newProduct, id: 'd1a12'}];
      const previousData = localData;

      setLocalData(newData);

      try {
        await addProduct(newProduct);
      } catch (error) {
        setLocalData(previousData);
      }
    },
    [addProduct, localData],
  );

  const handleEditProductSubmit = useCallback(
    async (updatedProduct: TProduct) => {
      const newData = localData.map(p =>
        p.id === updatedProduct.id ? updatedProduct : p,
      );
      const previousData = localData;

      setLocalData(newData);

      try {
        await editProduct(updatedProduct);
      } catch (error) {
        setLocalData(previousData);
      }
    },
    [editProduct, localData],
  );

  const handleDeleteProduct = useCallback(
    async (productId: string) => {
      const newData = localData.filter(p => p.id !== productId);
      const previousData = localData;
      setLocalData(newData);

      try {
        await deleteProduct(productId);
      } catch (error) {
        setLocalData(previousData);
      }
    },
    [deleteProduct, localData],
  );

  const loadMore = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  if (isLoading) {
    return (
      <Center h="$full" w="$full">
        <Spinner color="$secondary600" size="large" />
      </Center>
    );
  }

  return (
    <Box flex={1} w="$full" height="$full" mt="$8">
      <FlatList
        scrollEnabled={true}
        data={localData || []}
        keyExtractor={item => item.id}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        refreshing={isLoading}
        onRefresh={refetch}
        ListFooterComponent={
          isFetchingNextPage ? (
            <ActivityIndicator size="small" color="#0000ff" />
          ) : null
        }
        renderItem={({item}) => (
          <SwipeableContainer
            product={item}
            toggleCheckbox={toggleCheckbox}
            handleEdit={handleEdit}
            handleDelete={() => handleDeleteProduct(item.id)}
          />
        )}
      />
      <AddButton onPress={handleAddProduct} text="Add product" />

      <EditProductModal
        isOpen={showEditModal}
        setIsOpen={setShowEditModal}
        selectedProduct={selectedProduct}
        onPress={handleEditProductSubmit}
      />
      <AddProductModal
        isOpen={showAddModal}
        setIsOpen={setShowAddModal}
        selectedProduct={{amount: 1, title: '', bought: false}}
        onPress={handleAddProductSubmit}
      />
    </Box>
  );
};
