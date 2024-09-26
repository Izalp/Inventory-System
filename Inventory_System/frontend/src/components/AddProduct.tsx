import { useState, ChangeEvent, FormEvent } from "react";
import { Product } from "../models/Product";

// Define a interface para as props que o componente irá receber
interface AddProductProps {
  onAddProduct: (product: Product) => void;
}

function AddProduct({ onAddProduct }: AddProductProps) {
  // Inicializa o estado com um produto vazio, exceto pelo preço e estoque como 0
  const [product, setProduct] = useState<Omit<Product, "id">>({
    name: "",
    category: "",
    price: 0,
    stock: 0,
  });

  // Manipula as mudanças no formulário
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: name === "price" || name === "stock" ? +value : value, // Converte price e stock para número
    }));
  };

  // Envia o formulário
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    fetch("/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    })
      .then((response) => response.json())
      .then((newProduct: Product) => {
        onAddProduct(newProduct);
        setProduct({
          name: "",
          category: "",
          price: 0,
          stock: 0,
        });
      })
      .catch((error) => console.error("Erro ao adicionar produto:", error));
  };

  return (
    <div>
      <h2>Adicionar Produto</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome:</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Categoria:</label>
          <input
            type="text"
            name="category"
            value={product.category}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Preço:</label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Estoque:</label>
          <input
            type="number"
            name="stock"
            value={product.stock}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Adicionar</button>
      </form>
    </div>
  );
}

export default AddProduct;
