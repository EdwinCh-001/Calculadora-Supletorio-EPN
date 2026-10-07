import EpnLogo from '../assets/epnLogo';

const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <EpnLogo />
        <div className="header-text">
          <h1>Calculadora de supletorios EPN</h1>
          <p>Escuela Politécnica Nacional</p>
        </div>
        <span className="header-badge">● EPN</span>
      </div>
    </header>
  );
};

export default Header;