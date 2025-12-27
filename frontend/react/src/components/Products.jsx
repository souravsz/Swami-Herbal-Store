import React, { useState, useEffect } from 'react';
import './Products.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);

  useEffect(() => {
    setLoading(true);

    fetch(`http://127.0.0.1:8000/products/?page=${page}`)
      .then(response => response.json())
      .then(data => {
        setProducts(data.results || []);
        setTotalPages(Math.ceil((data.count || 0) / 10));
        setNextPage(data.next);
        setPrevPage(data.previous);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
        setLoading(false);
      });

  }, [page]); 

  if (loading) {
    return (
      <div className="products-container">
        <h1 className="products-header">Products</h1>
        <div className="loading">Loading products...</div>
      </div>
    );
  }

  return (
    <div className="products-container">

      <div className="products-grid">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <img
              src={product.image}
              alt={product.name}
              className="product-image"
            />

            <div className="product-info">
              <h3>{product.name}</h3>

              <div className="product-footer">
                <div className="price-container">
                  <span className="original-price">
                    ${product.price}
                  </span>
                  <span className="discounted-price">
                    ${product.discounted_price || product.price}
                  </span>
                </div>

                <button className="add-to-cart-btn">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

        <div className="pagination">
        <button
          className="pagination-btn pagination-nav"
          disabled={!prevPage}
          onClick={() => setPage(page - 1)}
        >
          ‹
        </button>

        {[...Array(totalPages)].map((_, index) => {
          const pageNum = index + 1;
          return (
            <button
              key={pageNum}
              className={`pagination-btn ${page === pageNum ? 'active' : ''}`}
              onClick={() => setPage(pageNum)}
            >
              {pageNum}
            </button>
          );
        })}

        <button
          className="pagination-btn pagination-nav"
          disabled={!nextPage}
          onClick={() => setPage(page + 1)}
        >
          ›
        </button>
      </div>

    </div>
  );
};

export default Products;
