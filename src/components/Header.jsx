import './Header.css';

function Header({ cartCount, onCheckoutClick, onLogoClick, onNavClick }) {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo" onClick={onLogoClick}>
          <img className="logo-image" src="./images/umee-logo.png" alt="UMEE logo" />
          UMEE
        </div>

        <h1 className="title">Handcrafted Products</h1>

        <nav className="nav">
          <button className="nav-link" onClick={onLogoClick}>Home</button>
          <button className="nav-link" onClick={() => onNavClick('shop')}>Shop</button>
          <button className="nav-link" onClick={() => onNavClick('about')}>About</button>
          <button className="nav-link" onClick={() => onNavClick('contact')}>Contact</button>
        </nav>

        <button className="cart-button" onClick={onCheckoutClick}>
          🛒 Cart ({cartCount})
        </button>
      </div>
    </header>
  );
}

export default Header;
