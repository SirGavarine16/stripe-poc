import StripeData from "app/constants/stripe-data.json";
import { ProductData } from "app/types";

type FetchProductsParams = {
  category?: string;
  ids?: string[];
};

export const useGetProducts = () => {
  const parseProductsFromStripe = (): ProductData[] => {
    const products: ProductData[] = StripeData.products
      .map((stripeProduct) => {
        const stripePrice = StripeData.prices.find((price) => price.product === stripeProduct.id);
        if (!stripePrice) {
          return null;
        }
        return {
          id: stripeProduct.id,
          name: stripeProduct.name,
          description: stripeProduct.description,
          image: stripeProduct.metadata.localImage,
          brand: stripeProduct.metadata.brand,
          category: stripeProduct.metadata.category,
          priceId: stripePrice.id,
          price: stripePrice.unit_amount,
          currency: stripePrice.currency,
        };
      })
      .filter((product) => product !== null);
    return products;
  };

  const fetchProducts = ({ category, ids }: FetchProductsParams = {}) => {
    const allProducts = parseProductsFromStripe();
    if (!!category) {
      return allProducts.filter((product) => product.category === category);
    }
    if (!!ids) {
      const products: ProductData[] = [];
      ids.forEach((productId) => {
        const product = allProducts.find(({ id }) => id === productId);
        if (!!product) {
          products.push(product);
        }
      });
      return products;
    }
    return allProducts;
  };

  const fetchCategories = () => {
    const allProducts = parseProductsFromStripe();
    const allCategories: string[] = [];
    for (const product of allProducts) {
      if (!allCategories.includes(product.category)) {
        allCategories.push(product.category);
      }
    }
    return allCategories;
  };

  return {
    fetchProducts,
    fetchCategories,
  };
};
