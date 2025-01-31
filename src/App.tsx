import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import ChartsPage from "./pages/ChartsPage";
import { AppProvider } from "./context/AppContext"; // ✅ Import AppProvider
import ThemeSwitch from "./components/ThemeSwitch";
import "./style.css";

const App = () => {
  return (
    <AppProvider>
      {" "}
      <Router>
        <div className="container">
          <nav>
            <Link to="/">Home</Link>
            <Link to="/charts">Charts</Link>
            <ThemeSwitch />
          </nav>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/charts" element={<ChartsPage />} />
          </Routes>
        </div>
      </Router>
    </AppProvider>
  );
};

export default App;
