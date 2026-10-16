import { useState, useMemo } from 'react';
import ProductCard from './ProductCard';
import './ProductList.css';

function ProductList({ products, onAddToCart }) {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = useMemo(() => {
    return [...new Set(products.map(product => product.category))];
  }, [products]);

  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'All') {
      return products;
    }
    return products.filter(product => product.category === selectedCategory);
  }, [products, selectedCategory]);

  const categoryImage = (category) => {
    const product = products.find(p => p.category === category && (p.image || p.slides));
    return product ? (product.image || product.slides[0]) : null;
  };

  return (
    <main className="product-list-container" id="shop">
      <h2 className="section-title">Shop by Category</h2>
      <div className="category-tiles">
        <button
          className={`category-tile ${selectedCategory === 'All' ? 'active' : ''}`}
          onClick={() => setSelectedCategory('All')}
        >
          <span className="category-tile-all">All</span>
          <span className="category-tile-label">All Products</span>
        </button>
        {categories.map(category => (
          <button
            key={category}
            className={`category-tile ${selectedCategory === category ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category)}
          >
            {categoryImage(category) && (
              <img src={categoryImage(category)} alt="" className="category-tile-image" />
            )}
            <span className="category-tile-label">{category}</span>
          </button>
        ))}
      </div>

      <h2 className="section-title">
        {selectedCategory === 'All' ? 'Our Products' : selectedCategory}
      </h2>
      <div className="product-list">
        {filteredProducts.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
    </main>
  );
}

export default ProductList;
