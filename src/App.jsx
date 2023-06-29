import { BrowserRouter, Routes, Route } from "react-router-dom";
import Menu from "./components/Menu";
import Home from "./components/pages/Home";
import Projects from "./components/pages/Projects";
import NovoProjeto from "./components/pages/NovoProjeto";
import Contato from "./components/pages/Contato";
import Footer from "./components/Footer";
import Project from "./components/pages/Project";

import Container from "./components/layout/Container";


function App() {
  return (
    <>
      <Menu />
      <Container customClass='min_heigth'>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/components/pages/Projects"
            element={<Projects />}
          />
          <Route path="/components/pages/NovoProjeto" element={<NovoProjeto />} />
          <Route path="/components/pages/Contato" element={<Contato />} />
          <Route path="/project/:id" element={<Project />} />
        </Routes>
      </BrowserRouter>
      </Container>
      <Footer />
    </>
  );
}

export default App;
