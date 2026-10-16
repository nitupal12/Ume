import { useState } from 'react';
import { createPortal } from 'react-dom';
import './ProductCard.css';

function ProductCard({ product, onAddToCart }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showDetails, setShowDetails] = useState(false);

  const hasSlides = product.slides && product.slides.length > 0;
  const currentImage = hasSlides ? product.slides[currentSlide] : product.image;

  const nextSlide = (e) => {
    e.stopPropagation();
    if (hasSlides) {
      setCurrentSlide((prev) => (prev + 1) % product.slides.length);
    }
  };

  const prevSlide = (e) => {
    e.stopPropagation();
    if (hasSlides) {
      setCurrentSlide((prev) => (prev - 1 + product.slides.length) % product.slides.length);
    }
  };

  return (
    <>
    <div className="product-card">
      <div className="product-image-container" onClick={() => setShowDetails(true)}>
        {currentImage ? (
          <img
            className="product-image"
            src={currentImage}
            alt={product.name}
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
        ) : null}
        <div
          className="placeholder-image"
          style={currentImage ? { display: 'none' } : {}}
        >
          {product.name}
        </div>

        {hasSlides && (
          <>
            <button className="slide-nav slide-prev" onClick={prevSlide} aria-label="Previous slide">❮</button>
            <button className="slide-nav slide-next" onClick={nextSlide} aria-label="Next slide">❯</button>
            <div className="slide-dots">
              {product.slides.map((_, index) => (
                <button
                  key={index}
                  className={`dot ${index === currentSlide ? 'active' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentSlide(index);
                  }}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </>
        )}

        <div className="product-badge">{product.category}</div>
      </div>

      <div className="product-content">
        <h2 className="product-name">{product.name}</h2>

        <div className="product-details">
          {product.skinType && (
            <div className="detail-row">
              <span className="detail-label">Skin Type:</span>
              <span className="detail-value">{product.skinType}</span>
            </div>
          )}
          <div className="detail-row">
            <span className="detail-label">Net Wt.:</span>
            <span className="detail-value">{product.gram}g</span>
          </div>
        </div>

        <div className="product-footer">
          <div className="product-price">
            ₹ {product.price.toLocaleString('en-IN')}
          </div>

          <button
            className="add-to-cart-btn"
            onClick={() => onAddToCart(product)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>

    {showDetails && createPortal(
      <div className="detail-overlay" onClick={() => setShowDetails(false)}>
        <div className="detail-modal" onClick={(e) => e.stopPropagation()}>
          <button className="detail-close" onClick={() => setShowDetails(false)} aria-label="Close">
            ×
          </button>
          {currentImage && <img className="detail-image" src={currentImage} alt={product.name} />}
          <div className="detail-body">
            <p className="detail-category">{product.category}</p>
            <h2 className="product-name">{product.name}</h2>

            <div className="product-details">
              {product.skinType && (
                <div className="detail-row">
                  <span className="detail-label">Skin Type:</span>
                  <span className="detail-value">{product.skinType}</span>
                </div>
              )}
              <div className="detail-row">
                <span className="detail-label">Net Wt.:</span>
                <span className="detail-value">{product.gram}g</span>
              </div>
            </div>

            {product.ingredients && (
              <div className="product-info-section">
                <h3 className="info-title">Ingredients</h3>
                <p className="info-text">{product.ingredients}</p>
              </div>
            )}

            {product.benefits && (
              <div className="product-info-section">
                <h3 className="info-title">Benefits</h3>
                <p className="info-text">{product.benefits}</p>
              </div>
            )}

            {product.howToUse && (
              <div className="product-info-section">
                <h3 className="info-title">How to Use</h3>
                <p className="info-text">{product.howToUse}</p>
              </div>
            )}

            {product.description && (
              <p className="product-description">{product.description}</p>
            )}

            <div className="product-footer">
              <div className="product-price">₹ {product.price.toLocaleString('en-IN')}</div>
              <button className="add-to-cart-btn" onClick={() => onAddToCart(product)}>
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>,
      document.body
    )}
    </>
  );
}

export default ProductCard;
