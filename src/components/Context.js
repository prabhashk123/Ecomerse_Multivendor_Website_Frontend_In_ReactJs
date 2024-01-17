// Api allow data to be passes through a component tree without pass props share data between components
import { createContext } from "react";
export const UserContext = createContext({
    'login': false,
});
export const CurrencyContext = createContext();
export const CartContext = createContext();

