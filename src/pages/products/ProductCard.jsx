const ProductCard = ({ product, onAddToCart, onBuyNow }) => {
  return (
    <div className="product-card">
      <img src={product.images[0]} alt={product.title} />
      <h3>{product.title}</h3>
      <p>{product.description}</p>
      <p className="price">${product.price}</p>

      <div className="card-buttons">
        <button onClick={() => onAddToCart(product)}>Add to Cart</button>
        <button onClick={() => onBuyNow(product)}>Buy Now</button>
      </div>
    </div>
  );
};

export default ProductCard;
