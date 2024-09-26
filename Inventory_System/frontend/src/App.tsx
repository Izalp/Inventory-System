import { useState, useEffect } from "react";
import ProductList from "./components/ProductList";
import AddProduct from "./components/AddProduct";
import { Product } from "./models/Product";

function App() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  // Função para buscar produtos
  const fetchProducts = async () => {
    try {
      const response = await fetch("/products");
      const data: Product[] = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    }
  };

  // Função para adicionar produtos e atualizar a lista
  const handleAddProduct = async (newProduct: Omit<Product, "id">) => {
    try {
      const response = await fetch("/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });
      const addedProduct: Product = await response.json();
      setProducts((prevProducts) => [...prevProducts, addedProduct]); 
    } catch (error) {
      console.error("Erro ao adicionar produto:", error);
    }
  };

  return (
    <div>
      <h1>Gerenciamento de Produtos</h1>
      <AddProduct onAddProduct={handleAddProduct} />
      <ProductList products={products} /> {/* Passa a lista de produtos para o ProductList */}
    </div>
  );
}

export default App;
