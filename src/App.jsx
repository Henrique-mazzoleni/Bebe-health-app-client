import "./App.css";
import HomePage from "./pages/HomePage";
import HeaderNav from "./components/HeaderNav";
import Footer from "./components/Footer";
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
import NewChild from "./pages/NewChild";
import Invite from "./pages/Invite";

function App() {
  const {user} = useContext(AuthContext)

  return (
    <div className="App">
      <Container>

        <HeaderNav />

        

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />

       

          <Route path="/child/:childId" element={<IsPrivate><Child /></IsPrivate>} />
          <Route path="/newchild" element={<IsPrivate><NewChild /></IsPrivate>} />
          <Route path="/sleeps/:childId" element={<IsPrivate><Sleeps /></IsPrivate>} />
          <Route path="/feeds/:childId" element={<IsPrivate><Feeds /></IsPrivate>} />
          <Route path="/changes/:childId" element={<IsPrivate><Changes /></IsPrivate>} />
          <Route path="/invite" element={<IsPrivate><Invite /></IsPrivate>} />
          <Route path="/profile" element={<IsPrivate><Profile user={user}/></IsPrivate>}/>
        </Routes>

        <Footer />
        
      </Container>
    </div>
  );
}

export default App;
