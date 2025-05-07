"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { Center, Grid, GridItem, Text } from "@chakra-ui/react"
import StoreData from "app/constants/data.json";
import { ProductCard } from "app/components/store/product-card";

const { products } = StoreData;

export const ProductList = () => {
  const searchParams = useSearchParams();

  const categoryInParams = searchParams.get("category");

  const displayedProducts = useMemo(() => {
    if (categoryInParams) {
      return products.filter((product) => product.category === categoryInParams);
    }
    return products;
  }, [categoryInParams]);

  return (
    <Grid
      templateColumns={{
        base: "repeat(1, 1fr)",
        lg: "repeat(3, 1fr)",
        xl: "repeat(4, 1fr)",
      }}
      gap={4}
    >
      {displayedProducts.length === 0 ? (
        <GridItem colSpan={{ base: 1, lg: 3, xl: 4 }} height={52}>
          <Center height="100%">
            <Text textAlign="center" color="primary">
              No products available.
            </Text>
          </Center>
        </GridItem>
      ) : (
        displayedProducts.map((product, index) => (
          <ProductCard key={`product_${index}`} product={product} />
        ))
      )}

    </Grid>
  )
}