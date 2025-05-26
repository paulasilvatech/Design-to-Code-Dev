import React, { useState } from 'react';

// ProductCard Component
const ProductCard = ({ 
  title = "Premium Headphones", 
  description = "Wireless noise-cancelling headphones with superior sound quality",
  price = 299.99,
  image = "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop",
  rating = 4.5,
  reviews = 128,
  isNew = true,
  onAddToCart = () => {}
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    onAddToCart({ title, price, quantity });
    // Reset quantity after adding
    setQuantity(1);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => {
      const filled = index < Math.floor(rating);
      const half = index === Math.floor(rating) && rating % 1 !== 0;
      
      return (
        <span key={index} style={{ color: '#fbbf24', fontSize: '16px' }}>
          {filled ? '★' : half ? '⯨' : '☆'}
        </span>
      );
    });
  };

  return (
    <div 
      style={{
        width: '320px',
        backgroundColor: 'white',
        borderRadius: '16px',
        overflow: 'hidden',
        boxShadow: isHovered ? '0 20px 40px rgba(0,0,0,0.15)' : '0 4px 12px rgba(0,0,0,0.1)',
        transform: isHovered ? 'translateY(-8px)' : 'translateY(0)',
        transition: 'all 0.3s ease',
        cursor: 'pointer',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div style={{ position: 'relative', overflow: 'hidden', height: '240px' }}>
        <img 
          src={image} 
          alt={title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transform: isHovered ? 'scale(1.1)' : 'scale(1)',
            transition: 'transform 0.3s ease'
          }}
        />
        {isNew && (
          <div style={{
            position: 'absolute',
            top: '12px',
            left: '12px',
            backgroundColor: '#10b981',
            color: 'white',
            padding: '4px 12px',
            borderRadius: '20px',
            fontSize: '12px',
            fontWeight: '600'
          }}>
            NEW
          </div>
        )}
      </div>

      {/* Content */}
      <div style={{ padding: '20px' }}>
        {/* Title */}
        <h3 style={{
          fontSize: '20px',
          fontWeight: '600',
          marginBottom: '8px',
          color: '#1e293b',
          lineHeight: '1.4'
        }}>
          {title}
        </h3>

        {/* Rating */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginBottom: '12px'
        }}>
          {renderStars(rating)}
          <span style={{ color: '#64748b', fontSize: '14px' }}>
            ({reviews} reviews)
          </span>
        </div>

        {/* Description */}
        <p style={{
          color: '#64748b',
          fontSize: '14px',
          lineHeight: '1.6',
          marginBottom: '16px',
          height: '44px',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical'
        }}>
          {description}
        </p>

        {/* Price and Actions */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: '20px'
        }}>
          <div>
            <div style={{
              fontSize: '24px',
              fontWeight: '700',
              color: '#2563eb'
            }}>
              ${price.toFixed(2)}
            </div>
          </div>

          {/* Quantity and Add to Cart */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              overflow: 'hidden'
            }}>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setQuantity(Math.max(1, quantity - 1));
                }}
                style={{
                  padding: '4px 8px',
                  border: 'none',
                  background: 'transparent',
                  cursor: 'pointer',
                  fontSize: '16px',
                  color: '#64748b'
                }}
              >
                -
              </button>
              <span style={{
                padding: '4px 12px',
                fontSize: '14px',
                fontWeight: '500'
              }}>
                {quantity}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setQuantity(quantity + 1);
                }}
                style={{
                  padding: '4px 8px',
                  border: 'none',
                  background: 'transparent',
                  cursor: 'pointer',
                  fontSize: '16px',
                  color: '#64748b'
                }}
              >
                +
              </button>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleAddToCart();
              }}
              style={{
                backgroundColor: '#2563eb',
                color: 'white',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'background-color 0.3s',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#1d4ed8'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#2563eb'}
            >
              <span>🛒</span>
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Demo App showcasing the ProductCard
const App = () => {
  const [cartItems, setCartItems] = useState([]);

  const products = [
    {
      title: "Wireless Headphones",
      description: "Premium noise-cancelling Bluetooth headphones with 30-hour battery life",
      price: 299.99,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop",
      rating: 4.5,
      reviews: 342,
      isNew: true
    },
    {
      title: "Smart Watch Pro",
      description: "Advanced fitness tracking and health monitoring with GPS and heart rate sensor",
      price: 399.99,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop",
      rating: 4.8,
      reviews: 189,
      isNew: false
    },
    {
      title: "Vintage Camera",
      description: "Classic film camera for photography enthusiasts who love authentic shots",
      price: 599.99,
      image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400&h=300&fit=crop",
      rating: 4.3,
      reviews: 67,
      isNew: false
    }
  ];

  const handleAddToCart = (item) => {
    setCartItems([...cartItems, item]);
    console.log('Added to cart:', item);
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f8fafc',
      padding: '40px 20px'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <h1 style={{
          fontSize: '32px',
          fontWeight: '700',
          color: '#1e293b',
          marginBottom: '40px',
          textAlign: 'center'
        }}>
          React Product Card Component
        </h1>

        {/* Cart Count */}
        <div style={{
          textAlign: 'center',
          marginBottom: '40px',
          fontSize: '18px',
          color: '#64748b'
        }}>
          Cart Items: <span style={{ fontWeight: '600', color: '#2563eb' }}>{cartItems.length}</span>
        </div>

        {/* Products Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '32px',
          justifyItems: 'center'
        }}>
          {products.map((product, index) => (
            <ProductCard
              key={index}
              {...product}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>

        {/* Instructions */}
        <div style={{
          marginTop: '60px',
          padding: '24px',
          backgroundColor: 'white',
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
        }}>
          <h2 style={{ fontSize: '20px', marginBottom: '16px', color: '#1e293b' }}>
            Component Features:
          </h2>
          <ul style={{ color: '#64748b', lineHeight: '1.8' }}>
            <li>✅ Hover effects with smooth transitions</li>
            <li>✅ Quantity selector with increment/decrement</li>
            <li>✅ Star rating display with half-star support</li>
            <li>✅ "NEW" badge for featured products</li>
            <li>✅ Responsive design that works on all devices</li>
            <li>✅ Add to cart functionality with quantity</li>
            <li>✅ Image zoom effect on hover</li>
            <li>✅ Customizable through props</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default App;