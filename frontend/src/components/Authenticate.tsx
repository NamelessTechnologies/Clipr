import { useNavigate } from "react-router-dom";

const ShouldBeLoggedIn = (ShouldBeLoggedIn: boolean) => {
  const navigate = useNavigate();
  const getUser = localStorage.getItem("user");
  let loggedIn = false;
  if (getUser) {
    loggedIn = true;
  }
  if (loggedIn != ShouldBeLoggedIn) {
    window.location.href = "https://clipr.vercel.app/";
  }
};

export default ShouldBeLoggedIn;
