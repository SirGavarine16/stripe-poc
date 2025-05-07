"use client";

import { ReactNode } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { system } from "./theme-config";

type UIProviderProps = {
  children: ReactNode;
}

export const UIProvider = ({ children }: UIProviderProps) => {
  return (
    <ChakraProvider value={system}>
      {children}
    </ChakraProvider>
  )
}