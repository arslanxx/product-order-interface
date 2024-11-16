import { ProductType } from "@src/types/types"

export const saveData = (key: string, value: ProductType[] | string) => {
    localStorage.setItem(`${key}`, JSON.stringify(value));
} 


export const getData = (key: string) => {
    const storedValue = localStorage?.getItem(key);
    return storedValue ? JSON.parse(storedValue) : null;  
} 

export const removeData = (key: string) => {
   return localStorage?.removeItem(key);
} 