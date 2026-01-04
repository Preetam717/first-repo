import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import ProductCard from "./ProductCard";
import { addToCart } from "../store/cartSlice";

import "../styles/Products.scss";

const PRODUCTS_PER_PAGE = 20;

const SkeletonCard = () => (
  <div className="product-card skeleton">
    <div className="skeleton-img"></div>
    <div className="skeleton-text title"></div>
    <div className="skeleton-text desc"></div>
    <div className="skeleton-text price"></div>
  </div>
);

const Products = () => {
  const dispatch = useDispatch();

  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0); // total products from API
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const fetchProducts = (pageNumber) => {
    setLoading(true);
    const skip = (pageNumber - 1) * PRODUCTS_PER_PAGE;

    fetch(
      `https://dummyjson.com/products?limit=${PRODUCTS_PER_PAGE}&skip=${skip}`
    )
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        setTotal(data.total);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchProducts(page);
  }, [page]);

  const totalPages = Math.ceil(total / PRODUCTS_PER_PAGE);

  const handlePrev = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const handleAddToCart = (product) => {
    // alert(`Added "${product.title}" to cart!`);
    dispatch(addToCart(product));
    // Later: push to cart state / context
  };

  const handleBuyNow = (product) => {
    alert(`Buying "${product.title}" now!`);
    // Later: navigate to checkout page
  };

  if (loading) {
    return (
      <div className="products-grid">
        {Array.from({ length: 10 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  return (
    <div>
      <div className="products-grid">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={handleAddToCart}
            onBuyNow={handleBuyNow}
          />
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="pagination">
        <button onClick={handlePrev} disabled={page === 1}>
          Prev
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button onClick={handleNext} disabled={page === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Products;
