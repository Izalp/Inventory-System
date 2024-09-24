import "reflect-metadata";
import express from "express";
import { Container } from "typedi";
import { ProductController } from "./controllers/ProductController";

const app = express();
app.use(express.json());

const productController = Container.get(ProductController);

app.get("/products", (req, res) => productController.getProducts(req, res));
app.post("/products", (req, res) => productController.addProduct(req, res));

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
