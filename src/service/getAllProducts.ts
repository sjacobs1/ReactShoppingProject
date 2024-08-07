import { Product } from "../model/product";

export async function getAllProducts(): Promise<Product[]> {
    const response = await fetch('https://fakestoreapi.com/products');
    const data = await response.json();
    return data as Product[];
}

