import React, {FC} from 'react';
import {AddIcon, Button, HStack, Icon, Text} from '@gluestack-ui/themed';

type AddButtonProps = {
  onPress: () => void;
  text: string;
};

export const AddButton: FC<AddButtonProps> = ({onPress, text}) => {
  return (
    <Button
      variant="outline"
      action="secondary"
      mx="$6"
      mb="$4"
      mt="$4"
      borderRadius={10}
      onPress={onPress}>
      <HStack alignItems="center" justifyContent="center">
        <Icon as={AddIcon} color="$secondary600" />
        <Text ml="$2" fontSize="$sm" color="$textDark950">
          {text}
        </Text>
      </HStack>
    </Button>
  );
};
