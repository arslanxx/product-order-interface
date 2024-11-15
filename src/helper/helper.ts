import { ProductType } from "@src/types/types"

export const saveData = (key: string, value: ProductType) => {
    localStorage.setItem(`${key}`, JSON.stringify(value));
} 


export const getData = (key: string) => {
   return localStorage.getItem(key);
} 