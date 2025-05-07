import { Box, Flex, Text, VStack } from "@chakra-ui/react";
import { ProductData } from "app/types"
import Image from "next/image";

type ProductCartProps = {
  product: ProductData;
}

export const ProductCard = ({ product }: ProductCartProps) => {
  return (
    <Flex flexDirection="column" width="100%" shadow="card" borderRadius={6} overflow="hidden">
      <Box width="100%" height={52} position="relative" backgroundColor="white">
        <Image
          src={product.image}
          alt={product.name}
          style={{
            objectFit: "contain"
          }}
          fill
        />
      </Box>
      <Flex flex={1} flexDirection="column" justify="space-between" width="100%" backgroundColor="primary" padding={2} color="white">
        <VStack gap={1} alignItems="flex-start">
          <Text fontSize="sm">
            {product.brand}
          </Text>
          <Text marginY={2} fontSize="md" fontWeight="semibold" lineHeight="1">
            {product.name}
          </Text>
          <Text textAlign="justify" fontSize="xs" lineClamp={3}>
            {product.description}
          </Text>
        </VStack>
        <Text marginTop={2} textAlign="right" fontSize="xl" fontWeight="bold">
          ${product.price}
        </Text>
      </Flex>
    </Flex>
  )
}