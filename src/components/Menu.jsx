import "./Menu.modules.css";
import Container from "./layout/Container";
import Logo from "./Logo";

function Menu() {
  return (
    <nav className="navbar">
      <a href="/" className="logo">
        <Logo />
      </a>
      <div className="navbar">
      <a href="/" className="item">
        Home
      </a>
      <a href="/components/pages/Projects" className="item">
        Projetos
      </a>
      <a href="/components/pages/Contato" className="item">
        Contato
      </a>
      </div>
    </nav>
  );
}

export default Menu;
