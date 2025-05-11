"use client";

import { ChangeEvent, useEffect, useRef, useState } from "react";
import { Box, Button, Flex, Input } from "@chakra-ui/react";
import { useGlobal } from "app/hooks";


type QuantityPickerProps = {
  productId: string;
}

export const QuantityPicker = ({ productId }: QuantityPickerProps) => {
  const { cart, updateCart } = useGlobal().useCart;
  const itemInCart = cart.find((item) => item.productId === productId) ?? null;

  const isFirstRender = useRef(true);

  const [quantity, setQuantity] = useState(itemInCart === null ? 0 : itemInCart.quantity);

  useEffect(() => {
    if (!!itemInCart && isFirstRender.current === true) {
      setQuantity(itemInCart.quantity);
      isFirstRender.current = false;
    }
    if (itemInCart === null) {
      isFirstRender.current = true;
    }
  }, [itemInCart])

  useEffect(() => {
    updateCart(productId, quantity)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quantity]);

  const handleButtonClick = () => {
    updateCart(productId, 1);
  }

  const decreaseQuantity = () => {
    setQuantity((prev) => {
      if (prev - 1 < 0) {
        return prev;
      }
      return prev - 1;
    })
  }

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1)
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/[0-9]/.test(value)) {
      updateCart(productId, parseInt(value));
    }
    if (value === '') {
      updateCart(productId, 0);
    }
  }

  return (
    <Box width="100%">
      {itemInCart === null || quantity === 0 ? (
        <Button
          width="100%"
          height={10}
          backgroundColor="secondary"
          fontWeight="bold"
          onClick={handleButtonClick}
          borderRadius={6}
          _hover={{
            backgroundColor: 'secondaryHover',
          }}
        >
          Add to Cart
        </Button>
      ) : (
        <Flex
          width="100%"
          height={10}
          padding={1}
          borderRadius={6}
          borderWidth={2}
          borderColor="secondary"
          justify="space-between"
          alignItems="center"
        >
          <Button
            width="fit-content"
            maxHeight="100%"
            paddingX={0}
            backgroundColor="secondary"
            _hover={{
              backgroundColor: 'secondaryHover',
            }}
            onClick={decreaseQuantity}
          >
            -
          </Button>
          <Box>
            <Input
              width={6}
              maxHeight="100%"
              value={itemInCart?.quantity ?? 0}
              onChange={handleInputChange}
              border="none"
              focusRing="none"
            />
            {/* <Text color="white" fontWeight="semibold">{itemInCart?.quantity ?? 0}</Text> */}
          </Box>
          <Button
            width="fit-content"
            maxHeight="100%"
            paddingX={0}
            backgroundColor="secondary"
            _hover={{
              backgroundColor: 'secondaryHover',
            }}
            onClick={increaseQuantity}
          >
            +
          </Button>
        </Flex>
      )}
    </Box>
  )
}