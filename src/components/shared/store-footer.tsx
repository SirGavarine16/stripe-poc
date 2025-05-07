import { Box, Text } from "@chakra-ui/react"
import Link from "next/link"

export const StoreFooter = () => {
  return (
    <Box borderTopWidth={1} borderColor="neutral.100" paddingY={1}>
      <Text fontSize="sm" fontWeight="semibold" textAlign="center" color="primary">
        Developed by
        <Text as="span" transition="all 0.15s ease-in" _hover={{ opacity: 0.65 }}>
          <Link href="https://danieldelagavarain-dev.vercel.app/" target="_blank">
            {' '}Daniel De la Cruz{' '}
          </Link>
        </Text>
        © 2025
      </Text>
    </Box>
  )
}