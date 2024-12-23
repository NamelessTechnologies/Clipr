// import hsr_logo from './assets/hsr_logo.png'
import "./index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { NavBar } from "./components/Navbar";
import { CreateAccount } from "./pages/CreateAccount";
import { LogIn } from "./pages/LogIn.tsx";
import LoggingOutAnimation from "./pages/LoggedOut.tsx";
import { Home } from "./pages/Home.tsx";
import TablesTEMP from "./pages/Tables.tsx";
import Upload from "./pages/Upload.tsx";
import Messages from "./pages/Messages.tsx";
import SetReceiver from "./pages/SetReceiver.tsx";
import NotFound from "./pages/NotFound.tsx";
import Profile from "./pages/Profile.tsx";
import Search from "./pages/Search.tsx";
import FriendsPage from "./pages/FriendsPage.tsx";
import Inbox from "./pages/Inbox.tsx";
import IsolatedPost from "./pages/IsolatedPost.tsx";

export const uri =
  "https://clipr-esa6hpg2cahzfud6.westus3-01.azurewebsites.net/";
export const local_uri = "http://localhost:5001/";

function App() {
  return (
    <>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/IsolatedPost" element={<IsolatedPost />} />
          <Route path="/SignUp" element={<CreateAccount />} />
          <Route path="/Tables" element={<TablesTEMP />} />
          <Route path="/LogIn" element={<LogIn />} />
          <Route path="/LogOut" element={<LoggingOutAnimation />} />
          <Route path="/Upload" element={<Upload />} />
          <Route path="/Messages" element={<Messages />} />
          <Route path="/Inbox" element={<Inbox />} />
          <Route path="/SetReceiver" element={<SetReceiver />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/Friends" element={<FriendsPage />} />
          <Route path="/Search" element={<Search />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
