import { Box, Flex, Text, VStack } from "@chakra-ui/react"
import { ProductData } from "app/types"
import Image from "next/image";
import { QuantityPicker } from "./quantity-picker";

type CartItemCardProps = {
  product: ProductData;
}

export const CartItemCard = ({ product }: CartItemCardProps) => {
  return (
    <Flex width="100%" flexDirection={{ base: 'column', lg: 'row' }} borderRadius={6} boxShadow="md" overflow="hidden" gap={3}>
      <Flex flex={1} gap={3} padding={{ base: 3, lg: 0 }}>
        <Box
          display={{ base: 'none', lg: 'flex' }}
          boxSize={28}
          position="relative"
          borderWidth={1}
          borderLeftRadius={6}
          borderColor="neutral.100"
        >
          <Image
            src={product.image}
            alt={product.name}
            style={{
              objectFit: "contain"
            }}
            fill
          />
        </Box>
        <VStack flex={1} alignItems="flex-start" paddingTop={1} gap={1 / 2}>
          <Text fontSize="sm" color="neutral.600" >{product.brand}</Text>
          <Text fontSize="md" fontWeight="bold" color="primary" lineHeight="100%">{product.name}</Text>
          <Text fontSize="sm" color="neutral.600" lineClamp={2}>
            {product.description}
          </Text>
        </VStack>
      </Flex>
      <Box
        display="flex"
        flexDirection={{ base: 'row', lg: 'column' }}
        minWidth={52}
        borderTopWidth={{ base: 1, lg: 0 }}
        borderLeftWidth={{ base: 0, lg: 1 }}
        borderColor="neutral.100"
        padding={4}
        paddingTop={2}
      >
        <Flex width="100%" justifyContent="flex-start" alignItems="center" gap={1} color="primary" marginBottom={2}>
          <Text marginTop={2} fontSize="md" fontWeight="bold">
            ${product.price / 100}
          </Text>
          <Text fontSize="xs" fontWeight="semibold" textTransform="uppercase">
            {product.currency}
          </Text>
        </Flex>
        <Box flex={1} minWidth={44}>
          <QuantityPicker productId={product.id} />
        </Box>
      </Box>
    </Flex>
  )
}