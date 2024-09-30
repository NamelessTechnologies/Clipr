// import hsr_logo from './assets/hsr_logo.png'
import "./index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { NavBar } from "./components/Navbar";
import CreateAccount from "./pages/CreateAccount";
import Home from "./pages/Home.tsx";

function App() {
  return (
    <>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="Clipr/SignUp" element={<CreateAccount />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
