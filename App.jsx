import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductDetails = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState({
    electronics: false,
    jewelry: false,
    menClothing: false,
  });

  useEffect(() => {
    axios
      .get('https://fakestoreapi.com/products')
      .then((response) => {
        setProducts(response.data);
        setFilteredProducts(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleCategoryChange = (event) => {
    const { name, checked } = event.target;
    setCategories((prev) => ({ ...prev, [name]: checked }));

    const selectedCategories = [];
    if (name === 'electronics' && checked) selectedCategories.push('electronics');
    if (name === 'jewelry' && checked) selectedCategories.push('jewelery');
    if (name === 'menClothing' && checked) selectedCategories.push("men's clothing");

    const filtered = products.filter((product) =>
      selectedCategories.includes(product.category)
    );

    setFilteredProducts(filtered.length ? filtered : products);
  };

  if (loading) {
    return <p>Cargando...</p>;
  }
  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h5>Seleccionar una categoria a la vez</h5>
      <label>
        <input
          type="checkbox"
          name="electronics"
          onChange={handleCategoryChange}
        />
        Aparatos tecnologicos
      </label>
      <br />
      <label>
        <input type="checkbox" name="jewelry" onChange={handleCategoryChange} />
        Joyas
      </label>
      <br />
      <label>
        <input
          type="checkbox"
          name="menClothing"
          onChange={handleCategoryChange}
        />
        Ropa de hombrs
      </label>
      <br />

      {filteredProducts.length > 0 &&
        filteredProducts.map((product) => (
          <div key={product.id}>
            <h1>{product.title}</h1>
            <p>{product.description}</p>
            <p>Precio: ${product.price}</p>
            <img src={product.image} alt={product.title} style={{ width: '200px' }} />
            <hr />
          </div>
        ))}
      {filteredProducts.length === 0 && <p>No hay productos para mostrar</p>}
    </div>
  );
};

export default ProductDetails;
