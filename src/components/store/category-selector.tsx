"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Box, Flex, Text } from "@chakra-ui/react";
import { useGlobal } from "app/hooks";
import { useMemo } from "react";

export const CategorySelector = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { fetchCategories, fetchProducts } = useGlobal().useGetProducts;

  const categoryInParams = searchParams.get("category");
  const products = useMemo(() => {
    return fetchProducts();
  }, [fetchProducts])
  const productCategories = useMemo(() => {
    return fetchCategories();
  }, [fetchCategories]);

  return (
    <Box width="100%">
      <Link href={pathname}>
        <Text color="primary" fontSize="md" fontWeight="semibold">
          Categories
        </Text>
      </Link>
      <Flex as="ul" flexDirection="column" paddingLeft={3} gap={1 / 2}>
        {productCategories.map((category, index) => {
          const productCount = products.filter((product) => product.category === category)?.length ?? 0;
          return (
            <Box key={`productCategory_${index}`} as="li">
              <Link href={`${pathname}?category=${category}`}>
                <Text
                  color={
                    categoryInParams && categoryInParams === category ?
                      "secondary" : "neutral.600"
                  }
                  fontWeight="semibold"
                >
                  {category} ({productCount})
                </Text>
              </Link>
            </Box>
          )
        })}
      </Flex>
    </Box>
  )
}