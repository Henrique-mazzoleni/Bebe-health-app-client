import "./App.css";
import HomePage from "./pages/HomePage";
import HeaderNav from "./components/HeaderNav";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import { Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";

function App() {
  return (
    <div className="App">
      <HeaderNav />
      <Sidebar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
