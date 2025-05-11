import { Box, Flex } from "@chakra-ui/react";
import { StoreFooter, StoreHeader } from "app/components/shared";
import { ReactNode } from "react"

type HomeLayoutProps = {
  children: ReactNode;
}

export default function HomeLayout({ children }: HomeLayoutProps) {
  return (
    <Flex width="100%" minHeight="100vh" flexDirection="column">
      <StoreHeader />
      <Box flex={1} paddingX={{ base: 3, lg: 6, xl: 8, '2xl': 32 }} paddingTop={6} paddingBottom={16}>
        {children}
      </Box>
      <StoreFooter />
    </Flex>
  )
}