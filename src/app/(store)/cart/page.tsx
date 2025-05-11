"use client";

import { Box, Flex, Grid, GridItem, Text } from "@chakra-ui/react";
import { useGlobal } from "app/hooks";
import { CartItemCard, CartSummary } from "app/components/store";

export default function Cart() {
  const { fetchProducts } = useGlobal().useGetProducts;
  const { cart } = useGlobal().useCart;

  const cartProducts = fetchProducts({ ids: [...cart.map((item) => item.productId)] });

  return (
    <Box width="100%">
      <Grid
        templateColumns={{
          base: "repeat(1, 1fr)",
          lg: "repeat(4, 1fr)",
        }}
        gap={10}
      >
        <GridItem colSpan={{ base: 1, lg: 3, }}>
          <Box
            width="100%"
            minHeight={52}
            borderRadius={6}
            borderWidth={1}
            borderColor="neutral.100"
            display="flex"
            justifyContent="center"
            alignItems={cart.length === 0 ? "center" : "flex-start"}
            padding={3}
          >
            {cart.length === 0 ? (
              <Text textAlign="center">No items added to your Cart.</Text>
            ) : (
              <Flex width="100%" flexDirection="column" gap={4}>
                {cartProducts.map((product) => (
                  <CartItemCard key={product.id} product={product} />
                ))}
              </Flex>
            )}
          </Box>
        </GridItem>
        <GridItem colSpan={{ base: 1, }}>
          <CartSummary />
        </GridItem>
      </Grid>

    </Box>
  )
}