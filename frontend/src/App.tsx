// import hsr_logo from './assets/hsr_logo.png'
import "./index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { NavBar } from "./components/Navbar";
import CreateAccount from "./pages/CreateAccount";
import LogIn from "./pages/LogIn";
import Home from "./pages/Home.tsx";
import TablesTEMP from "./pages/Tables.tsx";
import Upload from "./pages/Upload.tsx";
import Messages from "./pages/Messages.tsx";
import SetReceiver from "./pages/SetReceiver.tsx";
import NotFound from "./pages/NotFound.tsx";
import Profile from "./pages/Profile.tsx";

function App() {
  return (
    <>
      <Router>
        <NavBar />
        <Routes>
          <Route path="Clipr/" element={<Home />} />
          <Route path="Clipr/SignUp" element={<CreateAccount />} />
          <Route path="Clipr/Tables" element={<TablesTEMP />} />
          <Route path="Clipr/LogIn" element={<LogIn />} />
          <Route path="Clipr/Upload" element={<Upload />} />
          <Route path="Clipr/Messages" element={<Messages />} />
          <Route path="Clipr/SetReceiver" element={<SetReceiver />} />
          <Route path="Clipr/Profile" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
