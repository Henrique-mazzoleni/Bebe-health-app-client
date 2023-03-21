import "./App.css";
import HomePage from "./pages/HomePage";
import HeaderNav from "./components/HeaderNav";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import { Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import isPrivate from "./components/isPrivate";

function App() {
  return (
    <div className="App">
      <HeaderNav />
      <Sidebar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<isPrivate> <Profile /> </isPrivate>} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
