const ShouldBeLoggedIn = (ShouldBeLoggedIn: boolean) => {
  const getUser = localStorage.getItem("user");
  let loggedIn = false;
  if (getUser) {
    loggedIn = true;
  }
  localStorage.removeItem("heylol");
  if (loggedIn != ShouldBeLoggedIn) {
    window.location.href = "https://clipr.vercel.app/";
  }
};

export default ShouldBeLoggedIn;
