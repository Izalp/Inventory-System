import { Product } from "../models/Product"; 

interface ProductListProps {
  products: Product[]; 
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  return (
    <div>
      <h2>Lista de Produtos</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <strong> Produto: </strong>{product.name} | 
            <strong> Categoria: </strong>{product.category} | 
            <strong> Preço: </strong> R${product.price.toFixed(2)} | 
            <strong> Estoque: </strong>: {product.stock}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default ProductList;
