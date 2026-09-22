import React, { useState, useEffect } from "react";
import shoppingIcon from "../assets/img/shopping-cart.png";
import { useProductContext } from "../context/ProductContext";
import heartIcon from "../assets/img/heart.png";
import userIcon from "../assets/img/user.png";
import { useWishlist } from "../hooks/useWishlist";
import WishlistSidebar from "./WishlistSidebar";
import { useAuth } from "../providers/AuthProvider";
import "../pages/Dashboard/dashboard.scss";

const Header = () => {
  const { setFilters } = useProductContext();
  const [searchInput, setSearchInput] = useState("");
  const { user, logout } = useAuth();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const { wishlist } = useWishlist();
  const [showWishlist, setShowWishlist] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const wishlistCount = wishlist?.products?.length || 0;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearchClick = () => {
    setFilters((prev) => ({
      ...prev,
      search: searchInput.trim(),
      page: 1,
    }));
  };

  useEffect(() => {
    if (searchInput.trim() === "") {
      setFilters((prev) => ({
        ...prev,
        search: "",
        page: 1,
      }));
    }
  }, [searchInput, setFilters]);

  return (
    <>
      <header className={`dashboard-header ${isScrolled ? 'scrolled' : ''}`}>
        {user?.role === "admin" ? (
          <h1 className="header-brand">Product Admin</h1>
        ) : (
          <h1 className="header-brand">Seclob</h1>
        )}

        <div className="search-wrapper">
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search any things"
          />
          <button onClick={handleSearchClick}>Search</button>
        </div>

        <div className="header-actions">
          <div className="action-item" onClick={() => setShowWishlist(true)}>
            <img src={heartIcon} alt="wishlist" />
            <span className="badge">{wishlistCount}</span>
          </div>

          <div className="action-item">
            <img src={shoppingIcon} alt="cart" />
            <span className="badge">0</span>
            <span>Cart</span>
          </div>

          <div className="action-item" onClick={() => setShowLogoutModal(true)}>
            <img src={userIcon} alt="logout" style={{ width: '1.2rem', height: '1.2rem' }} />
            <span>Log out</span>
          </div>
        </div>
      </header>

      <WishlistSidebar show={showWishlist} onClose={() => setShowWishlist(false)} />

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0,0,0,0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1000
        }}>
          <div style={{
            background: "#fff",
            padding: "30px",
            borderRadius: "8px",
            width: "400px",
            textAlign: "center",
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
            color: "#333"
          }}>
            <h3 style={{ marginBottom: "20px" }}>Confirm Logout</h3>
            <p style={{ marginBottom: "30px" }}>Are you sure you want to log out?</p>
            <div style={{ display: "flex", justifyContent: "center", gap: "15px" }}>
              <button 
                onClick={() => setShowLogoutModal(false)}
                style={{
                  padding: "10px 20px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                  background: "#fff",
                  cursor: "pointer"
                }}
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  setShowLogoutModal(false);
                  logout();
                }}
                style={{
                  padding: "10px 20px",
                  borderRadius: "5px",
                  border: "none",
                  background: "#dc3545",
                  color: "#fff",
                  cursor: "pointer"
                }}
              >
                Log out
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
