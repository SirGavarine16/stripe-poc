"use client";

import { Box, Flex, Text, TextProps } from "@chakra-ui/react";
import Link from "next/link";
import { useGlobal } from "app/hooks";
import { StoreURL } from "app/types";

const storeURLs: StoreURL[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: null },
  { label: "Store", href: "/" },
  { label: "Blog", href: null },
  { label: "Account", href: "/account" },
  { label: "Cart", href: "/cart" }
]

export const StoreHeader = () => {
  const { cart } = useGlobal().useCart;

  return (
    <Box width="100%">
      <Flex justify="center" paddingY={2} gap={1}>
        <Text fontSize="2xl" fontWeight="bold" color="primary">Manga</Text>
        <Text fontSize="2xl" fontWeight="bold" color="secondary">Store</Text>
      </Flex>
      <Flex
        as="nav"
        flexDirection={{
          base: "column",
          lg: "row"
        }}
        justify={{ base: "unset", lg: "space-evenly" }}
        align={{ base: "center", lg: "unset" }}
        paddingX={{ base: 3, lg: 4 }}
        paddingY={2}
        borderYWidth={1}
        borderColor="neutral.100"
      >
        {storeURLs.map((storeURL, index) => {
          const key = `store_url_${index}`;
          const textProps: TextProps = {
            color: "primary",
            fontWeight: "semibold",
            fontSize: "md",
            transition: "all 0.15s ease-in",
            _hover: {
              opacity: 0.75,
              cursor: "pointer"
            }
          }

          const label = `${storeURL.label} ${storeURL.label === "Cart" ? `(${cart.length})` : ''}`

          if (storeURL.href) {
            return (
              <Link key={key} href={storeURL.href}>
                <Text {...textProps}>{label}</Text>
              </Link>
            );
          }
          return (
            <Text key={key} {...textProps}>{label}</Text>
          )
        })}
      </Flex>
    </Box>
  );
}