import {
  Box,
  Button,
  ButtonText,
  Icon,
  Input,
  InputField,
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalContent,
  ModalFooter,
  Text,
} from '@gluestack-ui/themed';
import React, {FC, useEffect, useRef, useState, useCallback} from 'react';
import {View} from 'react-native';
import {TAddProduct} from '../types';
import {RemoveIcon, AddIcon} from '@gluestack-ui/themed';

type DeleteModalProps = {
  isOpen: boolean;
  selectedProduct: TAddProduct;
  setIsOpen: (isOpen: boolean) => void;
  onPress: (product: TAddProduct) => Promise<void>;
};

export const AddProductModal: FC<DeleteModalProps> = ({
  isOpen,
  selectedProduct,
  setIsOpen,
  onPress,
}) => {
  const [editedProduct, setEditedProduct] = useState(selectedProduct);
  const ref = useRef(null);

  useEffect(() => {
    setEditedProduct(selectedProduct);
  }, [selectedProduct]);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  const handleSave = useCallback(() => {
    setIsOpen(false);
    onPress(editedProduct);
  }, [onPress, editedProduct, setIsOpen]);

  const handleIncreaseAmount = useCallback(() => {
    setEditedProduct(prev => ({...prev, amount: prev.amount + 1}));
  }, []);

  const handleDecreaseAmount = useCallback(() => {
    setEditedProduct(prev => ({...prev, amount: Math.max(1, prev.amount - 1)}));
  }, []);

  if (!editedProduct) {
    return null;
  }

  return (
    <View>
      <Modal isOpen={isOpen} onClose={handleClose} finalFocusRef={ref}>
        <ModalBackdrop />
        <ModalContent>
          <ModalBody>
            <Text mt="$8" mb="$2" size="md">
              Title:
            </Text>
            <Input>
              <InputField
                size="md"
                type="text"
                value={editedProduct.title}
                onChangeText={title =>
                  setEditedProduct(prev => ({...prev, title}))
                }
              />
            </Input>

            <Text mt="$4" size="md">
              Amount:
            </Text>
            <Box
              flexDirection="row"
              alignItems="center"
              mt="$2"
              justifyContent="space-between">
              <Button
                variant="outline"
                size="sm"
                action="secondary"
                onPress={handleDecreaseAmount}
                disabled={editedProduct.amount <= 1}
                opacity={editedProduct.amount <= 1 ? 0.5 : 1}>
                <Icon as={RemoveIcon} color="$secondary600" />
              </Button>
              <Text minWidth="$7" textAlign="center" size="md">
                {editedProduct.amount}
              </Text>
              <Button
                onPress={handleIncreaseAmount}
                variant="outline"
                size="sm"
                action="secondary">
                <Icon as={AddIcon} color="$secondary600" />
              </Button>
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button
              variant="outline"
              size="sm"
              action="secondary"
              mr="$3"
              onPress={handleClose}>
              <ButtonText>Cancel</ButtonText>
            </Button>
            <Button
              size="sm"
              action="positive"
              borderWidth="$0"
              disabled={editedProduct.title.trim().length === 0}
              opacity={editedProduct.title.trim().length === 0 ? 0.5 : 1}
              onPress={handleSave}>
              <ButtonText>Add</ButtonText>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </View>
  );
};
