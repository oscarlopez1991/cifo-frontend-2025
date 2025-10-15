// TODO #11
// Afegeix els `import` que manquen per poder treballar amb rutes.
import Footer from "./components/Footer";
import Header from "./components/Header";
import About from "./components/About";
import Settings from "./components/Settings";
import Questions from "./components/Questions";
import NotFound from "./components/NotFound";
import { SettingsProvider } from "./context/SettingsContext";
import { ScoreProvider } from "./context/ScoreContext";
import { BrowserRouter as Router, Route, Routes } from "react-router";

function App() {
  return (
    <SettingsProvider>
      <ScoreProvider>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Questions />} />
            <Route path="/about" element={<About />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </Router>
      </ScoreProvider>
    </SettingsProvider>
  );
}

export default App;
