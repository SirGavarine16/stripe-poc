export type StoreURL = {
  label: string;
  href: string | null;
};

export type CustomerData = {
  id: string;
  email: string;
  name: string;
};

export type ProductData = {
  id: string;
  name: string;
  description: string;
  image: string;
  brand: string;
  category: string;
  price: number;
  priceId: string;
  currency: string;
};
