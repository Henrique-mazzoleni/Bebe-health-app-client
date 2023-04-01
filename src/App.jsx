import { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { AuthContext } from "./context/auth.context";

import { Container } from "react-bootstrap";

import HomePage from "./pages/HomePage";
import HeaderNav from "./components/HeaderNav";
import Footer from "./components/Footer";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import IsPrivate from "./components/isPrivate";
import IsAnon from "./components/isAnon";
import Child from "./pages/Child";
import Sleeps from "./pages/Sleeps";
import Feeds from "./pages/Feeds";
import Changes from "./pages/Changes";
import NewChild from "./pages/NewChild";
import Invite from "./pages/Invite";
import AmendChange from "./pages/AmendChange";
import AmendFeed from "./pages/AmendFeed";
import AmendSleep from "./pages/AmendSleep";
import AmendChild from "./pages/AmendChild";


import "./App.css";
import AmendUser from "./pages/AmendUser";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <div className="App">
      <Container>
        <HeaderNav />

        <Routes>
          {/* Unprotected Routes */}

          <Route path="/" element={<HomePage />} />
          <Route
            path="/signup"
            element={
              <IsAnon>
                <Signup />
              </IsAnon>
            }
          />
          <Route
            path="/login"
            element={
              <IsAnon>
                <Login />
              </IsAnon>
            }
          />

          {/* Protected Routes */}

          <Route
            path="/child/:childId"
            element={
              <IsPrivate>
                <Child />
              </IsPrivate>
            }
          />
          <Route
            path="/newchild"
            element={
              <IsPrivate>
                <NewChild />
              </IsPrivate>
            }
          />
          <Route
            path="/sleeps/:childId"
            element={
              <IsPrivate>
                <Sleeps />
              </IsPrivate>
            }
          />
          <Route
            path="/feeds/:childId"
            element={
              <IsPrivate>
                <Feeds />
              </IsPrivate>
            }
          />
          <Route
            path="/changes/:childId"
            element={
              <IsPrivate>
                <Changes />
              </IsPrivate>
            }
          />
          <Route
            path="/invite"
            element={
              <IsPrivate>
                <Invite />
              </IsPrivate>
            }
          />
          <Route
            path="/profile"
            element={
              <IsPrivate>
                <Profile user={user} />
              </IsPrivate>
            }
          />

          {/* Change Routes */}

          <Route
            path="/changes/:childId/:changeId"
            element={
              <IsPrivate>
                <AmendChange />
              </IsPrivate>
            }
          />

          <Route
            path="/ammendChild/:childId/"
            element={
              <IsPrivate>
                <AmendChild />
              </IsPrivate>
            }
          />

          <Route
            path="/feeds/:childId/:feedId"
            element={
              <IsPrivate>
                <AmendFeed />
              </IsPrivate>
            }
          />

          <Route
            path="/sleeps/:childId/:sleepId"
            element={
              <IsPrivate>
                <AmendSleep />
              </IsPrivate>
            }
          />

          <Route
            path="/amenduser"
            element={
              <IsPrivate>
                <AmendUser />
              </IsPrivate>
            }
          />
        </Routes>

        <Footer />
      </Container>
    </div>
  );
}

export default App;
