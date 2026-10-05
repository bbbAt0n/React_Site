import { createContext, useContext } from "react";

export const RouterContext = createContext(null);

export function useRouter() {
  const ctx = useContext(RouterContext);
  if (!ctx) {
    throw new Error("useRouter нужно вызывать внутри Router");
  }
  return ctx;
}
