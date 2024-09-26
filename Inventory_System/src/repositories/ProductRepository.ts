import { Service } from "typedi";
import { InterfaceProduct } from "../interfaces/InterfaceProduct";
import { Product } from "../models/Product";

@Service()
export class ProductRepository implements InterfaceProduct {
  private products: Product[] = [];

  findAll(): Product[] {
    return this.products;
  }

  save(product: Product): Product {
    this.products.push(product);
    return product;
  }
}
