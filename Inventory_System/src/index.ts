import "reflect-metadata";
import express from "express";
import { Container } from "typedi";
import { ProductController } from "./controllers/ProductController";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";

const app = express();
app.use(express.json());

const productController = Container.get(ProductController);

app.get("/products", (req, res) => productController.getProducts(req, res));
app.post("/products", (req, res) => productController.addProduct(req, res));

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

// Configuração do Swagger
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0", // Versão do OpenAPI
    info: {
      title: "Inventory System",
      version: "1.0.0", // Versão da API
      description: "Uma API para gerenciar produtos e inventário",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
    components: {
      schemas: {
        Product: {
          type: "object",
          properties: {
            id: {
              type: "integer",
              example: 1,
            },
            name: {
              type: "string",
              example: "Produto Exemplo",
            },
            category: {
              type: "string",
              example: "Categoria Exemplo",
            },
            price: {
              type: "number",
              example: 19.99,
            },
            stock: {
              type: "integer",
              example: 100,
            },
          },
        },
      },
    },
  },
  apis: ["./src/controllers/*.ts"],
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
