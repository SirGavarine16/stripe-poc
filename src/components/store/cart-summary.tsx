"use client";

import { Box, Button, Flex, Text, VStack } from "@chakra-ui/react";
import { useGlobal } from "app/hooks";
import { useMemo } from "react";

export const CartSummary = () => {
  const { fetchProducts } = useGlobal().useGetProducts;
  const { cart } = useGlobal().useCart;

  const cartProducts = fetchProducts({ ids: [...cart.map((item) => item.productId)] });

  const totals = useMemo(() => {
    if (cart.length === 0 || cartProducts.length === 0) {
      return {
        items: 0,
        cases: 0,
        amount: 0,
      }
    }
    const totalItems = cart.length;
    let totalCases = 0;
    let totalAmount = 0;
    for (const item of cart) {
      const productData = cartProducts.find((product) => product.id === item.productId);
      totalCases += item.quantity;
      if (!!productData) {
        totalAmount += productData.price * item.quantity;
      }
    }
    return {
      items: totalItems,
      cases: totalCases,
      amount: totalAmount,
    }
  }, [cart, cartProducts])

  return (
    <Box width="100%" height="fit-content" borderColor="neutral.100" borderWidth={1} borderRadius={6} padding={3}>
      <VStack alignItems="flex-start" gap={1}>
        <Text fontSize="md" fontWeight="bold" color="primary">
          Cart Summary
        </Text>
        <Text fontSize="sm">
          {totals.items} items | {totals.cases} cases
        </Text>
      </VStack>
      <Flex justify="space-between" marginTop={3} borderTopWidth={1} borderColor="neutral.100" paddingTop={3}>
        <Text fontWeight="semibold">
          Estimated Total:
        </Text>
        <Text fontWeight="semibold">
          ${totals.amount / 100}
        </Text>
      </Flex>
      <Box width="100%" marginTop={4}>
        <Button width="100%" backgroundColor="primary" fontWeight="bold" _hover={{ backgroundColor: "primaryHover" }}>
          Checkout
        </Button>
      </Box>
    </Box>
  )
}