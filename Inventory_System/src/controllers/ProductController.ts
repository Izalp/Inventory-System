import { Service } from "typedi";
import { ProductService } from "../services/ProductService";
import { Request, Response } from "express";

@Service()
export class ProductController {
  constructor(private productService: ProductService) {}

  async getProducts(req: Request, res: Response) {
    const products = await this.productService.getAllProducts();
    res.json(products);
  }

  async addProduct(req: Request, res: Response) {
    console.log("Request body:", req.body);
    const newProduct = req.body;
    const product = await this.productService.addProduct(newProduct);
    res.status(201).json(product);
  }
}
