import { Product } from "../models/Product";

export interface InterfaceProduct {
  findAll(): Product[];
  save(product: Product): Product;
}
