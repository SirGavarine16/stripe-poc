"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { Center, Grid, GridItem, Text } from "@chakra-ui/react"
import { ProductCard } from "app/components/store/product-card";
import { useGlobal } from "app/hooks";


export const ProductList = () => {
  const { fetchProducts } = useGlobal().useGetProducts;
  const searchParams = useSearchParams();

  const categoryInParams = searchParams.get("category");

  const displayedProducts = useMemo(() => {
    return fetchProducts(categoryInParams ? { category: categoryInParams } : {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        displayedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))
      )}

    </Grid>
  )
}