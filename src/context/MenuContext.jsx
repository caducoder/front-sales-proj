import React, { createContext, useContext, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const MenuContext = createContext({
  activeLinks: [],
  setActiveLinks: () => {},
});

export const MenuProvider = ({ children }) => {
  const [activeLinks, setActiveLinks] = useState([]);
  const [currentSegment, setCurrentSegment] = useState("home");
  const [activeSection, setActiveSection] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (link) => {
    navigate(`app/${currentSegment}/${link.toLowerCase()}`);
    setActiveSection(link.toLowerCase());
  };

  // Função para atualizar os links ativos com base na rota atual
  const updateActiveLinks = (path) => {
    // Exemplo de lógica para determinar quais links devem estar ativos
    // Você pode personalizar isso de acordo com sua estrutura de rotas
    const segment = path.split("/")[2] || "home";

    setCurrentSegment(segment);

    switch (segment) {
      case "home":
        setActiveLinks(["Dashboard"]);
        break;
      case "analytics":
        setActiveLinks(["Products", "Orders"]);
        break;
      case "appointments":
        setActiveLinks(["Calendar"]);
        break;
      case "account":
        setActiveLinks(["Customers", "Users"]);
        break;
      case "security":
        setActiveLinks(["Users", "Roles"]);
        break;
      case "settings":
        setActiveLinks(["Profile", "Preferences"]);
        break;
      // Adicione mais casos conforme necessário
      default:
        setActiveLinks(["Home"]);
    }
  };

  // Efeito para atualizar links ativos quando a rota muda
  useEffect(() => {
    // setActiveSection(null);
    updateActiveLinks(location.pathname);
  }, [location]);

  useEffect(() => {
    setActiveSection(null);
  }, [currentSegment]);

  // Função para verificar se um link deve ser exibido
  const isLinkActive = (linkName) => activeLinks.includes(linkName);

  return (
    <MenuContext.Provider
      value={{
        activeLinks,
        currentSegment,
        activeSection,
        handleNavigation,
        isLinkActive,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};

export default MenuContext;
