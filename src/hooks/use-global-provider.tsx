"use client";

import { createContext, ReactNode, useContext } from "react"
import { useGetProducts } from "./use-get-products";
import { useCart } from "./use-cart";

type GlobalContextValues = {
  useGetProducts: ReturnType<typeof useGetProducts>;
  useCart: ReturnType<typeof useCart>;
}

type GlobalProviderProps = {
  children: ReactNode;
}

const GlobalContext = createContext<GlobalContextValues | null>(null);

export const GlobalProvider = ({ children }: GlobalProviderProps) => {
  const useGetProductsGlobal = useGetProducts();
  const useCartGlobal = useCart();

  return (
    <GlobalContext.Provider value={{
      useGetProducts: useGetProductsGlobal,
      useCart: useCartGlobal
    }}>
      {children}
    </GlobalContext.Provider>
  )
}

export const useGlobal = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobal must be used within a GlobalProvider");
  }
  return context;
};