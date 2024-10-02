import {
  Box,
  Button,
  Checkbox,
  CheckIcon,
  EditIcon,
  Icon,
  Pressable,
  Text,
  TrashIcon,
} from '@gluestack-ui/themed';
import React, {useCallback, useState} from 'react';
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import {TProduct} from '../types';

type SwipeableContainerProps = {
  product: TProduct;
  toggleCheckbox: (product: TProduct) => void;
  handleEdit: (product: TProduct) => void;
  handleDelete: (id: string) => void;
};

export const SwipeableContainer: React.FC<SwipeableContainerProps> = ({
  product,
  toggleCheckbox,
  handleEdit,
  handleDelete,
}) => {
  const [lastTap, setLastTap] = useState<number | null>(null);

  const handleDoubleTap = () => {
    const now = Date.now();
    if (lastTap && now - lastTap < 700) {
      handleEdit(product);
    }
    setLastTap(now);
  };

  const renderRightActions = useCallback(
    () => (
      <Button
        h="$full"
        p="$3"
        bg="$error400"
        borderRadius="$none"
        onPress={() => handleDelete(product.id)}>
        <Icon as={TrashIcon} size="lg" color="$trueGray900" />
      </Button>
    ),
    [handleDelete, product.id],
  );

  return (
    <Swipeable
      key={product.id}
      renderRightActions={renderRightActions}
      friction={1}
      overshootLeft={false}
      overshootRight={false}>
      <Box
        flexDirection="row"
        w="$full"
        px="$2"
        py="$2"
        minHeight={38}
        bg="$light50"
        alignItems="center">
        <Checkbox
          isChecked={product.bought}
          value={product.title}
          onChange={() => {
            toggleCheckbox(product);
          }}
          size="lg">
          <Checkbox.Indicator>
            <Checkbox.Icon color="$light50" as={CheckIcon} />
          </Checkbox.Indicator>
        </Checkbox>
        <Pressable
          ml="$2"
          onPress={handleDoubleTap}
          flex={1}
          flexDirection="row"
          justifyContent="space-between">
          <Text
            size="md"
            textDecorationLine={product.bought ? 'line-through' : 'none'}>
            {product.title}
          </Text>
          <Text w="$7" size="md" textAlign="center">
            {product.amount}
          </Text>
        </Pressable>
        <Button
          variant="outline"
          action="secondary"
          size="sm"
          onPress={() => handleEdit(product)}>
          <Icon as={EditIcon} size="md" color="$secondary600" />
        </Button>
      </Box>
    </Swipeable>
  );
};
