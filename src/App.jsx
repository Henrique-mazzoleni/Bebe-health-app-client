import "./App.css";
import HomePage from "./pages/HomePage";
import HeaderNav from "./components/HeaderNav";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import { Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import IsPrivate from "./components/IsPrivate";
import Child from "./pages/Child";
import Sleeps from "./pages/Sleeps";
import Feeds from "./pages/Feeds";
import Changes from "./pages/Changes";
import { Container } from "react-bootstrap";
import { useContext } from "react";
import { AuthContext } from "./context/auth.context";


function App() {
  const {user} = useContext(AuthContext)


  return (
    <div className="App">
    <Container>

      <HeaderNav />

      <Sidebar />
      <div className="contentContainer">

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/child" element={<Child />} />
        <Route path="/sleeps" element={<Sleeps />} />
        <Route path="/feeds" element={<Feeds />} />
        <Route path="/changes" element={<Changes />} />
        <Route
          path="/profile"
          element={
            <IsPrivate>
              <Profile user={user}/>
            </IsPrivate>
          }
        />
      </Routes>

      <Footer />
      </div>
      </Container>
    </div>
  );
}

export default App;
