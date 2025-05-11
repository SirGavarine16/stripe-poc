import { Box, Grid, GridItem } from "@chakra-ui/react";
import { CategorySelector, ProductList } from "app/components/store";

export default function Home() {
  return (
    <Grid
      templateColumns={{
        base: "repeat(1, 1fr)",
        lg: "repeat(4, 1fr)",
        '2xl': "repeat(5, 1fr)",
      }}
      gap={4}
      height="fit-content"
    >
      <GridItem colSpan={{ lg: 1, }}>
        <Box width="100%">
          <CategorySelector />
        </Box>
      </GridItem>
      <GridItem colSpan={{ lg: 3, '2xl': 4 }}>
        <Box width="100%">
          <ProductList />
        </Box>
      </GridItem>
    </Grid>
  );
}
