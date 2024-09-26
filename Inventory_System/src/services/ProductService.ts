import { Service } from "typedi";
import { ProductRepository } from "../repositories/ProductRepository";
import { Product } from "../models/Product";

@Service()
export class ProductService {
  constructor(private productRepository: ProductRepository) {}

  async getAllProducts(): Promise<Product[]> {
    return this.productRepository.findAll();
  }

  async addProduct(product: Product): Promise<Product> {
    return this.productRepository.save(product);
  }
}
