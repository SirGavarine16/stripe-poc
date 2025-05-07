import { Box, Flex, Text, TextProps } from "@chakra-ui/react";
import { StoreURL } from "app/types";
import Link from "next/link";

const storeURLs: StoreURL[] = [
  { label: "Home", href: null },
  { label: "About Us", href: null },
  { label: "Store", href: null },
  { label: "Blog", href: null },
  { label: "Account", href: null },
  { label: "Cart", href: null }
]

export const StoreHeader = () => {
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

          if (storeURL.href) {
            return (
              <Link key={key} href={storeURL.href}>
                <Text {...textProps}>{storeURL.label}</Text>
              </Link>
            );
          }
          return (
            <Text key={key} {...textProps}>{storeURL.label}</Text>
          )
        })}
      </Flex>
    </Box>
  );
}